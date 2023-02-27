import styles from './page.module.scss';

export const metadata = {
  title: 'Single runner',
  description: 'Buddy for running',
};

export default function SinglePage() {
  return (
    <main>
      <h1 className={styles.h1}>Single runners up for a run</h1>
      <section className={styles.section}>
        <ul>
          <li>
            Runner1 - 10 km - 6.0 min/km <button>Join</button>
          </li>
          <li>
            Runner2 - 15 km - 5.5 min/km <button>Join</button>
          </li>
          <li>
            Runner3 - 5 km - 7.0 min/km <button>Join</button>
          </li>
          <li>
            Runner4 - 7 km - 6.0 min/km <button>Join</button>
          </li>
          <li>
            Runner5 - 10 km - 5.0 min/km <button>Join</button>
          </li>
        </ul>
      </section>
    </main>
  );
}
