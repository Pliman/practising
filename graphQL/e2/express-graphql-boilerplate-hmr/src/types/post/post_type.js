import Comment from "../comment/comment_type";

const Post = `
  type Post {
    id: Int!
    title: String!
    commentsss: [Comment]
  }
`;

export default () => [Post, Comment];
