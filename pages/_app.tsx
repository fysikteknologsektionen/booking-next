import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Header from 'components/Header';
import { useEffect } from 'react';
import Sidebar from 'components/Sidebar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    // Since we directly import the js bootstrap library no types will exist,
    // so expect to get an error when compiling ts
    // @ts-expect-error
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);
  return (
    <SessionProvider session={session}>
      <Header />
      <Sidebar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
