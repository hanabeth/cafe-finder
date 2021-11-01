import { useRouter } from 'next/router';
import Link from 'next/Link';

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      <div>Coffee Store Page {router.query.id}</div>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
