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
  image: any;
  saveCategory: any;
  selectedCategoryImage!: string;
  imageUrl: string = '';
  id!: number;
  category!: Categorie;
  test!:true;

  constructor(private formBuilder: FormBuilder, private categorieService: CategorieService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.categorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required]
    });
  
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.categorieService.getCategorieById(this.id).subscribe(
          category => {
            this.category = category;
            this.categorieForm.patchValue({
              nom: category.nom,
              image: category.image
            });
          },
          error => console.error('Error fetching category:', error)
        );
      }
    );
  }

  editCategorie() {
    this.category.nom = this.categorieForm.value.nom;
    this.category.image = this.categorieForm.value.image;
    this.categorieService.edit(this.category).subscribe(
      updatedCategorie => {
        console.log('Category updated successfully:', updatedCategorie);
        this.router.navigate(['/categories']);
      },
      error => {
        console.error('Error updating category:', error);
        this.router.navigate(['/categories']);
      }
    );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageControl = this.categorieForm.get('image')?.value;
      console.log(this.categorieForm.get('image'))
      if (this.test) {
        imageControl.setValidators([]);
        imageControl.updateValueAndValidity();
        // Mettre à jour la valeur du champ "image" dans le formulaire
        imageControl.setValue(file);
      }
      this.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
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
