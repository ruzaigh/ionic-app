import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] =[
    {
     id: 'r1',
     title: 'Butter Chicken',
     imageUrl: 'https://gimmedelicious.com/wp-content/uploads/2020/01/30-Minute-Instant-Pot-Butter-Chicken-7.jpg',
     ingredients: ['Chicken fillets', 'Rice', 'Amina spice', 'Onion ']
    },
    {
     id: 'r2',
     title: 'Chicken Pasta',
     imageUrl: 'https://www.budgetbytes.com/wp-content/uploads/2018/10/One-Pot-Creamy-Cajun-Chicken-Pasta-V1.jpg',
     ingredients: ['Chicken fillets', 'Pasta', 'Green peper']
    },
   ];

  constructor() { }

  getAllRecipes(){
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {...this.recipes.find(recipe => recipe.id === recipeId)};
  }

  deleteRecipe(recipeId: string){
    return this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
  }
}
