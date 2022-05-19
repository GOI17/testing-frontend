class PostRepository {
  constructor() {
    this.id = 1;
    this.posts = [];
  }

  getAll() {
    return Promise.resolve(this.posts);
  }

  create(post) {
    return new Promise((resolve, reject) => {
      if (!post?.title) reject("Missing post title");
      this.posts.push({ id: this.id, ...post });
      resolve({ id: this.id, ...post });
      this.id++;
    });
  }
}

const instance = new PostRepository();

export { instance as PostService };
