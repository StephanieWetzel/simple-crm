import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string | undefined | any;
  user: User = new User();
  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }


  getUser() {
    const docRef = this.getUserDocRef();
    docData(docRef).subscribe(user => {
      this.user = new User(user);
    });
  }


  getUserDocRef() {
    return doc(this.firestore, 'users', this.userId);
  }


  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // creates COPY of user, which we can then edit without changing data in the original user (when closing it without saving changes)
    dialog.componentInstance.userId = this.userId; // userId from DialogEditAddressComponent receives value from userId in THIS component
  }


  editAddressDetails() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // creates COPY of user, which we can then edit without changing data in the original user
    dialog.componentInstance.userId = this.userId; // userId from DialogEditAddressComponent receives value from userId in THIS component
  }

}
