import React, { FC } from 'react';
import StarIcon from '@mui/icons-material/Star';

import { IRecipe } from '../../../models';
import useStyles from './styles';
import { ImageContainer } from '../../common/ImageContainer';
import { useNavigate } from 'react-router-dom';

interface IProps {
  item: IRecipe;
}

export const Recipe: FC<IProps> = ({ item }: IProps): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.item} onClick={() => navigate(`/recipe/${item.id}`)}>
      <div className={classes.imageWrap}>
        <ImageContainer hoverAnimation>
          {item.imageLink ? (
            <img src={item.imageLink} alt={item.ukrainianTitle} />
          ) : (
            <img src='images/placeholder.png' alt={item.ukrainianTitle} />
          )}
        </ImageContainer>
      </div>

      <div className={classes.textContainer}>
        <h6>{item.ukrainianTitle}</h6>
        <div className={classes.categoryList}>
          <span className={classes.categoryListItem}>{item.category.ukrainianName}</span>
        </div>

        {/*{item.time && (*/}
        {/*  <div className={classes.infoBlock}>*/}
        {/*    <Timelapse className={classes.timeIcon} /> <p>{item.time}</p>*/}
        {/*  </div>*/}
        {/*)}*/}

        <div className={classes.infoBlock}>
          <StarIcon className={classes.rateIcon} /> <p>{item.likesCount}</p>
        </div>
      </div>
    </div>
  );
};
