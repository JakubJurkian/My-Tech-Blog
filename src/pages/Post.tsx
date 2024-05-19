import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import Post from '../components/Post';

function PostPage() {
  const { postId } = useParams();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const post = posts.filter((post) => post.id === postId);

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, 300);

  return (
    <div className="flex justify-center relative bottom-20 xs:bottom-24 sm:bottom-32 smPlus:bottom-40 md:bottom-48 lg:bottom-56">
      <Post
        author={post[0].author}
        addedXAgo={post[0].addedXAgo}
        title={post[0].title}
        img={post[0].img}
        text={post[0].text}
      />
    </div>
  );
}

export default PostPage;
