import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sugtwfmyswhjvkbhfgug.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1Z3R3Zm15c3doanZrYmhmZ3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NjUwMDMsImV4cCI6MjA4MzQ0MTAwM30.tPvgCPOcBzNWOZqz07rtF-DFH1g1n7LZdu-ULmHsVkU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
