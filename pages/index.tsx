import Head from 'next/head';
import FuturisticChat from '../components/FuturisticChat';

export default function Home() {
  return (
    <>
      <Head>
        <title>Futuristic Chat</title>
        <meta name="description" content="Futuristic Chat UI with Map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FuturisticChat />
    </>
  );
}
