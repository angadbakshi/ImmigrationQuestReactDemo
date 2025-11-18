// File: ./scripts/checkSchema.ts

import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing environment variables:');
    console.error('VITE_SUPABASE_URL:', !!supabaseUrl);
    console.error('VITE_SUPABASE_ANON_KEY:', !!supabaseKey);
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    try {
        // Query using raw SQL to get table information
        const { data: tables, error: tablesError } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);

        if (tablesError) throw tablesError;

        // Print out the structure based on the returned data
        console.log('\nCurrent Database Schema:');
        console.log('=======================\n');

        if (tables && tables.length > 0) {
            const tableStructure = tables[0];
            console.log('Table: profiles');
            console.log('Columns:');

            Object.keys(tableStructure).forEach(columnName => {
                console.log(`  - ${columnName}`);
                console.log(`    Value type: ${typeof tableStructure[columnName]}`);
                console.log('');
            });
        }

        // Try to query other known tables
        const knownTables = [
            'profiles',
            'user_programs',
            'immigration_programs',
            'quests',
            'user_quests'
        ];

        for (const tableName of knownTables) {
            try {
                const { data, error } = await supabase
                    .from(tableName)
                    .select('*')
                    .limit(1);

                if (!error) {
                    console.log(`\nTable: ${tableName} exists`);
                    if (data && data.length > 0) {
                        console.log('Columns:');
                        Object.keys(data[0]).forEach(columnName => {
                            console.log(`  - ${columnName}`);
                            console.log(`    Value type: ${typeof data[0][columnName]}`);
                            console.log('');
                        });
                    }
                }
            } catch (error) {
                console.log(`Table ${tableName} not found or not accessible`);
            }
            console.log('-'.repeat(50));
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
    } finally {
        process.exit(0);
    }
}

// Execute the function
listTables();