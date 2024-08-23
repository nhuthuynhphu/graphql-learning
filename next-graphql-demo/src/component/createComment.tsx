import { useEffect, useState } from 'react';
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

function CreateComment({ postId, initialComment }: any) {
  const [content, setContent] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
  const [comments, setComments] = useState<any>(initialComment);

  useEffect(() => {
    // Listen for new comments via SSE
    const eventSource = new EventSource(`http://localhost:3000/comments/sse`);

    eventSource.onmessage = function (event) {
      const newComment = JSON.parse(event.data);
      console.log(newComment);

      // Check if the comment belongs to the current post
      if (newComment.post.id == postId) {
        setComments((prevComments: any) => [...prevComments, newComment]);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [postId]);

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
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      <ul>
        {comments?.map((comment: any) => (
          <li key={comment.id}>
            <strong>{comment.author.name}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateComment;
