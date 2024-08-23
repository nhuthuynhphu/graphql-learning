import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!, $title: String) {
    posts(page: $page, limit: $limit, title: $title) {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

export default function Posts() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page, limit: 10, title },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Filter by title"
      />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <ul>
        {data.posts.map((post: any) => (
          <li key={post.id}>
            <h2>
              {post.id} - {post.title}
            </h2>
            <p>{post.content}</p>
            <p>By: {post.author.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
