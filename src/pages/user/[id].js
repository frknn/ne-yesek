import Head from 'next/head';
import Header from "../../components/header/Header";
import User from "../../components/user-page/User";
import { getUserById } from '../../services/userService'

const user = ({ user }) => {
  return (
    <>
      <Head>
        <title>NeYesek | {user.name + ' ' + user.lastName}</title>
        <meta name="description" content={user.name + ' ' + user.lastName + ' profili'} />
        <meta name="keywords" content="yemek, tarif, yemek tarifleri" />
      </Head>
      <Header />
      <User user={user} />
    </>
  );
}

export async function getServerSideProps(context) {

  const data = await getUserById(context.params.id)
  return {
    props: {
      user: data.data,
    }
  }
}

export default user;