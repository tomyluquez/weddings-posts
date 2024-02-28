import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/core/models/user.model';
import { FirebaseService } from '@app/services/firebase.service';
import { loadWedding } from '@app/state/actions/wedding.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css',
})
export class NewCommentComponent implements OnInit {
  @Input() userName!: string | null;
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

  ngOnInit() {
    const input = document.getElementById('inputComment');
    input?.focus();
  }

  addComment() {
    this._store.dispatch(loadWedding());
    const idComment = uuidv4();
    this._firebase.addComent(
      this.publicationId,
      this.newComment,
      this.userName || 'defaulUser',
      idComment
    );
    this.newComment = '';
  }
}
