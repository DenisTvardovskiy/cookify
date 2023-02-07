import React, { FC } from 'react';
import useStyles from './styles';
import { IIngredient } from '../../../models';
import { EmptyListMessage } from '../../shared/EmptyListMessage';
import { Ingredient } from '../../shared/Ingredient';

interface IProps {
  items: IIngredient[];
  withAdd?: boolean;
}

export const IngredientsGrid: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  console.log(props.items);
  return (
    <>
      {Boolean(props.items.length) ? (
        <div className={classes.gridContainer}>
          {props.items.map((item, index) => (
            <Ingredient key={index} item={item} withAdd={props.withAdd} />
          ))}
        </div>
      ) : (
        <EmptyListMessage />
      )}
    </>
  );
};
