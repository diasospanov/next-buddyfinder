'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './SigninForm.module.scss';

export default function SigninForm(/* props: { returnTo?: string | string[] } */) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <div className={styles.div}>
      <form
        className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          router.push('/');
          router.refresh();
          /*         const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.replace(`/profile/${data.user.username}`);
        router.refresh(); */
        }}
      >
        {errors.map((error) => (
          <div key={`error-${error.message}`}>Error: {error.message}</div>
        ))}
        <label>
          {/* username: */}
          <input
            className={styles.input}
            placeholder="USERNAME"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          {/* password: */}
          <input
            className={styles.input}
            placeholder="PASSWORD"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <br />
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
}
