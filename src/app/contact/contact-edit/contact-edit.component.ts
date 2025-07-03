import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
})
export class ContactEditComponent implements OnInit {
  contact: Contact = {
    id: '',
    fullname: '',
    email: '',
    phone: 0,
    address: ''
  };

  errorMessage: string = '';
  errorMessages: string[] = [];
  contactId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');

    if (this.contactId) {
      // Fetch existing contact by ID
      this.contactService.getById(this.contactId).subscribe({
        next: (data) => {
          this.contact = data;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load contact: ' + err.message;
        }
      });
    }
  }

  // Submit updated contact
  // onSubmit(): void {
  //   if (this.contactId) {
  //     this.contactService.update(this.contactId, this.contact).subscribe({
  //       next: () => {
  //         alert('Contact updated successfully!');
  //         this.router.navigate(['/contacts']);
  //       },
  //       error: (err) => {
  //          console.log("Error Message"+err);
  //         this.errorMessage = 'Failed to update contact: ' + err.message;
         
  //       }
  //     });
  //   }
  // }
  onSubmit(): void {
  if (this.contactId) {
    this.contactService.update(this.contactId, this.contact).subscribe({
      next: () => {
        alert('Contact updated successfully!');
        this.router.navigate(['/contacts']);
      },

 error: (err: any) => {
  console.log("Raw Error:", err);

  if (err.status === 400 && err.error && err.error.errors) {
    const messages: string[] = [];

    for (const field in err.error.errors) {
      if (err.error.errors.hasOwnProperty(field)) {
        const fieldErrors = err.error.errors[field];
        fieldErrors.forEach((message: string) => {
          messages.push(`${field}: ${message}`);
        });
      }
    }

    this.errorMessages = messages;
    this.errorMessage = '';
  } else if (typeof err.error === 'string') {
    // API returned plain string error
    this.errorMessage = err.error;
    this.errorMessages = [];
  } else {
    // Final fallback
    this.errorMessage = `Failed to update contact. Server Error Code: ${err.status || 'Unknown'} Message: ${err.statusText || 'No status text'}`;
    this.errorMessages = [];
  }
}


    });
  }
}
}
