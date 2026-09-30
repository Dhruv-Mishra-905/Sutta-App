# Sutta-App

React and Vite signup screen with Supabase email/password authentication.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's API settings in `.env.local`.
4. Add your local app URL (for example, `http://localhost:5173`) to the Supabase project's allowed redirect URLs.
5. Run `npm run dev`.

Enable email confirmation in Supabase auth settings if new users need to verify their email before signing in.

## Photo credits

- "5 cigarettes in a row" by the European Commission, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- "Marlboro cigarette pack (2010) from US duty-free shop" by Pittigrilli, licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
