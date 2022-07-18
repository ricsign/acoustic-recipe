import React from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import { capitalizeFirstLetter } from "../commonFunctions";

export default function RecipesCard({ recipe, i }) {
  if (!recipe) return;
  const {
    label,
    calories,
    cautions,
    cuisineType,
    dietLabels,
    digest,
    dishType,
    healthLabels,
    image,
    ingredientLines,
    // url,
  } = recipe.recipe;


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image || "https://media.self.com/photos/61e9dae8808d098c8ccc3b58/1:1/w_768,c_limit/15-Bean-Soup-Vegetarian.jpg"}
          alt="Food Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>

          <Typography gutterBottom variant="body2" color="text.secondary">
            Cuisine Type: {capitalizeFirstLetter(cuisineType[0])}
          </Typography>

          <Typography gutterBottom variant="body2" color="text.secondary">
            Dish Type: {capitalizeFirstLetter(dishType[0])}
          </Typography>

          {dietLabels.length !== 0 && 
          <Typography gutterBottom variant="body2" color="text.secondary">
            Diet Labels: {dietLabels.toString()}
          </Typography>}
          
          <Typography variant="h5" color="text.primary">
            {i+1}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}
