import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').RequestHandler} */
export async function GET({locals, url, cookies}) {
  const redirectURL = `${url.origin}/githubOAuth`;
  const expectedState = cookies.get('state');
  const expectedVerifier = cookies.get('verifier');

  const state = await url.searchParams.get('state');
  const code = await url.searchParams.get('code');

  const authMethods = await locals.pb.collection('users').listAuthMethods();
  if(!authMethods.authProviders) {
    console.log("No Auth Providers");
    throw redirect(303, '/signup');
  }

  const provider = authMethods.authProviders.find(provider => provider.name === 'github');

  if(!provider) {
    console.log('Provider Not Found');
    throw redirect(303, 'signup');
  }

  if(expectedState !== state) {
    console.log('Returned State Does not Match Expected', expectedState, state);
    throw redirect(303, '/signup');
  }

  try {
    await locals.pb.collection('users').authWithOAuth2Code(
      provider.name,
      // @ts-ignore
      code,
      expectedVerifier,
      redirectURL,
      {name : 'github user'}
    );
  } catch (error) {
    console.log('Error Signing Up with OAuth2', error);
  }
  throw redirect(303, '/');
}
