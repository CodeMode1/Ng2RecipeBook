import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RecipeBookAppComponent }   from './recipe-book.component';
import { HeaderComponent } from './header.component';
import { RecipesComponent } from './recipes';
import { RecipeListComponent } from './recipes/recipe-list';
import { RecipeItemComponent } from './recipes/recipe-list';
import { RecipeDetailComponent } from './recipes/recipe-detail';
import { ShoppingListComponent } from './shopping-list';
import { ShoppingAddComponent } from './shopping-list';
import { DropdownDirective } from './dropdown.directive';
import { ShoppingListService } from './shopping-list';
import { RecipeEditComponent } from './recipes/recipe-edit/index';
import { RecipeStartComponent } from './recipes/recipe-start.component';

import { routing } from './app.routes';


@NgModule({
declarations: [RecipeBookAppComponent, HeaderComponent, RecipesComponent, RecipeListComponent, RecipeItemComponent, 
RecipeDetailComponent, ShoppingListComponent, ShoppingAddComponent, DropdownDirective,
RecipeEditComponent, RecipeStartComponent],
imports: [BrowserModule, FormsModule, routing, ReactiveFormsModule, HttpModule],
bootstrap: [RecipeBookAppComponent],
providers: [ShoppingListService]
})
export class AppModule {}
