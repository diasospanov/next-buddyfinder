import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import styles from './page.module.scss';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (typeof user === 'undefined') {
    notFound();
  }

  return (
    <main>
      <div className={styles.div}>
        <Image
          className={styles.link}
          src="/images/runnerAvatar.png"
          alt="runner avatar"
          width="300"
          height="300"
        />
        <div className={styles.card}>
          <div className={styles.inner}>
            <h1>{user.username}</h1>
            <p>id: {user.id}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
