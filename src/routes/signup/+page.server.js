import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import axios from "axios";

/** @type {import('./$types').PageServerLoad} */
export async function load({locals, url, cookies}) {
  
}

/** @type {import('./$types').Actions} */
export const actions = {
  GoogleOAuth : async({cookies, url, locals}) =>{
    throw redirect(301, `${PUBLIC_BACKEND_URL}/auth/google`);
  },
  GitHubOAuth : async({cookies, url, locals}) =>{
    throw redirect(301, `${PUBLIC_BACKEND_URL}/auth/github`);
  }
};