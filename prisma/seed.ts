// seed.ts

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

async function seed() {

    try {
        const postData = [
            { title: 'First Post', content: 'This is the content of the first post.' },
            { title: 'Second Post', content: 'Content for the second post goes here.' },
            { title: 'Third Post', content: 'Some Content for the third post goes here.' },
            // Add more posts as needed
        ];

        // Seed Prisma database with blog posts
        await prisma.post.createMany({ data: postData });
        console.log('Seeding successful!');
    } catch (error) {
        console.error('Error seeding Supabase:', error);
    } finally {
        await prisma.$disconnect();
    }

    
}

// Run the seed function
seed().catch((e) => {
    throw e;
});