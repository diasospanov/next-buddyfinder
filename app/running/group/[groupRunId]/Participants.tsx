'use client';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
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
  // const router = useRouter();

  /* const participantOfAGroupRun = {
    id: groupRunParticipants[0].id;

  }; */

  return !props.user ? (
    <div className={styles.h2}>
      <h2>Please Sign Up/In to view the Page</h2>
    </div>
  ) : (
    <main>
      <div className={styles.div}>
        <div className={styles.card}>
          <div className={styles.inner} key={`run-${props.groupRun.id}`}>
            <h2>
              <Link href={`/profile/${props.groupRun.organiser}`}>
                <p>Organiser: {props.groupRun.organiser}</p>
              </Link>
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
                    <Link href={`/profile/${participant.username}`}>
                      <ul>
                        <li>{participant.username}</li>
                      </ul>
                    </Link>
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
