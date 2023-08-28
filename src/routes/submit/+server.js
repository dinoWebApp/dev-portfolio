import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { json, redirect } from '@sveltejs/kit';
import axios from 'axios';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
  try {
    let data = await request.json();
    let res = await axios.post(`${PUBLIC_POCKETBASE_URL}/api/collections/portfolio/records`,data, {
      headers : {
        'Authorization' : `Bearer ${locals.pb.authStore.token}`
      }
    });
    return json({message : 'ok'}, {status : 201});
  } catch (error) {
    return json({message : error}, {status : 400});
  }
}

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ request, locals}) {
  try {
    let data = await request.json();
    let res = await axios.patch(`${PUBLIC_POCKETBASE_URL}/api/collections/portfolio/records/${locals.user?.id}`,data, {
      headers : {
        'Authorization' : `Bearer ${locals.pb.authStore.token}`
      }
    });
    return json({message : 'ok'}, {status : 201});
  } catch (error) {
    return json({message : error}, {status : 400});
  }
  
}