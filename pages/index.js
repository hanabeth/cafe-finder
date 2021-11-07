import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';

import cafeData from '../data/cafes.json';

export async function getStaticProps(context) {
  //const data = fetch(cafes);
  console.log('in getStaticProps');
  return {
    props: {
      cafes: cafeData,
    },
  };
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => {};
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
          {props.cafes.length > 0 && (
            <>
              <h2 className={styles.heading2}>Coffee Shops</h2>
              <div className={styles.cardLayout}>
                {props.cafes.map((cafe) => {
                  return (
                    <Card
                      name={cafe.name}
                      key={cafe.id}
                      imgUrl={cafe.imgUrl}
                      href={`/cafe/${cafe.id}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
