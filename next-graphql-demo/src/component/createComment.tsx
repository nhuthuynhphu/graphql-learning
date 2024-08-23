import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($content: String!, $postId: Int!, $userId: Int!) {
    createComment(content: $content, postId: $postId, userId: $userId) {
      id
      content
      author {
        name
      }
      post {
        id
        title
      }
    }
  }
`;

function CreateComment({ postId }: any) {
  const [content, setContent] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createComment({
        variables: {
          content,
          postId: parseInt(postId, 10),
          userId: 1, // Replace userId with actual user ID
        },
      });
      setContent('');
      alert('Comment created successfully');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CreateComment;
