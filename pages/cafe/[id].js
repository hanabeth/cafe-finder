import { useRouter } from 'next/router';
import Link from 'next/Link';
import Image from 'next/image';
import Head from 'next/head';
import cls from 'classnames';
import { fetchCafes } from '../../lib/cafes';

import styles from '../../styles/cafe.module.css';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';

export async function getStaticProps({ params }) {
  const cafes = await fetchCafes();
  const findCafeById = cafes.find((cafe) => {
    return cafe.id.toString() === params.id;
  });
  return {
    props: {
      cafe: findCafeById ? findCafeById : {},
    },
  };
}

export async function getStaticPaths() {
  const cafes = await fetchCafes();
  const paths = cafes.map((cafe) => {
    return {
      params: {
        id: cafe.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const id = router.query.id;
  const [cafe, setCafe] = useState(initialProps.cafe);
  const {
    state: { cafes },
  } = useContext(StoreContext);

  const handleCreateCafe = async (cafe) => {
    try {
      const { id, name, voting, imgUrl, neighborhood, address } = cafe;
      const response = await fetch('/api/createCafe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgUrl,
          neighborhood: neighborhood || '',
          address: address || '',
        }),
      });

      const dbCafe = await response.json();
      console.log({ dbCafe });
    } catch (error) {
      console.log('Error creating cafe ', error);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.cafe)) {
      if (cafes.length > 0) {
        const cafeFromContext = cafes.find((cafe) => {
          return cafe.id.toString() === id;
        });
        if (cafeFromContext) {
          setCafe(cafeFromContext);
          handleCreateCafe(cafeFromContext);
        }
      }
    } else {
      //Statically generated route - create cafe from static props
      handleCreateCafe(initialProps.cafe);
    }
  }, [id, initialProps, initialProps.cafe]);

  const { name, address, neighborhood, imgUrl } = cafe;

  const [votingCount, setVotingCount] = useState(1);

  const handleUpvoteButton = () => {
    setVotingCount(votingCount + 1);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              alt="places icon"
              width="24"
              height="24"
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt="near me icon"
                width="24"
                height="24"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              alt="star icon"
              width="24"
              height="24"
            />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Upvote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
