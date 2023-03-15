import Image from 'next/image';
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
        <Link href="/running/single">
          <Image
            className={styles.link}
            src="/images/single.jpg"
            alt="single runner"
            width="300"
            height="400"
          />
          <p>Single runner</p>
        </Link>
        <Link href="/running/group">
          <Image
            className={styles.link}
            src="/images/group.jpg"
            alt="group runners"
            width="300"
            height="400"
          />
          <p>Group run</p>
        </Link>
      </section>
    </main>
  );
}
