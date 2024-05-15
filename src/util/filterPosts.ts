import { Post } from "../store/postsSlice";

export default function filterPosts(posts: Post[], query: string) {
  return posts.filter((post) => {
    return post.title.toLowerCase().includes(query.toLowerCase());
  });
}
