import { GetStaticProps } from 'next';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from '../styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  if (!product) {
    return <h1>Not found. 404</h1>
  }

  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>
          <span className={styles.emoji}>👏</span>
          Hey, welcome
        </span>
        <h1>News about<br />the <span>React</span> world.</h1>

        <p>
          Get access to all the publication<br/>
          {product?.amount && (<span>for {product.amount} month</span>)}
        </p>

        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { stripe } = await import('../services/stripe');

  const price = await stripe.prices.retrieve('price_1Ibo38EI4ePvucejHqR3SQmd')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}