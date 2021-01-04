import Head from 'next/head';
import Search from '../components/search/Search'

const search = () => {
  return (
    <>
      <Head>
        <title>NeYesek | Tarif Ara</title>
        <meta name="description" content="Yemek Tarifleri Ara" />
        <meta name="keywords" content="yemek, tarif, yemek tarifleri, yemek tarifi ara" />
      </Head>
      <Search />
    </>
  );
}

export default search;