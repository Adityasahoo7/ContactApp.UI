import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

// All routes under /contacts path
const routes: Routes = [
  { path: '', component: ContactListComponent },          // /contacts
  { path: 'add', component: ContactAddComponent },        // /contacts/add
  { path: 'edit/:id', component: ContactEditComponent },  // /contacts/edit/:id
  { path: 'view/:id', component: ContactViewComponent },  // /contacts/view/:id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
