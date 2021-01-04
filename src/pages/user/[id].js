import axios from "axios";
import Header from "../../components/header/Header";
import User from "../../components/user-page/User";

const user = ({ user }) => {
  return (
    <>
      <Header />
      <User user={user} />
    </>
  );
}

export async function getServerSideProps(context) {
  const URL = `http://localhost:5000/api/v1/users/${context.params.id}`
  const res = await axios.get(URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return {
    props: { 
      user: res.data.data,
    }
  }
}

export default user;