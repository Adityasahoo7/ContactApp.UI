import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
})
export class ContactViewComponent implements OnInit {
  contact!: Contact;             // Contact object to display
  errorMessage: string = '';     // Error message if fetch fails
  contactId: string | null = ''; // Contact ID from route

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');

    if (this.contactId) {
      this.contactService.getById(this.contactId).subscribe({
        next: (data) => {
          this.contact = data;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load contact: ' + err.message;
        },
      });
    }
  }
}
