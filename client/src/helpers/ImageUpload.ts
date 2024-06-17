import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import firebaseApp from "@/config/firebase.config";

export const uploadImageToFirebaseAndReturnUrl = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, "images" + "/" + file.name);

    const uploadedImageResponse = await uploadBytes(storageRef, file);
    const dowmloadUrl = await getDownloadURL(uploadedImageResponse.ref);
    return dowmloadUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
