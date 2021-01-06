import Head from 'next/head';
import Filter from '../components/filter/Filter'

const filter = () => {
  return (
    <>
      <Head>
        <title>Ne Yesek | Filtrele</title>
        <meta name="description" content="Yemek tariflerini istediğiniz malzemelere, kategoriye, hazırlanma ve pişme süresine göre filtreleyin."/>
      </Head>
      <Filter />
    </>
  );
}

export default filter;