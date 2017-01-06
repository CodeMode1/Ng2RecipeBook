import { Injectable } from '@angular/core';
import { Ingredient } from '../shared';

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() { }

  //js array methods
  getItems(){
    return this.items;
  }

  addItems(items: Ingredient[]){
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingredient){
    this.items.push(item);
  }

  editItem(oldItem: Ingredient, newItem: Ingredient){
    this.items[this.items.indexOf(oldItem)]  = newItem;
  }

   deleteItem(item: Ingredient){
    this.items.splice(this.items.indexOf(item), 1);
  }

}
