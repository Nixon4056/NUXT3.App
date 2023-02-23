import { serverSupabaseUser } from '#supabase/server';
import { PrismaClient } from '@prisma/client';

interface CustomEvent extends Event {
  body: string;
}

const prisma = new PrismaClient();

export default defineEventHandler(async (event: CustomEvent) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized!' });
  }
  console.log(user);
  console.log('event.body:', event.body);
  const { title, price, company } = JSON.parse(event.body);
  console.log('title:', title);
  console.log(title)
  const data = await prisma.wyceny.create({
    data: {
      created_at: new Date,
      title: title,
      price: price,
      user: user.id,
      company: company
    }
  });
  return data
});