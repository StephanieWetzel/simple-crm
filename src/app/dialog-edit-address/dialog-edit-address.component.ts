import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { User } from '../../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user: User | any = new User();
  userId: string | undefined | any;
  loading = false;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
  }


  async updateUser() {
    this.loading = true;

    await updateDoc(this.getUserDocRef(), this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }


  getUserDocRef() {
    return doc(this.firestore, 'users', this.userId);
  }

}
