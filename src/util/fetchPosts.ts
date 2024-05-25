import { Dispatch } from 'react';
import { fetchPostsOnly } from './fetchPostsOnly';

type SetIsLoading = (value: boolean) => void;
type SetError = (value: null) => void;

export const fetchPostsHandler = async (
  dispatch: Dispatch<any>,
  setIsLoading: SetIsLoading,
  setError: SetError
) => {
  setIsLoading(true);
  setError(null);
  try {
    await fetchPostsOnly(dispatch);
  } catch (error: any) {
    setError(error.message);
  }

  setIsLoading(false);
};
