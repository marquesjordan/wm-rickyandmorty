import { ShowProvider } from '@/contexts/ShowContext';
import type { AppProps } from 'next/app';
import '../app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShowProvider>
      <div style={{ textAlign: 'center' }}>Rick and Morty Characters</div>
      <Component {...pageProps} />
    </ShowProvider>
  );
}
