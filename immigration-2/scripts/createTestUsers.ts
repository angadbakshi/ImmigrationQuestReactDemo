// File: ./scripts/createTestUsers.ts

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Note: Need service role key for admin operations

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testUsers = [
    {
        email: 'sarah.chen@example.com',
        password: 'TestPassword123!',
        fullName: 'Sarah Chen'
    },
    {
        email: 'raj.patel@example.com',
        password: 'TestPassword123!',
        fullName: 'Raj Patel'
    },
    {
        email: 'maria.garcia@example.com',
        password: 'TestPassword123!',
        fullName: 'Maria Garcia'
    }
];

async function createTestUsers() {
    for (const user of testUsers) {
        try {
            // Create user through Supabase auth
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: user.email,
                password: user.password,
                email_confirm: true,
                user_metadata: {
                    full_name: user.fullName
                }
            });

            if (authError) {
                console.error(`Error creating user ${user.email}:`, authError);
                continue;
            }

            console.log(`Created user ${user.email} with ID: ${authData.user.id}`);

            // Create profile
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: authData.user.id,
                    full_name: user.fullName,
                    date_of_birth: '1990-01-01',
                    nationality: 'CA',
                    current_country: 'CA',
                    role: 'user',
                    onboarding_completed: true,
                    destination_country: 'Canada',
                    goals: ['Complete immigration process', 'Find employment', 'Settle in Canada']
                }]);

            if (profileError) {
                console.error(`Error creating profile for ${user.email}:`, profileError);
            }

        } catch (error) {
            console.error(`Error processing user ${user.email}:`, error);
        }
    }
}

createTestUsers()
    .then(() => console.log('Completed user creation'))
    .catch(console.error)
    .finally(() => process.exit(0));