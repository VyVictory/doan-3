import axios from 'axios';

const GetApiIcons = async () => {
  try {
    const response = await axios.get(
      'https://emoji-api.com/emojis?access_key=7668efaa974863e4d390acfc5503f0f23253e3cb'
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error fetching the emojis:', error);
    return [];
  }
};

export default GetApiIcons;