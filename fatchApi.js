import axios from "axios";

const URL = "http://192.168.203.105:8800/api"


export const updateLikesInBackend = async (postId, userId, liked) => {
  try {
    const response = await fetch(`${URL}/posts/${postId}/like`, {
      method: 'PUT', // Assuming your backend uses a POST request for liking/disliking
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers needed for authentication or other purposes
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Handle the response from the server if needed
    console.log('Likes updated successfully:', data);

    // Additional logic to update UI if needed
    // For example, you might want to update the likes count in the UI based on the 'liked' parameter
    // updateLikesCountInUI(liked);
  } catch (error) {
    console.error('Error updating likes in the backend:', error);
  }
};
