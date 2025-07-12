
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';  
import { ContactViewComponent } from './contact/contact-view/contact-view.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './core/guard/auth.guard';
//import { authGuard } from './core/guard/auth.guard';



// const routes: Routes = [
//   { path: 'contacts', component: ContactListComponent }, //
//    { path: 'contacts/add', component: ContactAddComponent }, 
//   { path: 'contacts/view/:id', component: ContactViewComponent },
//    { path: 'contacts/edit/:id', component: ContactEditComponent },
//   { path: '', redirectTo: '/contacts', pathMatch: 'full' }, // optional default route
// ];


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'contacts',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ContactListComponent },
      { path: 'add', component: ContactAddComponent },
      { path: 'view/:id', component: ContactViewComponent },
      { path: 'edit/:id', component: ContactEditComponent }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
