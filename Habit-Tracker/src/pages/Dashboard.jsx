import { supabase } from "../lib/supabase";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </>
  );
}
