import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { howManyPosts } from '../store/postsSlice';
import PostPreview from './PostPreview';

interface Post {
  id: string;
  author: string;
  date: string;
  description: string;
  img: string;
  text: string;
  title: string;
}
type PostsArray = Post[];

function Posts(props: { posts: PostsArray }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(howManyPosts(props.posts.length));
  }, [dispatch, props.posts.length]);

  const [transition] = useAutoAnimate();

  return (
    <section>
      <ul className="flex flex-col gap-5" ref={transition}>
        {props.posts.map((post) => {
          return (
            <PostPreview
              key={post.id}
              link={post.id}
              title={post.title}
              description={post.description}
              img={post.img}
              date={post.date}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Posts;
