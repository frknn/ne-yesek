import Head from 'next/head'
import Custom404Page from '../components/custom-404/Custom404Page'

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>NeYesek | 404</title>
        <meta name="description" content="Sayfa bulunamadı" />
      </Head>
      <Custom404Page />
    </>
  );
}

export default Custom404;