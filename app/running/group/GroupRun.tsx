'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GroupRun } from '../../../database/groupRuns';
import styles from './GroupRun.module.scss';

type Props = {
  groupRuns: GroupRun[];
  user:
    | {
        id: number;
        username: string;
      }
    | undefined;
};

export default function GroupPage(props: Props) {
  const router = useRouter();
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [editDate, setEditDate] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('');
  const [editDistance, setEditDistance] = useState<number>();
  const [editPace, setEditPace] = useState<number>();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [distance, setDistance] = useState<number>();
  const [pace, setPace] = useState<number>();
  const [error, setError] = useState<string>();
  const [organiser, setOrganiser] = useState<string>();
  const [message, setMessage] = useState<string>();
  // const [participant, setParticipant] = useState<string>();

  return (
    <main>
      <h1 className={styles.h1}>Up for a Group Run?</h1>
      <div className={styles.div}>
        <div>
          <form
            className={styles.form}
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/running/group', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ organiser, date, time, distance, pace }),
              });

              const data = await response.json();
              console.log('create a run', data);

              if (data.error) {
                setError(data.error);
                return;
              }
              setDate('');
              setTime('');
              /* setDistance();
setPace(); */
              router.refresh();
            }}
          >
            <label>
              {/* Date:{' '} */}
              <input
                className={styles.input}
                placeholder="DATE (dd/mm/yy)"
                value={date}
                onChange={(event) => setDate(event.currentTarget.value)}
              />{' '}
              {/* dd/mm/yy */}
            </label>
            <br />
            <label>
              {/* Time:{' '} */}
              <input
                className={styles.input}
                placeholder="TIME (hh:mm)"
                value={time}
                onChange={(event) => setTime(event.currentTarget.value)}
              />{' '}
              {/* hh:mm */}
            </label>
            <br />
            <label>
              {/* Distance:{' '} */}
              <input
                className={styles.input}
                placeholder="DISTANCE (km)"
                value={distance}
                onChange={(event: any) =>
                  setDistance(event.currentTarget.value)
                }
              />{' '}
              {/* km */}
            </label>
            <br />
            <label>
              {/* Pace:{' '} */}
              <input
                className={styles.input}
                placeholder="PACE (min/km)"
                value={pace}
                onChange={(event: any) => setPace(event.currentTarget.value)}
              />{' '}
              {/* min/km */}
            </label>
            <br />
            <button
              className={styles.button}
              onClick={() => setOrganiser(props.user?.username)}
            >
              <b>Create a Run</b>
            </button>
          </form>
          {typeof error === 'string' && (
            <div style={{ color: '#b8e6f3' }}>
              <h2 className={styles.message}>{error}</h2>
            </div>
          )}
          {typeof message === 'string' && (
            <div style={{ color: '#b8e6f3' }}>
              <h2 className={styles.message}>{message}</h2>
            </div>
          )}
        </div>
        <section className={styles.section}>
          {props.groupRuns.map((run) => {
            return (
              <ul className={styles.card} key={`run-${run.id}`}>
                <li className={styles.inner}>
                  <h2>
                    <Link href={`/running/group/${run.id}`}>
                      <div>
                        {idOnEditMode !== run.id ? (
                          run.date
                        ) : (
                          <input
                            className={styles.inputOnEdit}
                            value={editDate}
                            onChange={(event) =>
                              setEditDate(event.currentTarget.value)
                            }
                          />
                        )}{' '}
                        -{' '}
                        {idOnEditMode !== run.id ? (
                          run.time
                        ) : (
                          <input
                            className={styles.inputOnEdit}
                            value={editTime}
                            onChange={(event) =>
                              setEditTime(event.currentTarget.value)
                            }
                          />
                        )}{' '}
                        -{' '}
                        {idOnEditMode !== run.id ? (
                          run.distance
                        ) : (
                          <input
                            className={styles.inputOnEdit}
                            value={editDistance}
                            onChange={(event: any) =>
                              setEditDistance(event.currentTarget.value)
                            }
                          />
                        )}{' '}
                        km -{' '}
                        {idOnEditMode !== run.id ? (
                          run.pace
                        ) : (
                          <input
                            className={styles.inputOnEdit}
                            value={editPace}
                            onChange={(event: any) =>
                              setEditPace(event.currentTarget.value)
                            }
                          />
                        )}{' '}
                        min/km
                      </div>
                    </Link>
                    <br />
                    <Link href={`/profile/${run.organiser}`}>
                      Organiser: {run.organiser}
                    </Link>
                    <br />
                    {/* <Link href="/">
                      Participants:{' '}

                    </Link> */}
                  </h2>{' '}
                  <button
                    className={styles.button}
                    onClick={async () => {
                      // setParticipant(props.user?.username);

                      const response = await fetch(`/api/running/group/join`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          username: props.user?.username,
                          runId: run.id,
                          runOrganiser: run.organiser,
                        }),
                      });

                      const data = await response.json();

                      if (data.error) {
                        setError(data.error);
                        return;
                      }
                      if (data.message) {
                        setMessage(data.message);
                        return;
                      }

                      router.refresh();
                    }}
                  >
                    Join
                  </button>
                  {idOnEditMode !== run.id ? (
                    <button
                      className={styles.button}
                      onClick={() => {
                        setIdOnEditMode(run.id);
                        setEditDate(run.date);
                        setEditTime(run.time);
                        setEditDistance(run.distance);
                        setEditPace(run.pace);
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className={styles.button}
                      onClick={async () => {
                        const response = await fetch(
                          `/api/running/group/${run.id}`,
                          {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              organiser: run.organiser,
                              date: editDate,
                              time: editTime,
                              distance: editDistance,
                              pace: editPace,
                            }),
                          },
                        );

                        const data = await response.json();

                        if (data.error) {
                          setError(data.error);
                          return;
                        }
                        setIdOnEditMode(undefined);

                        router.refresh();
                      }}
                    >
                      Save
                    </button>
                  )}
                  <button
                    className={styles.button}
                    onClick={async () => {
                      const response = await fetch(
                        `/api/running/group/${run.id}`,
                        {
                          method: 'DELETE',
                        },
                      );

                      const data = await response.json();

                      if (data.error) {
                        setError(data.error);
                        return;
                      }

                      router.refresh();
                    }}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            );
          })}
        </section>
      </div>
    </main>
  );
}
