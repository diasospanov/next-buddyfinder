import { cookies } from 'next/headers';
import { getSingleRuns } from '../../../database/singleRuns';
import { getUserBySessionToken } from '../../../database/users';
import SingleRun from './SingleRun';

// import styles from './page.module.scss';

export const metadata = {
  title: 'Single runner',
  description: 'Buddy for running',
};

export const dynamic = 'force-dynamic';

export default async function SinglePage() {
  const singleRuns = await getSingleRuns();
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

  return <SingleRun singleRuns={singleRuns} user={user} />;
}
