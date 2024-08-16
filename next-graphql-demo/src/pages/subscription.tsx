import { useSubscription, gql } from '@apollo/client';

const USER_CREATED_SUBSCRIPTION = gql`
  subscription OnUserCreated {
    userCreated {
      id
      name
      age
    }
  }
`;

export default function UserCreatedSubscription() {
  const { data, loading, error } = useSubscription(USER_CREATED_SUBSCRIPTION);

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>New User Created</h1>
      <p>
        {data?.userCreated?.name} - {data?.userCreated?.age}
      </p>
    </div>
  );
}
