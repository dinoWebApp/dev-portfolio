import { pb } from '$lib/server/pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

  //before response
  event.locals.pb = pb;
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
  } catch (error) {
    event.locals.pb.authStore.clear();
  }

  event.locals.user = structuredClone(pb.authStore.model);

  const response = await resolve(event);

  //after response

  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
  return response;
}
