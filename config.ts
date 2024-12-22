import env from 'env-var';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.local`, override: true });

const TRIGGER_PROJECT_ID = env.get('TRIGGER_PROJECT_ID').required().asString();
const SUPABASE_URL = env.get('SUPABASE_PROJECT_URL').required().asString();
const SUPABASE_ANON_KEY = env.get('SUPABASE_ANON_KEY').required().asString();
const SUPABASE_TABLE_NAME = env
  .get('SUPABASE_TABLE_NAME')
  .required()
  .asString();
const SUPABASE_TABLE_MAX_COLUMN_SIZE = env
  .get('SUPABASE_TABLE_MAX_COLUMN_SIZE')
  .required()
  .asIntPositive();
const CRON_EXPRESSION = env.get('CRON_EXPR').required().asString();

export {
  TRIGGER_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_TABLE_NAME,
  SUPABASE_TABLE_MAX_COLUMN_SIZE,
  CRON_EXPRESSION,
};
