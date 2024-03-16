import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user: User | any;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
  }


  saveUser() {

  }
}
