import { ref, remove } from 'firebase/database';
import { database } from '../firebase';

export const deletePost = async (userId: string, postId: string) => {
  try {
    const postRef = ref(database, `posts/${userId}/${postId}`);
    await remove(postRef);
    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
