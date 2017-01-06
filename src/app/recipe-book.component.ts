import { Component } from '@angular/core';
import { RecipeService } from './recipes';

@Component({
  moduleId: module.id,
  selector: 'rb-root',
  templateUrl: 'recipe-book.component.html',
  providers: [RecipeService]
})
export class RecipeBookAppComponent {

}
