import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments } from '@app/core/models/post.model';
import { FirebaseService } from '@app/services/firebase.service';
import { loadWedding } from '@app/state/actions/wedding.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input({ required: true }) comments!: Comments[];
  publicationId!: string;

  constructor(
    private _firebase: FirebaseService,
    private _router: ActivatedRoute,
    private _store: Store
  ) {
    this._router.params.subscribe((params) => {
      this.publicationId = params['publicationId'];
    });
  }

  deleteComment(idComment: string) {
    this._store.dispatch(loadWedding());
    this._firebase.deleteComent(this.publicationId, idComment);
  }
}
