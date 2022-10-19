import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    constructor(private shoppingListService: ShoppingListService) { }

    // private recipes: Recipe[] =[
    //     new Recipe(
    //         'Chicken Wings',
    //         "If you're in need of a new spicy treatment for chicken wings, you've come to the right place. " +
    //         "This recipe draws inspiration from the grilled wings that can be found in Turkish kebab shops (such as those Kenji visited on his 2014 trip to Istanbul), " +
    //         "using a mixture of hot Turkish pepper paste, olive oil, spices, parsley, garlic, " + 
    //         "and a touch of pomegranate molasses as both a marinade and a dipping sauce for the wings.",
    //         'https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13-1500x1125.jpg',
    //         [
    //             new Ingredient('Pepper',2),
    //             new Ingredient('Chicken Pieces',3),
    //             new Ingredient('Garlic',4)
    //         ]         
    //     ),
    //     new Recipe(
    //         'Veggie Burger',
    //         'Delicious, lip-smacking and crunchy these words will only remind you of this amazing American dish popularly known as Burger. ' +
    //         'No matter how you prepare a burger, this dish is will leave you craving for more each time you eat it you have it. So, ' +
    //         'this time when your kids want to relish something good and delicious at home, ' +
    //         'prepare this simple yet delicious Vegetable Burger recipe.',
    //         'https://static.toiimg.com/thumb/52532689.cms?width=1200&height=900',
    //         [
    //             new Ingredient('Bun',2),
    //             new Ingredient('Potato',2),
    //             new Ingredient('Tomato',1),
    //             new Ingredient('Onion',1)
    //         ]
    //     )
    // ];
    private recipes: Recipe[]= [];

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }
    
    getRecipe(index:number){
        return this.recipes[index];
    }

    AddIngredientsToList(ingredients: Ingredient[]){
        this.shoppingListService.AddIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    DeleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}