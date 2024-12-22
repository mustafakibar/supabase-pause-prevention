import { createClient, PostgrestError } from '@supabase/supabase-js';
import {
  SUPABASE_ANON_KEY,
  SUPABASE_TABLE_MAX_COLUMN_SIZE,
  SUPABASE_TABLE_NAME,
  SUPABASE_URL,
} from './config';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// TODO if there's an error, send a mail

const parsePostgrestError = (error: PostgrestError) => {
  return `Name: ${error.name ?? 'N/A'} Message: ${
    error.message ?? 'N/A'
  } Details: ${error.details ?? 'N/A'} Code: ${error.code ?? 'N/A'} Cause: ${
    error.cause ?? 'N/A'
  }`;
};

const checkIfColumnSizeIsExceeded = async () => {
  const maxColumnSize = SUPABASE_TABLE_MAX_COLUMN_SIZE;
  let { result: count, error } = await countRows();

  if (!count) {
    count = 0;
  }

  if (error) {
    return { error };
  } else {
    return { result: count >= maxColumnSize };
  }
};

const countRows = async () => {
  const { count, error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .select('*', { count: 'exact', head: true });

  return {
    result: count,
    error: error ? parsePostgrestError(error) : undefined,
  };
};

const deleteRows = async () => {
  const { error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .delete()
    .not('id', 'eq', '0');

  if (error) {
    return { error: parsePostgrestError(error) };
  } else {
    return { result: 'DONE' };
  }
};

const insertRow = async () => {
  const { error } = await supabase.from(SUPABASE_TABLE_NAME).insert({
    // set all columns must have a default value on supabase dashboard
    // so you can just insert an empty object
  });

  if (error) {
    return { error: parsePostgrestError(error) };
  } else {
    return { result: 'DONE' };
  }
};

const run = async () => {
  // Delete rows if the table size exceeds the limit
  {
    // CHECK IF COLUMN SIZE IS EXCEEDED
    let { result: isExceeded, error } = await checkIfColumnSizeIsExceeded();

    if (error) {
      return { error };
    } else {
      if (isExceeded) {
        const { result, error } = await deleteRows();

        if (error) {
          return { error };
        } else {
          return { result };
        }
      }
    }
  }

  // Insert a row
  {
    const { result, error } = await insertRow();

    if (error) {
      return { error };
    } else {
      return { result };
    }
  }
};

export default { run };
