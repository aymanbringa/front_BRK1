import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie'; 
import { SousCategories } from 'src/app/model/sous-categories'; 
import { CategorieService } from 'src/app/_services/categorie.service'; 
import { SousCategoriesService } from 'src/app/_services/sous-categories.service';

@Component({
  selector: 'app-sous-category-create',
  templateUrl: './sous-category-create.component.html',
  styleUrls: ['./sous-category-create.component.css']
})
export class SousCategoryCreateComponent {
  categories!: Categorie[];
  sousCategorieForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private categorieService: CategorieService,
              private sousCategorieService: SousCategoriesService) { }

  ngOnInit(): void {
    this.initForm();
    this.categorieService.getAllCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  initForm(): void {
    this.sousCategorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }

  onSubmit(): void {



    const sousCategorie: SousCategories = {
      nom: this.sousCategorieForm.get('nom')?.value,
      image: this.sousCategorieForm.get('image')?.value,
      categorie: { id: this.sousCategorieForm.get('categorie')?.value } as Categorie,
      id:null
    };

    console.log(sousCategorie);
    
    this.sousCategorieService.createSousCategorie(sousCategorie).subscribe(
      (createdSousCategorie: SousCategories) => {
        this.router.navigate(['/sous-categories', createdSousCategorie.id]);
      },
      (error) => {
        this.errorMessage = error.message;
        
      }
    );
  }
  
  
  

}


