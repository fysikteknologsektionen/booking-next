import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.VFC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-light">
      <nav className="navbar navbar-light container">
        <Link href="/" passHref>
          <a className="navbar-brand">
            <Image
              src="/ftek.svg"
              alt="Fysikteknologsektionen"
              layout="fixed"
              width={50}
              height={50}
            />
          </a>
        </Link>
        {session ? (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => signOut()}
          >
            Logga ut
          </button>
        ) : (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => signIn('google')}
          >
            Logga in
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
