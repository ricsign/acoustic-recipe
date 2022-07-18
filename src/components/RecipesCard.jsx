import React from "react";
import {
  Card,
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
    url,
  } = recipe.recipe;


  return (
    <Card>
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

        <Typography variant="body1" color="text.primary">
          Basic Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cuisine Type: {capitalizeFirstLetter(cuisineType[0])}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dish Type: {dishType ? capitalizeFirstLetter(dishType[0]) : "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Diet Labels: {dietLabels.length === 0 ? "No Diet Label" : dietLabels.toString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Health Labels: {healthLabels.length === 0 ? "No Health Label" : healthLabels.toString()}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Cautions: {cautions.length === 0 ? "No Cautions" : cautions.toString()}
        </Typography>

        <Typography variant="body1" color="text.primary">
          Ingredients
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {ingredientLines.toString().substr(0,500)+"..."}
        </Typography>

        <Typography variant="body1" color="text.primary">
          Nutrients Facts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Calories: {Math.round(calories)} kcal
        </Typography>
        {
          digest.map((nutrient, i) => (
            <Typography key={i} variant="body2" color="text.secondary">
              {nutrient.label}: {nutrient.total.toPrecision(3)} {nutrient.unit}
            </Typography>
          ))
        }

        <br />
  
        <Typography variant="h5" color="text.primary">
          {i+1}
        </Typography>
        <br />

        <Button variant="outlined" size="large" href={url}>Instructions</Button>
      </CardContent>
        
    </Card>
  );
}
