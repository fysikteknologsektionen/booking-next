import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Header from '@components/Header';
import { useEffect } from 'react';
import Sidebar from '@components/Sidebar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <SessionProvider session={session}>
      <Header />
      <Sidebar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
