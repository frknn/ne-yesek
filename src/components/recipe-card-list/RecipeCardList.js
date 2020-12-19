import { Wrap } from '@chakra-ui/react'
import RecipeCard from '../recipe-card/RecipeCard'

const RecipeCardList = (props) => {

  const { mx, my, w, spacing, cardWidth, recipes, onProfile } = props

  return (
    <Wrap
      justify="center"
      align="center"
      mx={mx || "auto"}
      my={my || 24}
      w={w || ["100%", "80%"]}
      spacing={spacing || 0}
    >
      {
        recipes.map(
          recipe => <RecipeCard key={recipe.title} w={cardWidth} recipe={recipe} onProfile={onProfile} />
        )
      }
    </Wrap>
  );
}

export default RecipeCardList;