import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/_services/categorie.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class CategoryEditComponent {

  categorieForm!: FormGroup;
  submitted = false;
  image: string | null = null;
  saveCategory: any;





  constructor(private formBuilder: FormBuilder, private categorieService: CategorieService,private route: ActivatedRoute, private router: Router) { }
  id!: number;
  category!: Categorie;

  ngOnInit(): void {
    this.categorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required]
      
    });
    

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.categorieService.getCategorieById(this.id).subscribe(
          category => this.category = category,
          error => console.error('Error fetching category:', error)
        );
      }
    );
  
    
  }
  editCategorie() {
    this.categorieService.edit(this.category).subscribe(
      updatedCategorie => {
        console.log('Categorie updated successfully:', updatedCategorie);
        // Optionally, you can redirect the user to a different page or update the list of categories
      },
      error => {
        console.error('Error updating categorie:', error);
        // Optionally, you can display an error message to the user or redirect them to an error page
      }
    );
  }
  get f() { return this.categorieForm.controls; }


  

  onFileChange(event: Event) {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    if (target?.files && target?.files?.length) {
      const filesArray = Array.from(target.files);
      const [file] = filesArray;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
      };
    }
  }
  
  

  clearImage() {
    this.image = null;
    this.categorieForm.patchValue({ image: null });
  }





}
