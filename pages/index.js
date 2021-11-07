import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';

import coffeeStores from '../data/coffee-stores.json';

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('clicked on banner button');
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Find Cafes!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            alt="hero image"
            src="/static/hero-image.png"
            width={700}
            height={400}
          />
        </div>
        <div className={styles.sectionWrapper}>
          <div className={styles.cardLayout}>
            {coffeeStores.map((cafe) => {
              return (
                <Card
                  name={cafe.name}
                  key={cafe.name}
                  imgUrl={cafe.imgUrl}
                  href={`/coffee-store/${cafe.id}`}
                  className={styles.card}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
