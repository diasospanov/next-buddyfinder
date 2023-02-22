import './global.scss';
import Link from 'next/link';
import styles from './layout.module.scss';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav className={styles.header}>
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <label>
                E-mail
                <input />
              </label>
              <label>
                Password
                <input />
              </label>
            </div>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>Di & Co. All rights reserved.</footer>
      </body>
    </html>
  );
}
