import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout.component';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { DetailedRecipeCardComponent } from './detailed-recipe-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, DetailedRecipeCardComponent],
  templateUrl: './home-page.html'
})
export class HomePage {
  private recipesService = inject(RecipesService);

  categories = this.recipesService.categories;
  selectedCategory = this.recipesService.selectedCategory;
  searchQuery = this.recipesService.searchQuery;
  isLoading = this.recipesService.isLoading;
  hasResults = this.recipesService.hasResults;

  recipeList = computed(() => {
    const result = this.recipesService.recipes();
    return typeof result === 'function' ? result() ?? [] : result ?? [];
  });

  changeCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  updateSearch(query: string) {
    this.searchQuery.set(query);
  }
}
