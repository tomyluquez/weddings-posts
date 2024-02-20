import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '@app/services/firebase.service';
import { loadWedding } from '@app/state/actions/wedding.actions';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css',
})
export class NewCommentComponent {
  newComment: string = '';
  publicationId!: string;

  constructor(
    private _router: ActivatedRoute,
    private _firebase: FirebaseService,
    private _store: Store
  ) {
    this._router.params.subscribe((params) => {
      this.publicationId = params['publicationId'];
    });
  }

  addComment() {
    this._store.dispatch(loadWedding());
    const idComment = uuidv4();
    this._firebase.addComent(
      this.publicationId,
      this.newComment,
      'Tomas Luquez',
      idComment
    );
    this.newComment = '';
  }
}
