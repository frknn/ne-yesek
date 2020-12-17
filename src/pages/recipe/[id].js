import Recipe from "../../components/recipe-page/Recipe";
import Header from '../../components/header/Header'
import axios from "axios";

const recipe = ({ data }) => {

  console.log('DYNAMIC ROUTE DATE: ', data)


  return (
    <>
      <Header />
      <Recipe recipe={data.data}/>
    </>
  );
}

export async function getServerSideProps(context) {

  const URL = `http://localhost:5000/api/v1/recipes/${context.params.id}`

  const data = await axios.get(URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  console.log('DATA IN GSSP', data.data)

  return {
    props: { data: data.data }
  }
}

export default recipe;