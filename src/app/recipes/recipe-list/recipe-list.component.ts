import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  moduleId: module.id,
  selector: 'rb-recipe-list',
  templateUrl: 'recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  //@Output() recipeSelected = new EventEmitter<Recipe>();
  //recipe = new Recipe('Dummy', 'Dummy', 'http://ste.india.com/sites/default/files/2016/06/12/498000-donald-trump.jpg');

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    //on subscribe a l'eventemitter pour est notifier des changements dans le array de recette
    //comme ca pas besoin de cliquer sur un autre bouton pour voir la liste a jour se rafraichir
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }
  
  /* OLD SETUP WITH nested component -> recipe list and recipe detail nested in recipes component
  onSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }
  */

}
