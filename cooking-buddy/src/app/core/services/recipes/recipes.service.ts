import { Injectable, signal, computed, inject, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  selectedCategory = signal<string>('Beef');
  searchQuery = signal<string>(''); // ✅ pour la recherche
  categories = signal<string[]>([]);

  constructor() {
    this.loadCategories();
  }

  private loadCategories() {
    this.http.get<{ categories: { strCategory: string }[] }>(`${this.baseUrl}/categories.php`)
      .subscribe(res => {
        const cat = res.categories.map(c => c.strCategory);
        this.categories.set(cat);
      });
  }

  private _recipesResource = resource({
    params: () => ({ category: this.selectedCategory() }),
    loader: async ({ params }) => {
      const res = await this.http
        .get<{ meals?: any[] }>(`${this.baseUrl}/filter.php?c=${params.category}`)
        .toPromise();
      return res?.meals ?? [];
    }
  });

  private _searchResource = resource({
    params: () => ({ query: this.searchQuery() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      const res = await this.http
        .get<{ meals?: any[] }>(`${this.baseUrl}/search.php?s=${params.query}`)
        .toPromise();
      return res?.meals ?? [];
    }
  });

  recipes = computed(() => {
    return this.searchQuery() ? this._searchResource.value : this._recipesResource.value;
  });

  isLoading = computed(() => {
    return this.searchQuery() ? this._searchResource.isLoading : this._recipesResource.isLoading;
  });

  hasResults = computed(() => {
    const result = this.recipes();
    return Array.isArray(result) && result.length > 0;
  });
}
