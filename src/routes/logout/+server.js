import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
  locals.pb.authStore.clear();
  locals.user = null;

  throw redirect(303, '/');
}