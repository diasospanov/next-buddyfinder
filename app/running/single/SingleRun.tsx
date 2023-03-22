'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SingleRun } from '../../../database/singleRuns';
import styles from './SingleRun.module.scss';

type Props = {
  singleRuns: SingleRun[];
  user:
    | {
        id: number;
        username: string;
      }
    | undefined;
};

export default function SinglePage(props: Props) {
  // const singleRuns = await getSingleRuns();
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
  const participant = '';

  return (
    <main>
      <h1 className={styles.h1}>Single runners up for a run</h1>
      <div className={styles.div}>
        <div>
          <form
            className={styles.form}
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/running/single', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  organiser,
                  participant,
                  date,
                  time,
                  distance,
                  pace,
                }),
              });

              const data = await response.json();

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
                name="date"
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
        </div>
        <section className={styles.section}>
          {props.singleRuns.map((run) => {
            return (
              <ul className={styles.card} key={`run-${run.id}`}>
                <li className={styles.inner}>
                  <h2>
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
                    <br />
                    <Link href={`/profile/${run.organiser}`}>
                      Organiser: {run.organiser}
                    </Link>
                    <br />
                    <Link href={`/profile/${run.participant}`}>
                      Participant: {run.participant}
                    </Link>
                  </h2>{' '}
                  <button
                    className={styles.button}
                    onClick={async () => {
                      const response = await fetch(
                        `/api/running/single/${run.id}`,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            organiser: run.organiser,
                            participant:
                              props.user?.username === undefined
                                ? participant
                                : props.user.username,
                            date: run.date,
                            time: run.time,
                            distance: run.distance,
                            pace: run.pace,
                          }),
                        },
                      );

                      const data = await response.json();

                      if (data.error) {
                        setError(data.error);
                        return;
                      }
                      console.log('participant', data);
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
                          `/api/running/single/${run.id}`,
                          {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              organiser: run.organiser,
                              participant: run.participant,
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
                        `/api/running/single/${run.id}`,
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
