import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://erkzxfceomfmaxrjuhcq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVya3p4ZmNlb21mbWF4cmp1aGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NDk5NTQsImV4cCI6MjAxNDAyNTk1NH0.CBCc2rpp4urp9X-nMAbGwmmZ4mXnHkAIPXSw6FNbRlw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
