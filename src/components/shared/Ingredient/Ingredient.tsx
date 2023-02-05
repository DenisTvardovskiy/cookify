import React, { FC } from 'react';
import { IIngredient } from '../../../models';
import { ImageContainer } from '../../common/ImageContainer';

import useStyles from './styles';
import { useNavigate } from "react-router-dom";

interface IProps {
  item: IIngredient;
}
export const Ingredient: FC<IProps> = ({ item }: IProps): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.item} onClick={() => navigate(`ingredient/${item.id}`)}>
      <div className={classes.imageWrap}>
        <ImageContainer hoverAnimation>
          {item.imageLink ? (
            <img src={item.imageLink} alt={item.name} />
          ) : (
            <img src='images/placeholder.png' alt={item.name} />
          )}
        </ImageContainer>
      </div>

      <div className={classes.textContainer}>
        <h6>{item.name}</h6>

        {/*<div className={classes.infoBlock}>*/}
        {/*  <FavoriteBorderIcon className={classes.rateIcon} /> <p>{item.likesCount}</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
