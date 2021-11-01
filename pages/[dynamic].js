import { useRouter } from 'next/router';
import Head from 'next/head';
const DynamicRoute = () => {
  const router = useRouter();
  const query = router.query.dynamic;
  console.log('query is - ', query);
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
    </div>
  );
};

export default DynamicRoute;
