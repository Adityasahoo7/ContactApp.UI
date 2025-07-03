import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
})
export class ContactAddComponent {
  // Initialize contact object for form binding
  contact: Contact = {
    id: '',
    fullname: '',
    email: '',
    phone: 0,
    address: ''
  };

  // Error message to display in UI
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  // Submit handler for the form
  onSubmit(): void {
    // Call the backend API to create the contact
    this.contactService.create(this.contact).subscribe({
      next: () => {
        alert('Contact added successfully!');
        this.router.navigate(['/contacts']); // Redirect to contact list
      },
      error: (err) => {
        console.error('Error creating contact:', err);
        this.errorMessage = 'Failed to add contact: ' + err.message;
      }
    });
  }
}
