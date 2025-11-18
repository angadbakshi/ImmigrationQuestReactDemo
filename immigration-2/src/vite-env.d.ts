/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_SUPABASE_SEED_EMAIL: string;
    VITE_SUPABASE_SEED_PASSWORD: string;
    // Add other environment variables here as needed
}

interface ImportMeta {
    env: ImportMetaEnv;
}