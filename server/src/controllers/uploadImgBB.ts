import axios from 'axios';
import FormData from 'form-data';

const SUSCESSFUL_UPLOAD = 'Upload successful:';
const ERROR_UPLOADING_IMAGE = 'Error uploading image:';

const apiKey = process.env.IMGBB_API_KEY;

export const uploadImage = async (imageData: Buffer) => {
  try {
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', imageData.toString('base64'));

    const response = await axios.post(
      'https://api.imgbb.com/1/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log(SUSCESSFUL_UPLOAD, response.data);
    return response.data.data.url;
  } catch (error) {
    console.error(ERROR_UPLOADING_IMAGE, error);
    throw error;
  }
};
