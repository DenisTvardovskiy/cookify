import React, { FC, useState } from 'react';
import { IIngredient } from '../../../models';
import { ImageContainer } from '../../common/ImageContainer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useApi, useAuthorization } from '../../../hooks';

interface IProps {
  item: IIngredient;
  measure?: string;
  withAdd?: boolean;
}

export const Ingredient: FC<IProps> = ({ item, measure, withAdd }: IProps): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const api = useApi();

  const [addedIngredient, setAddedIngredient] = useState(false);

  const addIngredient = () => {
    setAddedIngredient(true);

    api.ingredients
      .add({ ingredientId: item.id || item.ingredientId, loader: 'Додавання інгрідієнта' })
      .then();
  };

  return (
    <div className={classes.item}>
      <div onClick={() => navigate(`/ingredient/${item.id}`)}>
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
      {withAdd &&
        (!addedIngredient ? (
          <Button variant='outlined' onClick={() => addIngredient()}>
            <AddCircleOutlineIcon />
          </Button>
        ) : (
          <Button variant='outlined' disabled>
            <CheckCircleIcon />
          </Button>
        ))}
    </div>
  );
};
