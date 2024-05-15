import { Dispatch } from "react";
import timeAgo from "./timeAgo";
import { date } from "./date";
import { getPosts } from "../store/postsSlice";

type SetIsLoading = (value: boolean) => void;
type SetError = (value: null) => void;

export const fetchPostsHandler = async (dispatch: Dispatch<any>, setIsLoading: SetIsLoading, setError: SetError) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://personal-tech-blog-development-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedPosts = [];
      for (const key in data) {
        loadedPosts.push({
          id: key,
          author: data[key].author,
          date: timeAgo(data[key].date),
          addedXAgo: date(data[key].date),
          img: data[key].img,
          text: data[key].text,
          title: data[key].title,
          description: data[key].description,
        });
      }

      dispatch(getPosts(loadedPosts));
    } catch (error: any) {
      setError(error.message);
    }
    
    setIsLoading(false);
};