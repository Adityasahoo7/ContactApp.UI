import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  errorMessage: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  // Get all contacts from API
  loadContacts(): void {
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load contacts: ' + err.message;
      },
    });
  }

  // Delete contact by id
  deleteContact(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      this.contactService.delete(id).subscribe({
        next: () => {
          alert('Contact deleted successfully!');
          this.loadContacts(); // reload list after delete
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete contact: ' + err.message;
        },
      });
    }
  }
}
