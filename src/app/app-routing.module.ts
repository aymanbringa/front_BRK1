
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './_services/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './componement/categorie/create-category/create-category.component';
import { CategorieListComponent } from './componement/categorie/categorie-list/categorie-list.component';
import { CategoryEditComponent } from './componement/categorie/category-edit/category-edit.component';
import { SousCategoryCreateComponent } from './componement/sous-categories/sous-category-create/sous-category-create.component';
import { SousCategoriesListComponent } from './componement/sous-categories/sous-categories-list/sous-categories-list.component';
import { SousCategoriesEditComponent } from './componement/sous-categories/sous-categories-edit/sous-categories-edit.component';





const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'contact',component:ContactComponent},
  {path:'home',component:HomeComponent},
  {path:'shop',component:ShopComponent},
  {path:'checkout',component:CheckoutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'categories',component:CategorieListComponent},
  {path:'categories/create',component:CreateCategoryComponent},
  {path:'categories/edit/:id',component:CategoryEditComponent},
  {path:'sous-categories',component:SousCategoriesListComponent},
  {path:'sous-categories/create',component:SousCategoryCreateComponent},
  {path:'sous-categories/edit/:id',component:SousCategoriesEditComponent},


  { path: 'admin', component: BoardAdminComponent  },



  {path:'cart',component:CartComponent}
];

@NgModule({


  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
