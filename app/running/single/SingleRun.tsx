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

  return (
    <main>
      <h1 className={styles.h1}>Single runners up for a run</h1>
      <div className={styles.div}>
        <form className={styles.form}>
          <label>
            Date: <input /> dd/mm/yy
          </label>
          <br />
          <label>
            Time: <input /> hh:mm
          </label>
          <br />
          <label>
            Distance: <input /> km
          </label>
          <br />
          <label>
            Pace: <input /> min/km
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
                        value={run.date}
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
                        value={run.time}
                        onChange={(event) =>
                          setEditDate(event.currentTarget.value)
                        }
                      />
                    )}{' '}
                    -{' '}
                    {idOnEditMode !== run.id ? (
                      run.distance
                    ) : (
                      <input
                        value={run.distance}
                        onChange={(event) =>
                          setEditDate(event.currentTarget.value)
                        }
                      />
                    )}{' '}
                    km -{' '}
                    {idOnEditMode !== run.id ? (
                      run.pace
                    ) : (
                      <input
                        value={run.pace}
                        onChange={(event) =>
                          setEditDate(event.currentTarget.value)
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
