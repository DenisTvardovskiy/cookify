import React, { FC } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { ImageContainer } from "../ImageContainer";
import { Container } from "../Container";
import useStyles from "./styles";
import { IRecipe } from "../../models";

interface IProps {
  items: IRecipe[];
}

export const RecipesList: FC<IProps> = ({ items }: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.itemList}>
        {items.map((item) => (
          <div key={item.id} className={classes.item}>
            <div className={classes.imageWrap}>
              <ImageContainer hoverAnimation>
                {item.imageLink ? (
                  <img src={item.imageLink} alt={item.title} />
                ) : (
                  <img src="images/placeholder.png" alt={item.title} />
                )}
              </ImageContainer>
            </div>

            <div className={classes.textContainer}>
              <h5>{item.title}</h5>
              <div className={classes.categoryList}>
                <span className={classes.categoryListItem}>{item.category.name}</span>
              </div>

              {/*{item.time && (*/}
              {/*  <div className={classes.infoBlock}>*/}
              {/*    <Timelapse className={classes.timeIcon} /> <p>{item.time}</p>*/}
              {/*  </div>*/}
              {/*)}*/}

              <div className={classes.infoBlock}>
                <FavoriteBorderIcon className={classes.rateIcon} /> <p>{item.likesCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
