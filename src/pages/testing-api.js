import axios from 'axios'

const testingApi = ({data}) => {
  return (
    <div>
      {data}
    </div>
  );
}


export const getServerSideProps = async (ctx) => {

  const res = await axios.get('http://ne-yesek-api.herokuapp.com/')
  return {
    props:{
      data:res.data
    }
  }
}

export default testingApi;