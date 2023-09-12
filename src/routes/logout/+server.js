// @ts-nocheck
import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
  throw redirect(301, `${PUBLIC_BACKEND_URL}/auth/logout`)
}