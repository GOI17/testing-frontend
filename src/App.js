import { useCallback, useState } from "react";

import { useGetListOfPosts } from "hooks/useGetListOfPosts";
import { useCreatePost } from "hooks/useCreatePost";

const Form = ({ onSubmitPost }) => {
  const [form, setForm] = useState({ title: null, content: null });

  const onChange = (evt) => {
    const { id, value } = evt.currentTarget;
    setForm((currentForm) => ({
      ...currentForm,
      [id]: value,
    }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (!form.title) return;
    onSubmitPost(form);

    evt.target.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input required onChange={onChange} id="title" />
      <label htmlFor="content">Content</label>
      <input onChange={onChange} id="content" />
      <button type="submit">Submit</button>
    </form>
  );
};

const PostList = ({ list }) =>
  list.map((post) => <p key={post.id}>{post.title}</p>);

const Posts = () => {
  const { postList } = useGetListOfPosts();
  const { dispatchCreatePost } = useCreatePost();

  const onSubmitPost = useCallback(
    (post) => dispatchCreatePost(post),
    [dispatchCreatePost]
  );

  return (
    <>
      <Form onSubmitPost={onSubmitPost} />
      <PostList list={postList} />
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <Posts />
    </div>
  );
};

export default App;
