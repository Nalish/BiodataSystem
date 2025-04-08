import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
// Declare the form group
christianForm: FormGroup;

// Inject the FormBuilder into the constructor
constructor(private fb: FormBuilder) {
  // Use FormBuilder to create the form
  this.christianForm = this.fb.group({
    name: ['', Validators.required],
    father: ['', Validators.required],
    mother: ['', Validators.required],
    tribe: [''],
    clan: [''],
    village: [''],
    subcounty: [''],
    dob: ['', Validators.required],
    residence: [''],

    baptismPlace: [''],
    baptismDate: [''],
    baptisedBy: [''],
    administrator: [''],

    eucharistPlace: [''],
    eucharistDate: [''],

    confirmationPlace: [''],
    confirmationDate: [''],
    confirmationNo: [''],

    spouse: [''],
    marriagePlace: [''],
    marriageDate: [''],
    marriageNo: ['']
  });
}

// Method to handle form submission
onSubmit() {
  if (this.christianForm.valid) {
    console.log('Form Data:', this.christianForm.value);
  } else {
    console.log('Form is invalid');
  }
}
}

