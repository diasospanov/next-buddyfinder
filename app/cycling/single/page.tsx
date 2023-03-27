import styles from './page.module.scss';

export const metadata = {
  title: 'Single rider',
  description: 'Buddy for cycling',
};

export default function SinglePage() {
  return (
    <main>
      <h1 className={styles.h1}>Single riders up for a ride</h1>
      <section className={styles.section}>
        <ul>
          <li>
            Rider1<button>Join</button>
          </li>
          <li>
            Rider2<button>Join</button>
          </li>
          <li>
            Rider3<button>Join</button>
          </li>
          <li>
            Rider4<button>Join</button>
          </li>
          <li>
            Rider5<button>Join</button>
          </li>
        </ul>
      </section>
    </main>
  );
}
