import { cookies } from 'next/headers';
import { getGroupRunById } from '../../../../database/groupRuns';
import { getUserBySessionToken } from '../../../database/users';
import Participants from './Participants';

// import styles from './page.module.scss';

export const metadata = {
  title: 'Group Run',
  description: 'Group Run',
};

export default async function GroupRunPage() {
  const groupRun = await getGroupRunById();
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

  return <Participants groupRun={groupRun} user={user} />;
}
