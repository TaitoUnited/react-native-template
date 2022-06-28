import dotenv from 'dotenv';
import { fetchIntrospection } from './fetch.mjs';

dotenv.config({ path: '.env.development' });

fetchIntrospection();
