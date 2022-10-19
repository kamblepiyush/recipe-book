import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient("Apple",2),
        new Ingredient("Banana",3)
    ];

    getIngredient(index: number){
        return this.ingredients[index];
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    AddIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    AddIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    UpdateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    DeleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}