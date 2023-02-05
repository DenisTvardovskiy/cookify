import React, { FC, useReducer } from 'react';
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Container, Footer, GridContainer, ImageContainer, Navigation } from '../../components';
import useStyles from './styles';
import { Link } from 'react-router-dom';

interface IProps {}

const mock = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  createdAt: '2023-02-05T15:23:31.736Z',
  title: 'Something tasty',
  ukrainianTitle: 'string',
  instruction: ' 123',
  ukrainianInstruction:
    "'\\n' +\n" +
    "    '\\n' +\n" +
    "    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at vulputate ex. Phasellus non sollicitudin eros. Nullam porttitor erat eu hendrerit vehicula. Fusce sed feugiat justo. Nulla sit amet tincidunt neque. Pellentesque imperdiet, sem sed varius ultrices, nunc enim vehicula dolor, ac vulputate nibh quam quis magna. Etiam mollis magna auctor urna venenatis, vitae pharetra sapien luctus. Mauris interdum ex nec nunc venenatis efficitur. Nulla sed pellentesque est.\\n' +\n" +
    "    '\\n' +\n" +
    "    'In volutpat porta nisl ut pulvinar. Cras convallis dolor turpis. Ut vel malesuada erat, in finibus est. Vestibulum commodo metus ultrices mattis malesuada. Praesent vel erat et ex suscipit sagittis vel non lacus. Donec quis arcu facilisis, dignissim tellus sed, viverra lacus. Donec semper leo id libero viverra, eu suscipit purus ornare. Nunc nec arcu elementum risus elementum facilisis. Donec eget consequat enim, vel eleifend eros. Cras vulputate dolor eget convallis faucibus. Quisque dui urna, ultrices ac quam in, pharetra ultrices nunc. Nulla tempus lorem eu nunc ornare fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat pretium consectetur. Curabitur id pellentesque massa.\\n' +\n" +
    "    '\\n' +\n" +
    "    'Aenean scelerisque bibendum rhoncus. Proin nec condimentum turpis. Curabitur consectetur nulla vitae posuere sodales. In eget ornare neque. Praesent scelerisque rhoncus dapibus. Nullam sollicitudin lectus nunc, sed malesuada mauris ultrices nec. Duis magna purus, iaculis nec augue non, condimentum faucibus nulla. Nulla placerat diam ut sapien lacinia sollicitudin. Etiam luctus at sem sit amet dignissim.\\n' +\n" +
    "    '\\n' +\n" +
    "    'Sed varius lobortis magna, eget condimentum enim cursus ac. Cras vel tortor eu velit ultrices luctus nec sit amet tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum feugiat, ante in venenatis commodo, lectus tortor viverra arcu, non mattis velit velit in ligula. Quisque mollis orci lectus, vitae molestie ante commodo a. Nulla at tellus et purus feugiat feugiat. In bibendum tempor ipsum. In porttitor aliquam orci, ac aliquam arcu tempor ut. Ut a diam hendrerit, vehicula turpis quis, condimentum ex.\\n' +\n" +
    "    '\\n' +\n" +
    "    'Morbi in quam facilisis, cursus magna vel, tristique ante. Duis scelerisque nec nisl quis efficitur. In malesuada elit eu elementum facilisis. Nam sit amet tellus vel velit finibus finibus. Sed ullamcorper erat a magna ullamcorper, id efficitur sem tempor. Nunc condimentum elementum risus consequat consectetur. Maecenas auctor purus sagittis libero luctus, et dictum metus auctor. Sed in facilisis arcu. Cras aliquam neque commodo, tempus augue eget, condimentum nulla. Maecenas sem purus, pulvinar vitae diam et, dignissim dictum mauris. Donec in justo eget purus pellentesque tristique. '",
  imageLink:
    'https://images.pexels.com/photos/1247677/pexels-photo-1247677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  likesCount: 0,
  category: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    ukrainianName: 'string',
    imageLink: 'string',
  },
  ingredients: [
    {
      ingredientId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'string',
      ukrainianName: 'string',
      imageLink: 'string',
      measure: 'string',
      ukrainianMeasure: 'string',
    },
    {
      ingredientId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'string',
      ukrainianName: 'string',
      imageLink: 'string',
      measure: 'string',
      ukrainianMeasure: 'string',
    },
    {
      ingredientId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'string',
      ukrainianName: 'string',
      imageLink: 'string',
      measure: 'string',
      ukrainianMeasure: 'string',
    },
  ],
};

export const Recipe: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  // const [likes, setLikes] = useReducer()

  const userLiked = false;

  const date = new Date(mock.createdAt);
  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.recipeWrap}>
          <div>
            <h2>{mock.title}</h2>
            <p>Опубліковано {date.toDateString()}</p>
          </div>
          <p>Категорія: {mock.category.name}</p>
          <Button variant='outlined' onClick={() => console.log('LIKE!')}>
            {userLiked ? <FavoriteIcon className={classes.like} /> : <FavoriteBorderIcon />}{' '}
            {mock.likesCount}
          </Button>

          {mock.imageLink && (
            <div className={classes.imageWrap}>
              <ImageContainer>
                <img src={mock.imageLink} alt={mock.title} />
              </ImageContainer>
            </div>
          )}
          <h5>Інгредієнти</h5>

          <div className={classes.ingredientsList}>
            {mock.ingredients.map((item) => (
              <Link to='123' key={item.imageLink}>
                {item.name}
              </Link>
            ))}
          </div>

          <p>{mock.ukrainianInstruction}</p>
        </div>
      </Container>
      <Container>
        <GridContainer>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
        </GridContainer>
      </Container>

      <Footer />
    </>
  );
};
