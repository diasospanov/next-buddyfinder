'use client';
import { useState } from 'react';
import { SingleRun } from '../../../database/singleRuns';
import styles from './SingleRun.module.scss';

type Props = {
  singleRuns: SingleRun[];
};

export default function SinglePage(props: Props) {
  // const singleRuns = await getSingleRuns();
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

  return (
    <main>
      <h1 className={styles.h1}>Single runners up for a run</h1>
      <div className={styles.div}>
        <form
          className={styles.form}
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('/api/running/single', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ date, time, distance, pace }),
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              return;
            }
          }}
        >
          <label>
            Date:{' '}
            <input
              value={date}
              onChange={(event) => setDate(event.currentTarget.value)}
            />{' '}
            dd/mm/yy
          </label>
          <br />
          <label>
            Time:{' '}
            <input
              value={time}
              onChange={(event) => setTime(event.currentTarget.value)}
            />{' '}
            hh:mm
          </label>
          <br />
          <label>
            Distance:{' '}
            <input
              value={distance}
              onChange={(event: any) => setDistance(event.currentTarget.value)}
            />{' '}
            km
          </label>
          <br />
          <label>
            Pace:{' '}
            <input
              value={pace}
              onChange={(event: any) => setPace(event.currentTarget.value)}
            />{' '}
            min/km
          </label>
          <br />
          <button>
            <b>Create a Run</b>
          </button>
        </form>
        <section className={styles.section}>
          {props.singleRuns.map((run) => {
            return (
              <ul key={`run-${run.id}`}>
                <li>
                  <h2>
                    {idOnEditMode !== run.id ? (
                      run.date
                    ) : (
                      <input
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
                        value={editPace}
                        onChange={(event: any) =>
                          setEditPace(event.currentTarget.value)
                        }
                      />
                    )}{' '}
                    min/km
                  </h2>{' '}
                  <button>Join</button>
                  {idOnEditMode !== run.id ? (
                    <button
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
                      onClick={() => {
                        setIdOnEditMode(undefined);
                      }}
                    >
                      Save
                    </button>
                  )}
                  <button>Delete</button>
                </li>
              </ul>
            );
          })}
        </section>
      </div>
    </main>
  );
}
