import Image from 'next/image';
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
        <Link href="/running">
          <Image
            className={styles.link}
            src="/images/running.jpg"
            alt="running"
            width="300"
            height="400"
          />

          <p>Running</p>
        </Link>
        <Link href="/cycling">
          <Image
            className={styles.link}
            src="/images/cycling.jpg"
            alt="cycling"
            width="300"
            height="400"
          />
          <p>Cycling</p>
        </Link>
      </section>
    </main>
  );
}
