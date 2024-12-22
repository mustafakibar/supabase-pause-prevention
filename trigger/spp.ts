import { schedules, logger } from '@trigger.dev/sdk/v3';
import client from '../client';
import { CRON_EXPRESSION } from '../config';

export const supabasePausePrevention = schedules.task({
  id: 'supabasePausePrevention',
  cron: CRON_EXPRESSION,
  maxDuration: 60,
  run: async (_) => {
    const { result, error } = await client.run();

    if (error) {
      logger.error(error);
      return error;
    } else {
      logger.info(result ?? 'DONE');
      return result;
    }
  },
});
