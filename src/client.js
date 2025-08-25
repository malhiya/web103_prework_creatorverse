import { createClient } from '@supabase/supabase-js';

const URL = 'https://yvcyqrpwgfehglumnuoa.supabase.co'; 
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Y3lxcnB3Z2ZlaGdsdW1udW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzOTgzNTgsImV4cCI6MjA2ODk3NDM1OH0.i1pVkuMm9qJvfHD1umtM7tkF34F51KmugTuBN6S3Cb8'; 

export const supabase = createClient(URL, API_KEY);
