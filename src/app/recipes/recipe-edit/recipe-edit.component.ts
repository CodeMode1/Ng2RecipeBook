import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/RX';
import { FormArray, 
         FormGroup, 
         FormControl, 
         Validators, 
         FormBuilder,
       } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  moduleId: module.id,
  selector: 'rb-recipe-edit',
  templateUrl: 'recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private subscription: Subscription;
  private recipe: Recipe;
  private isNew = true;
  private recipeIndex: number;

  constructor(private activatedRoute: ActivatedRoute, 
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  //si je recois plusieurs params de l'observable ou je code sur plusieurs lignes:
  //encapsuler la logique suivant l'extraction du param dans un JS object 
  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        //EDITING si j'ai un id comme param dans le URl J'EDIT
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        }
        //ADDING si params ne contient pas de propriete id mon url est celui de new donc je cree une nouvelle recette
        else{
          this.isNew = true;
          this.recipe = null;
        }
        console.log(this.isNew);
        this.initForm();
      }
    );
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(this.isNew){
      this.recipeService.addRecipe(newRecipe);
    }
    else{
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  onAddItem(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern("\\d+")
        ])
    }))
  }

  //remove un ingredient de la recette: le FormArray ingredients contient un FormGroup = ingredient
  //on remove ce FormGroup (1er niveau de controls du FormArray) du FormArray par son index 
  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  //in his navigation , we returned to ['../'] to the recipes
  private navigateBack(){
    this.router.navigate([`/recipes/${this.recipeIndex}`]);
  }

  ngOnDestroy(){
    // free the memory from the subscription, no memory leaks when the component gets destroyed 
    this.subscription.unsubscribe();
  }

  private initForm(){
    //NEW RECIPE new form default empty values
    let recipeName: string = '';
    let recipeImageUrl: string = '';
    let recipeContent: string = '';
    let recipeIngredients: FormArray = new FormArray([]);

    //EDITING - values existing for a recipe 
    if(!this.isNew){
      if(this.recipe.hasOwnProperty('ingredients')){
        for(let i=0; i < this.recipe.ingredients.length; i++){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [
                  Validators.required, 
                  //the amount is a number reg ex
                  Validators.pattern("\\d+")
                  ])
            })
          );
        }
      }
      //setting form controls names
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
      }

      //create the form whether editing or creating a new
      //create the form either with another FormGroup or FormBuilder (data-driven approach)
      //a form is just a FormGroup
      this.recipeForm = this.formBuilder.group({
        name: [recipeName, Validators.required],
        imagePath: [recipeImageUrl, Validators.required],
        description: [recipeContent, Validators.required],
        //FormArray containing all the form groups where each FormGroup is an ingredient
        ingredients: recipeIngredients
      });
  }
}
