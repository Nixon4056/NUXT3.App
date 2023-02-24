import { serverSupabaseUser } from '#supabase/server';

import Bir from 'bir1';
const bir = new Bir();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized!' });
  }
  await bir.login();
  console.log(await bir.search({ nip: '5882402127' }));
	const data = await bir.search({ nip: '5882402127' })
  return data
});
