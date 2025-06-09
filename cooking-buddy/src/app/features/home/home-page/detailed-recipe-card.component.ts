import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailed-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px; width: 300px;">
      <img [src]="recipe.strMealThumb" alt="{{ recipe.strMeal }}" style="width: 100%; border-radius: 4px;" />
      <h3>{{ recipe.strMeal }}</h3>
      <p><strong>Catégorie :</strong> {{ recipe.strCategory }}</p>
      <p><strong>Zone :</strong> {{ recipe.strArea }}</p>
      <p><strong>Ingrédients :</strong></p>
      <ul>
        <li *ngFor="let ing of ingredients">{{ ing }}</li>
      </ul>
    </div>
  `
})
export class DetailedRecipeCardComponent {
  @Input() recipe: any;

  get ingredients(): string[] {
    if (!this.recipe) return [];
    return Array.from({ length: 20 }, (_, i) => this.recipe[`strIngredient${i + 1}`])
      .filter((ing) => ing && ing.trim() !== '');
  }
}
