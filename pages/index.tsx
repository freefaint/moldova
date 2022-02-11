import type { NextPage } from 'next';
import Head from 'next/head';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';

import ru from '../lang/ru-RU.json';
import md from '../lang/ru-MD.json';

import styles from '../styles/Home.module.css';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  const locale = router.locale;

  const lang: any = locale === "ru-RU" ? ru : md;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = useCallback(e => {
    e.preventDefault();

    fetch("/api/hello", { method: "POST", body: JSON.stringify({ name, phone, address }) }).then(() => {
      router.push('/thanks');
    })
  }, [ name, phone, address ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{lang.lozung}</title>
        <meta name="description" content={lang.lozung} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.lang}>
          <Link href="/" locale={locale === "ru-RU" ? "ru-MD" : "ru-RU"}>
            <a>
              {locale === "ru-RU" ? <strong>RU</strong> : "RU"}/{locale === "ru-MD" ? <strong>MD</strong> : "MD"}
            </a>
          </Link>
        </div>

        <div className={styles.string}>
          <div className={cn(styles.lozung)}>{lang.lozung}</div>
          <div className={cn(styles.lozung, styles.yellow)}>{lang.lozung}</div>
          <div className={cn(styles.lozung)}>{lang.lozung}</div>
          <div className={cn(styles.lozung, styles.yellow)}>{lang.lozung}</div>
          <div className={cn(styles.lozung)}>{lang.lozung}</div>
          <div className={cn(styles.lozung, styles.yellow)}>{lang.lozung}</div>
        </div>

        <div className={styles.banner} />
      </header>

      <main className={styles.main}>
        <h1>{lang.title1}</h1>
        <p>{lang.text11}</p>
        <p>{lang.text12}</p>
        <h1 className={styles.marked}>{lang.title2}</h1>
        <p><strong>{lang.text211} <span className={styles.red}>{lang.text212}</span> {lang.text213}</strong></p>
        <p>{lang.text22}</p>
        <h2>{lang.subtitle21}</h2>
        <p>{lang.text23}</p>
        <h2 className={styles.red}>{lang.subtitle22}</h2>
        <p>{lang.text24} {lang.text241}</p>
        <p>{lang.text25}</p>
        <p>{lang.text26}</p>

        <div className={styles.ol}>
          <div className={styles.li}>
            <div className={cn(styles.num, styles.red)}>1</div>

            <div>{lang.ol1}</div>
          </div>

          <div className={styles.li}>
            <div className={cn(styles.num, styles.red)}>2</div>

            <div>{lang.ol2}</div>
          </div>
        </div>

        <h2 className={styles.center} style={{ margin: "4rem 2rem"}}>{lang.desc}</h2>
      </main>

      <footer className={styles.footer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <h1 className={cn(styles.white, styles.nomargin)}>{lang.register}</h1>
            <h2  className={cn(styles.white, styles.nomargin)}>{lang.help}</h2>
            <br />
            <br />
            <br />
            <br />
            <input placeholder={lang.fio} value={name} onChange={e => setName(e.currentTarget.value)} />
            <input placeholder={lang.phone} value={phone} onChange={e => setPhone(e.currentTarget.value)} />
            <input placeholder={lang.address} value={address} onChange={e => setAddress(e.currentTarget.value)} />
            
            <button type="submit" disabled={!name || !phone}>{lang.send}</button>
          </div>
        </form>
      </footer>
    </div>
  );
}

export default Home
