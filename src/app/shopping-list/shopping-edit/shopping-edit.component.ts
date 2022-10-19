import { Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: 'shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
    @ViewChild("f") ingredientForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex:number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService){ }

    ngOnInit(){
        this.subscription = this.shoppingListService.ingredientSelected.subscribe(
            (index) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.ingredientForm.setValue({
                    'name': this.editedItem.name,
                    'amount': this.editedItem.amount
                });
            }
        );
    }

    onSubmit(form: NgForm){
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if(this.editMode){
            this.shoppingListService.UpdateIngredient(this.editedItemIndex, newIngredient);

        } else {
            this.shoppingListService.AddIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    onDelete(){
        this.shoppingListService.DeleteIngredient(this.editedItemIndex);
        this.ingredientForm.reset();
        this.editMode = false;
    }

    onClear(){
        this.editMode = false;
        this.ingredientForm.reset();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}