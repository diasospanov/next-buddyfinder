import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Running',
  description: 'Buddy for running',
};

export default function RunningPage() {
  return (
    <main>
      <h1 className={styles.h1}>I am looking for a</h1>
      <section className={styles.section}>
        <Link href="/running/single">Single runner</Link>
        <Link href="/running/group">Group run</Link>
      </section>
    </main>
  );
}
