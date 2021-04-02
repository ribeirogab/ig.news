import styles from '../styles/home.module.scss';

import { SubscribeButton } from '../components/SubscribeButton';

export default function Home() {
  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 &nbsp;&nbsp;Hey, welcome</span>
        <h1>News about<br />the <span>React</span> world.</h1>

        <p>
          Get access to all the publication 
          <span>for $9.90 month</span>
        </p>

        <SubscribeButton />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  )
}
