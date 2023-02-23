import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Buddy Finder',
  description: 'Find your sport companion',
};

export default function HomePage() {
  return (
    <main>
      <h1 className={styles.h1}>Welcome to Buddy Finder</h1>
      <section className={styles.section}>
        <Link href="/running">Running</Link>
        <Link href="/cycling">Cycling</Link>
      </section>
    </main>
  );
}
