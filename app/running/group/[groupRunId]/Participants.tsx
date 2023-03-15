'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GroupRun } from '../../../../database/groupRuns';

// import styles from './Participants.module.scss';

type Props = {
  groupRun: GroupRun[];
  user:
    | {
        id: number;
        username: string;
      }
    | undefined;
};

export default function GroupPage(props: Props) {
  const router = useRouter();

  return <main>Participants:</main>;
}
