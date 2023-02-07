import React, { FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { IRecipe } from "../../../models";
import useStyles from "./styles";
import { ImageContainer } from "../../common/ImageContainer";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../models/user.";

interface IProps {
  item: IRecipe;
  user?: IUser;
  onLike?: (id: string) => void;
  onUnLike?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onUnFavorite?: (id: string) => void;
}

export const Recipe: FC<IProps> = ({ item, onLike, onUnLike, onFavorite, onUnFavorite, user }: IProps): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.item} onClick={() => navigate(`/recipe/${item.id}`)}>
      <div className={classes.imageWrap}>
        <ImageContainer hoverAnimation>
          {item.imageLink ? (
            <img src={item.imageLink} alt={item.ukrainianTitle} />
          ) : (
            <img src="images/placeholder.png" alt={item.ukrainianTitle} />
          )}
        </ImageContainer>
      </div>

      <div className={classes.textContainer}>
        <h6>{item.ukrainianTitle}</h6>
        <div className={classes.categoryList}>
          <span className={classes.categoryListItem}>{item.category.ukrainianName}</span>
        </div>

      </div>
      {user && <div className={classes.actions}>
        {onUnLike && onLike && <div className={classes.infoBlock}>
          {(user.likedRecipes.filter((recipe) => recipe.id === item.id)).length > 0
            ? <FavoriteIcon
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onUnLike(item.id);
              }}
            />
            : <FavoriteBorderIcon
              onClick={(event: any) => {
                event.stopPropagation();
                event.preventDefault();
                onLike(item.id);
              }}
            />
          }
          <p>{item.likesCount}</p>
        </div>}
        {onUnFavorite && onFavorite && <div className={classes.infoBlock}>
          {(user.favoriteRecipes.filter((recipe) => recipe.id === item.id)).length > 0
            ? <StarIcon
              onClick={(event: any) => {
                event.stopPropagation();
                event.preventDefault();
                onUnFavorite(item.id);
              }}
            />
            : <StarOutlineIcon
              onClick={(event: any) => {
                event.stopPropagation();
                event.preventDefault();
                onFavorite(item.id);
              }}
            />
          }
        </div>}
      </div>}
    </div>
  );
};
