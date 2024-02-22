import { Component, Input } from '@angular/core';
import { Post } from '@app/core/models/post.model';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-user-image-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-image-profile.component.html',
  styleUrl: './user-image-profile.component.css',
})
export class UserImageProfileComponent {
  @Input({ required: true }) userNamePost!: string;

  initialLetter(): string {
    const initial = this.userNamePost.slice(0, 1);
    return initial.toUpperCase();
  }
}
