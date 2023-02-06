import { createUseStyles } from "react-jss";
import { theme } from "../../theme";

export default createUseStyles(() => ({
  recipeWrap: {
    display: "flex",
    textAlign: "center",
    gap: theme.padding.small,
    flexDirection: "column",
    alignItems: "center",
    minHeight: `calc(100vh - ${theme.navigationHeight}px)`,
    padding: [ theme.padding.large, theme.padding.xxLarge ],
  },

  imageWrap: {
    width: "100%",
    height: 500,
    position: "relative",
  },

  like: {
    color: theme.colors.red.main,
  },

  ingredientsList: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.margin.default,

  },
  ingredientsLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'start',
    width: 'auto',
    textTransform: "capitalize",
    "& >  img ": {
      width: 32,
      height: 32,
      marginRight: 5,
    },
  },

  description: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    alignItems: "center",
    gap: theme.margin.default,
  },
  mainInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  steps: {
    textAlign: "start",
  },
}));
