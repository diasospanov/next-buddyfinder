import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Welcome to BuddyFinder</h1>
      <div>Running</div>
      <div>Cycling</div>
    </main>
  );
}
