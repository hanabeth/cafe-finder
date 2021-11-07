import { useRouter } from 'next/router';
import Link from 'next/Link';
import Head from 'next/head';

import cafeData from '../../data/coffee-stores.json';

export function getStaticProps({ params }) {
  console.log('params in cafe props is  - ', params);
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

  const { address, name, neighborhood } = props.cafe;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighborhood}</p>
    </div>
  );
};

export default CoffeeStore;
