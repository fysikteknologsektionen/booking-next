import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header: React.VFC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-light">
      <nav className="navbar navbar-light container">
        <a
          href="https://ftek.se"
          target="_blank"
          rel="noreferrer"
          className="navbar-brand"
        >
          <Image
            src="/ftek.svg"
            alt="Fysikteknologsektionen"
            layout="fixed"
            width={48}
            height={48}
          />
        </a>
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
