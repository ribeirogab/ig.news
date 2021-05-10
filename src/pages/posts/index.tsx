import { GetStaticProps } from 'next';
import Head from 'next/head';

import styles from '../../styles/posts.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a href={`/${post.slug}`} key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const Prismic = (await import('@prismicio/client')).default;
  const { RichText } = await import('prismic-dom');
  const { getPrismicClient } = await import('../../services/prismic');
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [
      Prismic.Predicates.at('document.type', 'post'),
    ],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 25,
    }
  );

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content
        .find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return {
    props: {
      posts,
    }
  }
};