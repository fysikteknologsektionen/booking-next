import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.VFC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-light mb-3">
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
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle sidebar"
          >
            <span className="navbar-toggler-icon" />
          </button>
        ) : (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => (process.env.NODE_ENV !== 'production'
              ? signIn()
              : signIn('google'))}
          >
            Log in
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
