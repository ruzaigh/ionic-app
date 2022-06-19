import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  loadRecipe: Recipe;

  constructor(
    private activeRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      //check if it exist
      if(!params.has('recipeId')){
        //redirectTo
        this.router.navigate(['/recipes']);
        return;
      }
      //grab it
      const recipeId = params.get('recipeId');
      // then set it
    this.loadRecipe = this.recipesService.getRecipe(recipeId);
    });
  }
  onDelete(){
    this.alertCtrl.create({
      header:'Are you sure',
      message: 'Do you really want to delete this recipe?',
      buttons:[{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () =>{
          this.recipesService.deleteRecipe(this.loadRecipe.id);
          this.router.navigate(['/recipes']);
        }
      }]
    }).then(alertEl =>{
      alertEl.present();
    });

  }
}
