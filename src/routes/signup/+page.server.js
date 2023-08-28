import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({locals, url, cookies}) {
  if(locals.pb.authStore.isValid) {
    throw redirect(303, '/');
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  GoogleOAuth : async({cookies, url, locals}) =>{
    const authMethods = await locals.pb.collection('users')
    .listAuthMethods();
    if(!authMethods) {
      return {
        authProviders : '',
      }
    }

    const redirectURL = `${url.origin}/oauth`;
    const googleAuthProvider = authMethods.authProviders.find(provider => provider.name === 'google');
    const authProviderRedirect = `${googleAuthProvider?.authUrl}${redirectURL}`;
    const state = googleAuthProvider?.state;
    const verifier = googleAuthProvider?.codeVerifier;
    cookies.set('state', state || '');
    cookies.set('verifier', verifier || '');

    throw redirect(302, authProviderRedirect);
  },
  GitHubOAuth : async({cookies, url, locals}) =>{
    const authMethods = await locals.pb.collection('users')
    .listAuthMethods();
    if(!authMethods) {
      return {
        authProviders : '',
      }
    }

    const redirectURL = `${url.origin}/githubOAuth`;
    const gitHubAuthProvider = authMethods.authProviders.find(provider => provider.name === 'github');
    const authProviderRedirect = `${gitHubAuthProvider?.authUrl}${redirectURL}`;

    const state = gitHubAuthProvider?.state;
    const verifier = gitHubAuthProvider?.codeVerifier;
    cookies.set('state', state || '');
    cookies.set('verifier', verifier || '');

    throw redirect(302, authProviderRedirect);
  }
};