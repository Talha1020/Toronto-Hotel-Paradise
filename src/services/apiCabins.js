import supabase from "./supabase";

export async function getCabins() {
  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase.from("cabins").select("*");

  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
}
