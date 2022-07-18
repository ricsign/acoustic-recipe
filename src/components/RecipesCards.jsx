import React from 'react';
import {Grid, Typography, Grow} from '@mui/material';

import RecipesCard from './RecipesCard';
import styles from '../styles/RecipesCards.module.css'

export default function RecipesCards({ recipes }) {
    return (
        <Grow in>
            <Grid className={styles.container} container alignItems="stretch" spacing={2}>
                {recipes?.hits?.map((recipe, i) => ( 
                    <Grid item xs={3} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                        <RecipesCard key={i} recipe={recipe} i={i} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    );
}