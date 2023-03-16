import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SousCategories } from 'src/app/model/sous-categories';
import { SousCategoriesService } from 'src/app/_services/sous-categories.service';

@Component({
  selector: 'app-sous-categories-list',
  templateUrl: './sous-categories-list.component.html',
  styleUrls: ['./sous-categories-list.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class SousCategoriesListComponent {
  SousCategories:SousCategories[]=[];
  selectedCategorie: SousCategories | undefined ;
  showEditForm =false;
  selectedCategoryImage: any;

  constructor(private souscategorieService: SousCategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSousCategories();

  }
  getAllSousCategories(): void {
    this.souscategorieService.getAllSousCategories()
      .subscribe((souscategories: SousCategories[]) => {
        this.SousCategories = souscategories;
      });
  }

  deleteSousCategory(souscategory: SousCategories) {
    this.souscategorieService.deleteSousCategorie(souscategory.id).subscribe(() => {
      // Remove the deleted category from the list
      const index = this.SousCategories.indexOf(souscategory);
      this.SousCategories.splice(index, 1);
    });
  }
  editCategory(souscategory: SousCategories) {
    this.router.navigate(['/category-edit', souscategory.id]);
  }

}
