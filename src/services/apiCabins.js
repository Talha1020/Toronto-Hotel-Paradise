import supabase from "./supabase";

export default async function getCabins() {
  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("this is not right cabins");
  }
  return data;
}
