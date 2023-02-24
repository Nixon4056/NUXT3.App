import { serverSupabaseUser } from '#supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized!' });
  }
  const { title, price, positions, company } = await readBody(event);
  const data = await prisma.wyceny.create({
    data: {
      created_at: new Date,
      title: title,
      price: price,
      positions: positions,
      user: user.id,
      company: company
    }
  });
  return data
});