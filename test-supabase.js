import { supabase } from './src/lib/supabase.js';

async function testConnection() {
    console.log('🔍 Testing Supabase connection...\n');

    try {
        // Test 1: Check if client is configured
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!url || !key) {
            console.error('❌ Missing Supabase credentials in .env file');
            process.exit(1);
        }

        console.log('✅ Credentials found');
        console.log(`   URL: ${url}\n`);

        // Test 2: Try to query the wishes table
        console.log('🔍 Checking if wishes table exists...');
        const { data, error } = await supabase
            .from('wishes')
            .select('count')
            .limit(1);

        if (error) {
            if (error.message.includes('relation "public.wishes" does not exist')) {
                console.log('⚠️  Wishes table does not exist yet');
                console.log('   Please run the SQL script in supabase_schema.sql\n');
                console.log('   Steps:');
                console.log('   1. Go to https://mywvtdliwnayhvcjtiiw.supabase.co');
                console.log('   2. Open SQL Editor');
                console.log('   3. Copy and run the contents of supabase_schema.sql\n');
                process.exit(1);
            } else {
                throw error;
            }
        }

        console.log('✅ Wishes table exists');
        console.log('✅ Database connection successful!\n');

        // Test 3: Try to insert a test record
        console.log('🔍 Testing insert operation...');
        const testData = {
            from_name: 'Test User',
            to_name: 'Test Recipient',
            data: {
                from: 'Test User',
                to: 'Test Recipient',
                message: 'This is a test message',
                firstMeet: 'Test',
                firstImpression: 'Test',
                favQuality: 'Test',
                ourSong: 'Test',
                cuteHabit: 'Test',
                memory: 'Test',
                reason: 'Test',
                proposalStory: 'Test',
                future: 'Test',
                promise: 'Test',
                images: [],
                imageCaptions: []
            }
        };

        const { data: insertedData, error: insertError } = await supabase
            .from('wishes')
            .insert([testData])
            .select()
            .single();

        if (insertError) throw insertError;

        console.log('✅ Insert successful');
        console.log(`   Created wish with ID: ${insertedData.id}\n`);

        // Test 4: Try to read the record back
        console.log('🔍 Testing select operation...');
        const { data: fetchedData, error: fetchError } = await supabase
            .from('wishes')
            .select('*')
            .eq('id', insertedData.id)
            .single();

        if (fetchError) throw fetchError;

        console.log('✅ Select successful');
        console.log(`   Retrieved wish for: ${fetchedData.to_name}\n`);

        // Clean up test record
        console.log('🧹 Cleaning up test data...');
        const { error: deleteError } = await supabase
            .from('wishes')
            .delete()
            .eq('id', insertedData.id);

        if (deleteError) throw deleteError;

        console.log('✅ Cleanup successful\n');
        console.log('🎉 All tests passed! Your Supabase connection is working perfectly!\n');

    } catch (error) {
        console.error('❌ Connection test failed:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

testConnection();
