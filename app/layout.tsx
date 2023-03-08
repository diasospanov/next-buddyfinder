import './global.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav className={styles.header}>
            <div>
              <Link href="/">Home</Link>
            </div>

            <div className={styles.div}>
              {user ? (
                <>
                  {user.username}
                  <Link href="/signout" prefetch={false}>
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/signin">Sign In</Link>
                  <Link href="/signup">Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </header>
        {props.children}
        <footer className={styles.footer}>Di & Co. All rights reserved.</footer>
      </body>
    </html>
  );
}
