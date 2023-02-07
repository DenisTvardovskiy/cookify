import React, { FC } from 'react';
import { IIngredient } from '../../../models';
import { ImageContainer } from '../../common/ImageContainer';

import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

interface IProps {
  item: IIngredient;
  measure?: string;
}

export const Ingredient: FC<IProps> = ({ item, measure }: IProps): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.item} onClick={() => navigate(`/ingredient/${item.id}`)}>
      <div className={classes.imageWrap}>
        <ImageContainer hoverAnimation>
          {item.imageLink ? (
            <img src={item.imageLink} alt={item.ukrainianName} />
          ) : (
            <img src='images/placeholder.png' alt={item.ukrainianName} />
          )}
        </ImageContainer>
      </div>

      <div className={classes.textContainer}>
        <h6>{item.ukrainianName}</h6>

        {measure && (
          <div className={classes.infoBlock}>
            <p>{measure}</p>
          </div>
        )}
      </div>
    </div>
  );
};
