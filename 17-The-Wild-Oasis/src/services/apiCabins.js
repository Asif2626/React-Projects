import supabase, { supabaseUrl } from "./supabase";

// ------------------------------
// GET CABINS
// ------------------------------
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// ------------------------------
// CREATE OR EDIT CABIN
// ------------------------------
export async function createEditCabin(newCabin, id = null) {
  // Check if the image is already a URL from Supabase
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  let imageName = null;

  // If the image is a File, generate a random name
  if (newCabin.image instanceof File) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  }

  // Determine the image path to store in the database
  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : null;

  // 1. Create or edit the cabin in the database
  let query;
  if (!id) {
    query = supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
  } else {
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(
      id ? "Cabin could not be updated" : "Cabin could not be created"
    );
  }

  // 2. Upload image to Supabase storage if it's a File
  if (hasImagePath) return data;
  if (!hasImagePath && newCabin.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // If image upload fails, delete the newly created cabin
    if (storageError) {
      if (!id) await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded. Cabin was not created/updated."
      );
    }
  }

  return data;
}

// ------------------------------
// DELETE CABIN
// ------------------------------
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
