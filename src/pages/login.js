import Head from 'next/head'
import Header from '../components/header/Header'
import LoginForm from '../components/signup-login/LoginForm'

const Login = () => {
  return (
    <>
      <Head>
        <title>NeYesek | Giriş</title>
        <meta name="description" content="NeYesek'e giriş yap" />
      </Head>
      <Header />
      <LoginForm />
    </>
  );
}

export default Login;