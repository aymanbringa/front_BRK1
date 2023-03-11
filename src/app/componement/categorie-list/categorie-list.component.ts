import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/_services/categorie.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit{
  categories: Categorie[] = [];
  constructor(private categorieService: CategorieService) { }


  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categorieService.getAllCategories()
      .subscribe((categories: Categorie[]) => {
        this.categories = categories;
      });
  }

}
