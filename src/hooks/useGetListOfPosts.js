import { useEffect, useState } from "react";
import { PostService } from "services/PostRepositoryImpl";

export const useGetListOfPosts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    PostService.getAll().then((res) => {
      setPostList(res);
    });
  }, []);

  return { postList };
};
