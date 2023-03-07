import { notFound } from 'next/navigation';
import { getUserById } from '../../../database/users';

type Props = { params: { id: number } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>{user.username}</h1>
      <p>id: {user.id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
    </>
  );
}
