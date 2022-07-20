import React from 'react';
import {Grid, Typography, Grow} from '@mui/material';

import RecipesCard from './RecipesCard';
import styles from '../styles/RecipesCards.module.css'


// Display those when there is no recipe available
const displayCards = [
    { color: '#251D3A', title: 'Random Recipes', text: 'Give me some random recipes' },
    { color: '#2A2550', title: 'Recipes by Ingredients', info: 'Chicken, Beef, Spinach, Mangoes, Shrimps, Lobsters, Rice...', text: 'Give me some shrimp recipes' },
    { color: '#E04D01', title: 'Recipes by Dish Names', info: 'Apple Pie, Jambalaya, Macaroni and Cheese, Cheeseburgers...', text: 'Show me the recipes for apple pie' },
    { color: '#FF7700', title: 'Random Things', info: 'News, Weather, Calculator, Directions, Greetings...', text: 'Tell me the latest news' },
  ];

export default function RecipesCards({ recipes }) {
    if(!recipes.hits){
        return (
            <Grow in>
                <Grid className={styles.container} container alignItems="stretch" spacing={4}>
                    {displayCards.map((card, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3} className={styles.displayCard}>
                            <div className={styles.card} style={{ backgroundColor: card.color }}>
                                <Typography variant="h5">{card.title}</Typography>
                                {card.info ? 
                                (<Typography variant="h6">
                                    <b>{card.title.split(' ')[2]}</b>
                                    <br />
                                    {card.info}
                                </Typography>) : null}
                                <Typography variant="h6">Try to Say: <br /><i>{card.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        );
    }

    return (
        <Grow in>
            <Grid className={styles.container} container alignItems="stretch" spacing={2}>
                {recipes.hits?.map((recipe, i) => ( 
                    <Grid key={i} item xs={12} md={6} lg={4}>
                        <RecipesCard recipe={recipe} i={i} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    );
}