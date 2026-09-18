import { useEffect } from "react";
import { supabase } from "./lib/supabase";

function TestSupabase() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("test")
        .select("*");

      console.log("Supabase:", data, error);
    };

    testConnection();
  }, []);

  return <h1>Supabase Test</h1>;
}

export default TestSupabase;