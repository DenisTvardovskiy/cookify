import React, { FC } from 'react'
import Timelapse from '@mui/icons-material/Timelapse'
import Star from '@mui/icons-material/Star'

import useStyles from './styles'
import { Container } from '../Container'

interface IProps {}

const mock = [
  {
    name: 'Ramen',
    imageLink:
      'https://kitchenette.cz/uploads/media/article_image/0001/04/thumb_3951_article_image_gridOne.jpeg',
    categoryList: ['Soup', 'Anime', 'Naruto', 'Japan'],
    time: '2h',
    rating: 4.5,
  },
  {
    name: 'Ramen1',
    imageLink:
      'https://peasandcrayons.com/wp-content/uploads/2021/05/veggie-ramen-soup-recipe-4.jpg',
    categoryList: ['Soup', 'Anime', 'Naruto', 'Japan'],
    time: null,
    rating: 4.5,
  },
]

export const RecipesList: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <Container>
      <div className={classes.itemList}>
        {mock.map((item) => (
          <div className={classes.item}>
            <div className={classes.imageContainer}>
              {item.imageLink ? (
                <img src={item.imageLink} alt={item.name} />
              ) : (
                <img src='images/placeholder.png' alt={item.name} />
              )}
            </div>

            <div className={classes.textContainer}>
              <h5>{item.name}</h5>
              <div className={classes.categoryList}>
                {item.categoryList.map((category: String) => (
                  <span className={classes.categoryListItem}>{category}</span>
                ))}
              </div>

              {item.time && (
                <div className={classes.infoBlock}>
                  <Timelapse className={classes.timeIcon} /> <p>{item.time}</p>
                </div>
              )}

              <div className={classes.infoBlock}>
                <Star className={classes.rateIcon} /> <p>{item.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
