
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';  
import { ContactViewComponent } from './contact/contact-view/contact-view.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';

const routes: Routes = [
  { path: 'contacts', component: ContactListComponent }, //
   { path: 'contacts/add', component: ContactAddComponent }, 
  { path: 'contacts/view/:id', component: ContactViewComponent },
   { path: 'contacts/edit/:id', component: ContactEditComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }, // optional default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
