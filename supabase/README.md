# Supabase Docker

This is a minimal Docker Compose setup for self-hosting Supabase. Follow the steps [here](https://supabase.com/docs/guides/hosting/docker) to get started.

Before starting the server, which runs a couple of migrations against the DB, you must run the following within the Supabase SQL editor.
```sql
ALTER USER postgres WITH superuser;
```