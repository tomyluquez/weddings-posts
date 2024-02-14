import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@app/core/models/post.model';
import { FirebaseService } from '@app/services/firebase.service';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css',
})
export class CardPostComponent {
  @Input({ required: true }) post!: Post | null;
  messageFull: boolean = false;
  isOpenOptionsMenu: boolean = false;
  currentUrl = this.router.url;

  constructor(private router: Router, private _firebase: FirebaseService) {}

  openPost(id: string) {
    const newUrl = this.currentUrl.endsWith('/')
      ? `${this.currentUrl}${id}`
      : `${this.currentUrl}/${id}`;

    // Verificar si la URL actual ya contiene el ID
    if (!this.currentUrl.includes(id)) {
      this.router.navigateByUrl(newUrl);
    }
  }
  editPost(id: string) {
    const newUrl = this.currentUrl.endsWith('/')
      ? `${this.currentUrl}editPost/${id}`
      : `${this.currentUrl}/editPost/${id}`;
    this.router.navigateByUrl(newUrl);
  }

  toogleMessage() {
    this.messageFull = !this.messageFull;
  }

  toggleOptionsMenu() {
    this.isOpenOptionsMenu = !this.isOpenOptionsMenu;
  }

  like() {
    if (!this.post?.likes.includes('userName')) {
      this._firebase.likePost(this.post!.publicationId, 'userName');
    } else {
      this._firebase.noLikePost(this.post!.publicationId, 'userName');
    }
    this.router.navigateByUrl(this.router.url);
  }
}
