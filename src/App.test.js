import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("The user can fill the form and save the post information", () => {
  it("The user can save the form when click the submit button", async () => {
    render(<App />);

    const titlePostFormInput = screen.getByLabelText(/title/i);
    const contentPostFormInput = screen.getByLabelText(/content/i);
    const submitPostForm = screen.getByText(/submit/i);
    const postTitle = "My first post!";
    const postContent = "Lorem Ipsum....";

    userEvent.type(titlePostFormInput, postTitle);
    userEvent.type(contentPostFormInput, postContent);
    userEvent.click(submitPostForm);

    await waitFor(() => {
      const expectedDisplayPost = screen.getByText(postTitle);

      expect(expectedDisplayPost).toBeInTheDocument();
    });
  });

  it("The user can't save post without title", async () => {
    render(<App />);

    const titlePostFormInput = screen.getByLabelText(/title/i);
    const contentPostFormInput = screen.getByLabelText(/content/i);
    const submitPostForm = screen.getByText(/submit/i);
    const postContent = "Lorem Ipsum....";

    userEvent.type(contentPostFormInput, postContent);
    userEvent.click(submitPostForm);

    await waitFor(() => {
      expect(titlePostFormInput).toBeRequired();
    });
  });

  it("The user can save post without content", async () => {
    render(<App />);

    const titlePostFormInput = screen.getByLabelText(/title/i);
    const submitPostForm = screen.getByText(/submit/i);
    const postTitle = "Last post";

    userEvent.type(titlePostFormInput, postTitle);
    userEvent.click(submitPostForm);

    await waitFor(() => {
      const expectedDisplayPost = screen.getByText(postTitle);

      expect(expectedDisplayPost).toBeInTheDocument();
    });
  });

  it("The user can save multiple posts", async () => {
    render(<App />);

    const titlePostFormInput = screen.getByLabelText(/title/i);
    const contentPostFormInput = screen.getByLabelText(/content/i);
    const submitPostForm = screen.getByText(/submit/i);
    const postOneTitle = "First post";
    const postTwoTitle = "Second post";
    const postTwoContent = "Another post";

    userEvent.type(titlePostFormInput, postOneTitle);
    userEvent.click(submitPostForm);
    userEvent.type(titlePostFormInput, postTwoTitle);
    userEvent.type(contentPostFormInput, postTwoContent);
    userEvent.click(submitPostForm);

    await waitFor(() => {
      const expectedDisplayPostOne = screen.getByText(postOneTitle);

      expect(expectedDisplayPostOne).toBeInTheDocument();
    });

    await waitFor(() => {
      const expectedDisplayPostTwo = screen.getByText(postTwoTitle);

      expect(expectedDisplayPostTwo).toBeInTheDocument();
    });
  });
});
