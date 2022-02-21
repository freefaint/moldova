import type { NextPage } from 'next';
import Head from 'next/head';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';

import ru from '../lang/ru-RU.json';
import md from '../lang/ru-MD.json';

import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { locale } = useRouter();

  const lang: any = locale === "ru-RU" ? ru : md;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        setUsers(data.users);
      })
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{lang.lozung}</title>
        <meta name="viewport" content="width=500, initial-scale=0.5"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {users.map((i: any, j) => (
          <React.Fragment key={j}>
            <h1 className={styles.nomargin}>{i.name},</h1>
            <h2 className={styles.nomargin}>{i.phone}</h2>
            <h3 className={styles.nomargin}>{i.address}</h3>
            <br />
            <br />
          </React.Fragment>
        ))}
      </main>
    </div>
  )
}

export default Home
