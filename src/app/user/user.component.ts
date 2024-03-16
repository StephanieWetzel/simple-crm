import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule, NgFor, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User = new User();
  allUsers: any[] = [];
  unsubUsers;
  firestore: Firestore = inject(Firestore);


  constructor(public dialog: MatDialog) {
    this.unsubUsers = this.subUsersList();
  }


  subUsersList() {
    return onSnapshot(this.getUserColRef(), (list) => {
      this.allUsers = list.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    });
  }


  getUserColRef() {
    return collection(this.firestore, 'users');
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent, {
    });
  }


  ngOnDestroy() {
    this.unsubUsers();
  }
}
