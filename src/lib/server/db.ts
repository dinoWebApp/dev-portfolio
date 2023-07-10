import { MONGODB_URL } from '$env/static/private'
import mongoose from 'mongoose';

export const db = ()=>{
  mongoose.connect(MONGODB_URL).then(()=>{
    console.log('db is connected');
  })
  .catch(err=>{
    console.log('db connect error', err);
  });
}




