import CreateComment from '@/component/createComment';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GET_POST_QUERY = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      title
      content
      comments {
        id
        content
        author {
          name
        }
      }
    }
  }
`;

export default function PostDetail() {
  const router = useRouter();
  const { id }: any = router.query;

  const { data, loading, error } = useQuery(GET_POST_QUERY, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const post = data.post;

  return (
    <div>
      <Link href={`/posts`}>Back</Link>
      <br />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <CreateComment postId={id} initialComment={post.comments} />
    </div>
  );
}
