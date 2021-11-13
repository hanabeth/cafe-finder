import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import { fetchCafes } from '../lib/cafes';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

export async function getStaticProps(context) {
  const cafes = await fetchCafes();
  return {
    props: {
      cafes,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, loadingLocation } =
    useTrackLocation();
  // const [cafes, setCafes] = useState('');
  const [error, setError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);
  const { cafes, latLong } = state;

  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          const fetchedCafes = await fetchCafes(latLong, 30);
          console.log({ fetchedCafes });
          // setCafes(fetchedCafes);
          dispatch({
            type: ACTION_TYPES.SET_CAFES,
            payload: {
              cafes: fetchedCafes,
            },
          });
        } catch (error) {
          console.log({ error });
          setError(error.message);
        }
      }
    }
    fetchData();
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Find Cafes!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={
            loadingLocation ? 'Finding location...' : 'View stores nearby'
          }
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {error && <p>Something went wrong: {error}</p>}
        <div className={styles.heroImage}>
          <Image
            alt="hero image"
            src="/static/hero-image.png"
            width={700}
            height={400}
          />
        </div>
        <div className={styles.sectionWrapper}>
          {cafes.length > 0 && (
            <>
              <h2 className={styles.heading2}>Cafes Near You</h2>
              <div className={styles.cardLayout}>
                {cafes.map((cafe) => {
                  return (
                    <Card
                      name={cafe.name}
                      key={cafe.id}
                      imgUrl={
                        cafe.imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
                      href={`/cafe/${cafe.id}`}
                    />
                  );
                })}
              </div>
            </>
          )}
          {props.cafes.length > 0 && (
            <>
              <h2 className={styles.heading2}>Denver Coffee Shops</h2>
              <div className={styles.cardLayout}>
                {props.cafes.map((cafe) => {
                  return (
                    <Card
                      name={cafe.name}
                      key={cafe.id}
                      imgUrl={
                        cafe.imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
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
