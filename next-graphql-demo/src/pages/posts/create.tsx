import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($userId: Int!, $title: String!, $content: String!) {
    createPost(userId: $userId, title: $title, content: $content) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createPost({
        variables: {
          title,
          content,
          userId: 1, // Replace authorId with actual user ID
        },
      });
      setTitle('');
      setContent('');
      alert('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
}
