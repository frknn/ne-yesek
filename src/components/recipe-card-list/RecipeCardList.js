import { Wrap } from '@chakra-ui/react'
import RecipeCard from '../recipe-card/RecipeCard'

const RecipeCardList = (props) => {

  const { mx, my, w, spacing, cardWidth, recipes, onProfile, onOwnProfile } = props

  return (
    <Wrap
      justify="center"
      align="flex-start"
      mx={mx || "auto"}
      my={my || 24}
      w={w || ["100%", "80%"]}
      spacing={spacing || 0}
    >
      {
        recipes.map(
          recipe => <RecipeCard
            key={recipe.title}
            w={cardWidth}
            recipe={recipe}
            onProfile={onProfile}
            onOwnProfile={onOwnProfile}
          />
        )
      }
    </Wrap>
  );
}

export default RecipeCardList;