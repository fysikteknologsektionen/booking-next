import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="container">
      <pre>
        {
          session ? JSON.stringify(session, null, 2) : 'Not logged in.'
        }
      </pre>
    </main>
  );
};

export default Home;
