import axios from 'axios';
import FormData from 'form-data';
import * as messages from '../constants/messages';

export const uploadImage = async (imageData: Buffer) => {
  try {
    const formData = new FormData();
    formData.append('key', process.env.IMGBB_API_KEY);
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

    console.log(messages.SUSCESSFUL_UPLOAD, response.data);
    return response.data.data.url;
  } catch (error) {
    console.error(messages.ERROR_UPLOADING_IMAGE, error);
    throw error;
  }
};
