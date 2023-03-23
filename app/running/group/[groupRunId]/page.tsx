import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getGroupRunById } from '../../../../database/groupRuns';
import { getGroupRunParticipantsByRunId } from '../../../../database/groupRunsParticipants';
import { getUserBySessionToken } from '../../../../database/users';
import Participants from './Participants';

// import styles from './page.module.scss';

export const metadata = {
  title: 'Group Run',
  description: 'Group Run',
};

type Props = { params: { groupRunId: number } };

export default async function GroupRunPage({ params }: Props) {
  const groupRun = await getGroupRunById(params.groupRunId);
  const groupRunParticipants = await getGroupRunParticipantsByRunId(
    params.groupRunId,
  );

  if (typeof groupRun === 'undefined') {
    notFound();
  }
  // console.log('a', groupRunParticipants);
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
    <Participants
      groupRun={groupRun}
      user={user}
      groupRunParticipants={groupRunParticipants}
    />
  );
}
