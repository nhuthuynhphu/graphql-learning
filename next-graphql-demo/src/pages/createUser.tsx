import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!) {
    createUser(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export default function CreateUser() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createUser({ variables: { name, age: parseInt(age) } });
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <button type="submit">Create User</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>User created: {data.createUser.name}</p>}
    </div>
  );
}
