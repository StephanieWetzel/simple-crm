import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string | undefined | any;
  user: User = new User();
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }


  async getUser() {
    const docRef = await getDoc(this.getUserDocRef());

    if (docRef) {
      const user = { ...docRef.data(), id: docRef.id };
      this.user = new User(user);
      return this.user;
    } else {
      alert('User not found!');
      return null;
    }
  }


  getUserDocRef() {
    return doc(this.firestore, 'users', this.userId);
  }

}
