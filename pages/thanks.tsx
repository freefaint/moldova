import type { NextPage } from 'next';
import Head from 'next/head';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';

import ru from '../lang/ru-RU.json';
import md from '../lang/ru-MD.json';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { locale } = useRouter();

  const lang: any = locale === "ru-RU" ? ru : md;

  return (
    <div className={styles.container}>
      <Head>
        <title>{lang.lozung}</title>
        <meta httpEquiv="refresh" content={`3;url=/${locale === "ru-RU" ? "ru-RU" : "ru-MD"}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.nomargin}>{lang.thanks},</h1>
        <h2 className={styles.nomargin}>{lang.willContact}</h2>
      </main>
    </div>
  )
}

export default Home
