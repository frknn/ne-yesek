import Head from 'next/head';
import Header from '../components/header/Header'
import SignupForm from '../components/signup-login/SignupForm'

const Signup = () => {
  return (
    <>
      <Head>
        <title>NeYesek | Hesap Oluştur</title>
        <meta name="description" content="NeYesek hesabı oluştur" />
      </Head>
      <Header />
      <SignupForm />
    </>
  );
}

export default Signup;