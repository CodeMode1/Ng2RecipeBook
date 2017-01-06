import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';

//avoir tous les operateurs de reactive js
import 'rxjs/RX';

//central data storage: interact, fetch, (data) store to the internet
@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.ernasgourmet.com/assets/images/wienerschnitzel.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [
      new Ingredient('Salad', 5),
      new Ingredient('Tomatoes', 3)
    ])
  ];

  constructor(private http: Http){
  }

  getRecipes(){
    return this.recipes;
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    /*
    if(recipe.ingredients.length === 0){
      alert('Avoir au moins un ingrédient à une recette');
    }
    */
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    /*
    if(newRecipe.ingredients.length === 0){
      alert('Avoir au moins un ingrédient à une recette');
    }
    */
  }

  //sotring Data to firebase
  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //recipes.json , name si up to you : like an object to store your data
    // put request tells firebase to overwrite the old data, so if this data already exists, dont replicate it but replace it
    return this.http.put('https://recipe-book-19d08.firebaseio.com/recipes.json', body, {headers: headers});
  }

  //get data from firebase
  fetchData(){
    return this.http.get('https://recipe-book-19d08.firebaseio.com/recipes.json')
      .map((response: Response) => <Recipe[]>response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
