import React, { FC } from 'react';
import { IIngredient } from '../../models';

import useStyles from './styles';

interface IProps {
  item: IIngredient;
}
export const Ingredient: FC<IProps> = ({ item }: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <div className={classes.imageWrap}>
        {/*<ImageContainer hoverAnimation>*/}
        {/*  {item.imageLink ? (*/}
        {/*    <img src={item.imageLink} alt={item.title} />*/}
        {/*  ) : (*/}
        {/*    <img src='images/placeholder.png' alt={item.title} />*/}
        {/*  )}*/}
        {/*</ImageContainer>*/}
      </div>

      <div className={classes.textContainer}>
        {/*<h6>{item.title}</h6>*/}
        {/*<div className={classes.categoryList}>*/}
        {/*  <span className={classes.categoryListItem}>{item.category.name}</span>*/}
        {/*</div>*/}

        {/*{item.time && (*/}
        {/*  <div className={classes.infoBlock}>*/}
        {/*    <Timelapse className={classes.timeIcon} /> <p>{item.time}</p>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/*<div className={classes.infoBlock}>*/}
        {/*  <FavoriteBorderIcon className={classes.rateIcon} /> <p>{item.likesCount}</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
