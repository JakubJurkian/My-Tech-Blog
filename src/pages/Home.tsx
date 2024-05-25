import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Posts from '../components/Posts';
import AuthorCard from '../components/AuthorCard';
import SearchInput from '../components/SearchInput';
import SkeletonLoading from '../components/SkeletonLoading';

import { RootState } from '../store/store';
import { howManyPosts } from '../store/postsSlice';

import filterPosts from '../util/filterPosts';
import { fetchPostsHandler } from '../util/fetchPosts';

const authorInfo: string[] = [
  'Jakub Jurkian',
  "Welcome to my blog post! If you are into tech-related topics, you couldn't find a better place.",
  './me.webp',
  'https://github.com/JakubJurkian',
];

const selectPosts = (state: RootState) => state.posts.posts;
const selectPostsAmount = (state: RootState) => state.posts.postsAmount;

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [transition] = useAutoAnimate();
  const dispatch = useDispatch();

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const posts = useSelector(selectPosts);
  const postsAmount = useSelector(selectPostsAmount);

  const filteredPosts = useMemo(
    () => filterPosts(posts, debouncedQuery),
    [posts, debouncedQuery]
  );

  const fetchPosts = useCallback(() => {
    fetchPostsHandler(dispatch, setIsLoading, setError);
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
    dispatch(howManyPosts(filteredPosts.length));
  }, [fetchPosts, dispatch, filteredPosts.length]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

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
      <div className="relative bottom-12 xs:bottom-14 sm:bottom-20 md:bottom-28">
        <div className="max-w-3xl mx-2 lg:m-auto 2xl:max-w-4xl">
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
