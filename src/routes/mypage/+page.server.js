import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { pb } from '$lib/server/pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if(!locals.pb.authStore.isValid) {
    throw redirect(303, '/signup');
  }
  let data = null;
  try {
    data = (await axios
    .get(`${PUBLIC_POCKETBASE_URL}/api/collections/portfolio/records/${locals.user?.id}`,{
      headers: {
        'Authorization': `Bearer ${locals.pb.authStore.token}`
      }
    }))
    .data;
  } catch (error) {
    // @ts-ignore
    console.log(error.response.status);
  };

  return {
    portfolio : data
  }
  
}