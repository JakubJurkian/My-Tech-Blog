import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Posts from '../components/Posts';
import AuthorCard from '../components/AuthorCard';
import SearchInput from '../components/SearchInput';
import SkeletonLoading from '../components/SkeletonLoading';

import { RootState } from '../store/store';
import { howManyPosts } from '../store/postsSlice';

import filterPosts from '../util/filterPosts';
import { fetchPostsHandler } from '../util/fetchPosts';

import { handleAuthStateChange } from '../util/authStateObserver';

const authorInfo: string[] = [
  'Jakub Jurkian',
  "Welcome to my blog post! If you are into tech-related topics, you couldn't find a better place.",
  './me.webp',
  'https://github.com/JakubJurkian',
];

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [transition] = useAutoAnimate();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const postsAmount = useSelector(
    (state: RootState) => state.posts.postsAmount
  );

  const filteredPosts = filterPosts(posts, query);

  useEffect(() => {
    fetchPostsHandler(dispatch, setIsLoading, setError);
  }, [dispatch]);

  useEffect(() => {
    dispatch(howManyPosts(filteredPosts.length));
  }, [dispatch, filteredPosts.length]);

  console.log('home');

  useEffect(() => {
    const unsubscribe = handleAuthStateChange(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  const quantity =
    postsAmount === 1 ? `${postsAmount} post` : `${postsAmount} posts`;

  let content = <p className="text-center text-lg">Found no posts :&#40;</p>;

  if (filteredPosts.length > 0) content = <Posts posts={filteredPosts} />;

  if (error) content = <p className="text-center text-lg">{error}</p>;

  if (isLoading) {
    content = (
      <div className="flex flex-col gap-5">
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      <AuthorCard
        author={authorInfo[0]}
        description={authorInfo[1]}
        src={authorInfo[2]}
        githubLink={authorInfo[3]}
      />
      <div className="relative bottom-12 smallMobile:bottom-14 mobile:bottom-20 medium:bottom-28">
        <div className="max-w-3xl mx-2 tablet:m-auto desktop:max-w-4xl">
          <section>
            <div className="flex justify-between">
              <code>Posts</code>
              <code>{quantity}</code>
            </div>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </section>
          <div ref={transition}>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
