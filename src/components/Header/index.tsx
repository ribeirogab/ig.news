import Link from 'next/link';

import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/images/logo.svg" alt="ig.news" />
        </Link>
        <nav>
          <ActiveLink 
            href="/"
            passHref
            activeClassName={styles.active}
          >
            <a className={styles.active}>Home</a>
          </ActiveLink>

          <ActiveLink
            href="/posts"
            passHref
            activeClassName={styles.active}
          >
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}