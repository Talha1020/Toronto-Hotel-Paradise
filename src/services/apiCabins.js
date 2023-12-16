import supabase from './supabase';

const supaBaseUrl = 'https://erkzxfceomfmaxrjuhcq.supabase.co';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// *******Fetching a new cabin******
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function getCabins() {
  // eslint-disable-next-line no-unused-vars
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) throw new Error('Could not get the cabins');

  return data;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// *******Deleting a cabin******
//////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteCabins(id) {
  const { error: deleteError } = await supabase.from('cabins').delete().eq('id', id);
  if (deleteError) throw new Error('Cabin could not be deleted');
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// *******Editing a cabin******
//////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function EditCabins(newCabin, id) {
  // images´ 0th element has already been replaced to image property in create cabin form. Thats why I used only the newCabin.image not newCabin.image[0]
  const hasImageUrl = newCabin.image?.startsWith?.(supaBaseUrl);
  ///  image coming from data might not be a string, thats why used "?" to check whetbher function is availbale on image or not
  const ImageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const ImageUrl = hasImageUrl ? newCabin.image : `${supaBaseUrl}/storage/v1/object/public/cabin-images/${ImageName}`;

  //**********1. Cabins insert function**********
  let query = supabase.from('cabins');

  if (!id) query = query.insert([{ ...newCabin, image: ImageUrl }]);

  //Important to note here, the image file should be the 0th element in image object. 0th element has already been selected in the create Cabin form file.
  //
  //***********2. update function********************

  if (id) query = query.update({ ...newCabin, image: ImageUrl }).eq('id', id);

  const { error, data } = await query.select().single(); //for both update and insert function

  if (error) throw new Error('Cabin could not be updated');

  //**********3. Image upload ************************

  if (hasImageUrl) return data;
  const { error: imageError } = await supabase.storage.from('cabin-images').upload(ImageName, newCabin?.image);
  if (imageError) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);
    if (error) throw new Error('Image could not be uploaded');
  }

  return data;
}
