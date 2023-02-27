import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Cycling',
  description: 'Buddy for cycling',
};

export default function CyclingPage() {
  return (
    <main>
      <h1 className={styles.h1}>I am looking for a</h1>
      <section className={styles.section}>
        <Link href="/cycling/single">Single rider</Link>
        <Link href="/cycling/group">Group ride</Link>
      </section>
    </main>
  );
}
