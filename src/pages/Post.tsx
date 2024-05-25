import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import Post from '../components/Post';

function PostPage() {
  const { postId } = useParams();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return (
      <div>
        <p>Post not found!</p>
      </div>
    );
  }

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, 300);

  console.log('post');

  return (
    <div className="flex justify-center relative bottom-20 xs:bottom-24 sm:bottom-32 smPlus:bottom-40 md:bottom-48 lg:bottom-56">
      <Post
        author={post.author}
        addedXAgo={post.addedXAgo}
        title={post.title}
        img={post.img}
        text={post.text}
      />
    </div>
  );
}

export default PostPage;
