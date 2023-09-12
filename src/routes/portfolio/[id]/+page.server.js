import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import axios from 'axios';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let id = params.id;
  let publicDP = null;
  try {
    publicDP = (await axios.get(`${PUBLIC_BACKEND_URL}/portfolio/${id}`)).data;
  } catch (e) {
    console.log(e);
    throw error(404, 'Data Not Found');
  }
  return {
    publicDP
  }
  
}