import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Cycling',
  description: 'Buddy for cycling',
};

export default function CyclingPage() {
  return (
    <main>
      <h1 className={styles.h1}>
        Cycling Section is under construction.
        <br />
        Consider finding a running buddy in the meantime.
      </h1>
      <section className={styles.section}>
        <Link href="/running">Take me to a Running Section</Link>
      </section>
    </main>
  );
}
