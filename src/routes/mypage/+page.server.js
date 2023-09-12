// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { verifyJWT } from '$lib/server/getToken';
import { JWT_SECRET } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const myToken = cookies.get('DP_ACCESS_TOKEN') || '';
  const decoded = verifyJWT(myToken, JWT_SECRET);
  
  if(!myToken) {
    throw redirect(303, '/signup');
  }
  let data = null;
  try {
    data = (await axios
    .get(`${PUBLIC_BACKEND_URL}/portfolio`,{
      headers: {
        'Authorization': `Bearer ${myToken}`
      }
    }))
    .data;
  } catch (error) {
    // @ts-ignore
  };

  return {
    portfolio : data, 
    email : decoded.email
  }
  
}

