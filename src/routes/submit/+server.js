// @ts-nocheck
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import axios from 'axios';

/** @type {import('./$types').RequestHandler} */

// 포트폴리오 업로드
export async function POST({request, cookies }) {
  const myToken = cookies.get('DP_ACCESS_TOKEN');
  try {
    let data = await request.json();
    let res = await axios.post(`${PUBLIC_BACKEND_URL}/portfolio`,data, {
      headers : {
        'Authorization' : `Bearer ${myToken}`
      }
    });
    return json({message : 'ok'}, {status : 201});
  } catch (error) {
    return json({message : error}, {status : 400});
  }
}

/** @type {import('./$types').RequestHandler} */

//포트폴리오 수정
export async function PATCH({ request, cookies}) {
  const myToken = cookies.get('DP_ACCESS_TOKEN');
  try {
    let data = await request.json();
    let res = await axios.patch(`${PUBLIC_BACKEND_URL}/portfolio`,data, {
      headers : {
        'Authorization' : `Bearer ${myToken}`
      }
    });
    return json({message : 'ok'}, {status : 201});
  } catch (error) {
    return json({message : error}, {status : 400});
  }
  
}