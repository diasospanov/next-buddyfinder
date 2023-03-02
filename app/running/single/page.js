import { getSingleRuns } from '../../../database/singleRuns';
import styles from './page.module.scss';

export const metadata = {
  title: 'Single runner',
  description: 'Buddy for running',
};

export default async function SinglePage() {
  const singleRuns = await getSingleRuns();

  return (
    <main>
      <h1 className={styles.h1}>Single runners up for a run</h1>
      <section className={styles.section}>
        {singleRuns.map((run) => {
          return (
            <ul key={`run-${run.id}`}>
              <li>
                <h2>
                  {run.date} - {run.time} - {run.distance} km - {run.pace}{' '}
                  min/km
                </h2>{' '}
                <button>Join</button>
              </li>
            </ul>
          );
        })}
      </section>
    </main>
  );
}
