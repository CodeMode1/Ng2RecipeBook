import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  moduleId: module.id,
  selector: 'rb-shopping-add',
  templateUrl: 'shopping-add.component.html'
})
export class ShoppingAddComponent implements OnChanges {
  isAdd: boolean = true;
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter<any>();

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes){
    //no item was selected in the list
    // first case by default null no item to select since the ;sit is empty
    if(changes.item.currentValue === null){
      this.isAdd = true;
      //name and amount are now accessible in the html with item.name or item.amount 
      // as before the first case, when clicking an element of the list
      // the item was null and we couldnt access the properties
      this.item = {name: null, amount: null};
    }
    else{
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient){
    const newIngredient =  new Ingredient(ingredient.name, ingredient.amount);
    console.log(ingredient);
    if(!this.isAdd){
      this.sls.editItem(this.item, newIngredient);
      this.onClear();
    }
    else{
      this.item = newIngredient;
      this.sls.addItem(this.item);
    }
  }

  onDelete(){
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onClear(){
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
