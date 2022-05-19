import { useCallback, useState } from "react";
import { PostService } from "services/PostRepositoryImpl";

export const useCreatePost = () => {
  const [post, setPost] = useState(null);

  const dispatchCreatePost = useCallback((post) => {
    PostService.create(post).then((res) => setPost(res));

    return () => {
      setPost(null);
    };
  }, []);

  return { dispatchCreatePost, post };
};
