import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user: User = new User();
  dateOfBirth: Date | any;
  loading = false;
  firestore: Firestore = inject(Firestore);


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }


  async saveUser() {
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    console.log('Current user is ', this.user);
    this.loading = true;

    await addDoc(this.getUserColRef(), this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }


  getUserColRef() {
    return collection(this.firestore, 'users');
  }


}
