import { useRouter } from 'next/router';
import Link from 'next/Link';
import Image from 'next/image';
import Head from 'next/head';
import cls from 'classnames';

import cafeData from '../../data/cafes.json';

import styles from '../../styles/cafe.module.css';

export function getStaticProps({ params }) {
  return {
    props: {
      cafe: cafeData.find((cafe) => {
        return cafe.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = cafeData.map((cafe) => {
    return {
      params: {
        id: cafe.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighborhood, imgUrl } = props.cafe;

  const handleUpvoteButton = () => {
    console.log('handle upvote');
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
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            <p className={styles.text}>{neighborhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>1</p>
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
