# Supabase Pause Prevention

## Overview

Supabase Pause Prevention utilizes [Trigger.dev](https://trigger.dev) to ensure your Supabase services remain active, preventing unexpected pauses and maintaining optimal performance.

## Features

- **Continuous Operation**: Keeps your Supabase instance active at all times.
- **Customizable Settings**: Tailor the prevention mechanism to fit your specific requirements.
- **Easy Integration**: Seamlessly integrates with your existing Supabase setup.

## Installation

1. **Clone this Repository**

2. **Navigate to the Project Directory**

    ```bash
    cd supabase-pause-prevention
    ```

3. **Install Dependencies**

    ```bash
    npm install
    pnpm install
    bun install
    yarn install
    ```

## Configuration

You must have [Supabase](https://supabase.com) account.

You must have [Trigger](https://trigger.dev) account.

```env
TRIGGER_PROJECT_ID=<your_project_id>
SUPABASE_URL=https://<your_project_id>.supabase.co
SUPABASE_KEY=<your_anon_key>
SUPABASE_TABLE_NAME=<your_table_name> #exp: 'keep-alive' all columns must have defaults and disable RTS
SUPABASE_TABLE_MAX_COLUMN_SIZE=50
CRON_EXPR=<your_cron_expression> #1 3 * * 1,3 # Every Monday and Wednesday at 3:01 AM
```

**Note:** Add environments in your Trigger dashboard or use a `.env` file for testing purposes.

**Note:** Disable RTS for `SUPABASE_TABLE_NAME` or `update table policy` in your supabase dashboard.

## Test

Details: <https://trigger.dev/docs/cli-test>

```bash
npx trigger.dev@latest dev
pnpm dlx trigger.dev@latest dev
bunx trigger.dev@latest dev
yarn dlx trigger.dev@latest dev
```

## Deploy

Details: <https://trigger.dev/docs/cli-deploy>

```bash
npx trigger.dev@latest deploy --skip-sync-env-vars
pnpm dlx trigger.dev@latest deploy --skip-sync-env-vars
bunx trigger.dev@latest deploy --skip-sync-env-vars
yarn dlx trigger.dev@latest deploy --skip-sync-env-vars
```

## License

This project is licensed under the MIT License.
