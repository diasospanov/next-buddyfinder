import { cookies } from 'next/headers';
import { getGroupRuns } from '../../../database/groupRuns';
import { getUserBySessionToken } from '../../../database/users';
import GroupRun from './GroupRun';

// import styles from './page.module.scss';

export const metadata = {
  title: 'Group Runs',
  description: 'Groups for Running',
};

export const dynamic = 'force-dynamic';

export default async function GroupPage() {
  const groupRuns = await getGroupRuns();
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

  return <GroupRun groupRuns={groupRuns} user={user} />;
}
