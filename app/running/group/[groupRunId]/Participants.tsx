'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GroupRun } from '../../../../database/groupRuns';
import { GroupRunsParticipant } from '../../../../database/groupRunsParticipants';
import styles from './Participants.module.scss';

type Props = {
  groupRun: GroupRun;
  user:
    | {
        id: number;
        username: string;
      }
    | undefined;
  groupRunParticipants: GroupRunsParticipant[];
};

export default function GroupPage(props: Props) {
  const router = useRouter();

  /* const participantOfAGroupRun = {
    id: groupRunParticipants[0].id;

  }; */

  return (
    <main>
      <div className={styles.div}>
        <div className={styles.card}>
          <div className={styles.inner} key={`run-${props.groupRun.id}`}>
            <h2>
              <p>Organiser: {props.groupRun.organiser}</p>
              <br />
              <p>
                {props.groupRun.date} at {props.groupRun.time}
              </p>
              <br />
              <p>
                {props.groupRun.distance} km at {props.groupRun.pace} min/km
              </p>
            </h2>
          </div>
        </div>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.inner}>
              Participants:{' '}
              {props.groupRunParticipants.map((participant) => {
                return (
                  <h2 key={`participant-${participant.id}`}>
                    <ul>
                      <li>{participant.username}</li>
                    </ul>
                  </h2>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
