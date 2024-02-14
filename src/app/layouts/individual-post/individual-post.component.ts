import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from '@app/components/comments/comments.component';
import { NewCommentComponent } from '@app/components/new-comment/new-comment.component';
import { ButtonBackComponent } from '@app/components/shared/button-back/button-back.component';
import { CardPostComponent } from '@app/components/shared/card-post/card-post.component';
import { Post } from '@app/core/models/post.model';
import { selectIndividualPost } from '@app/state/selectors/posts.selectors';
import { Store } from '@ngrx/store';
import { Observable, first, map } from 'rxjs';

@Component({
  selector: 'app-individual-post',
  standalone: true,
  imports: [
    ButtonBackComponent,
    CardPostComponent,
    CommonModule,
    CommentsComponent,
    NewCommentComponent,
  ],
  templateUrl: './individual-post.component.html',
  styleUrl: './individual-post.component.css',
})
export class IndividualPostComponent implements OnInit {
  publicationId = this.route.snapshot.paramMap.get('publicationId');
  post$!: Observable<Post>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.store
      .select(selectIndividualPost)
      .pipe(
        map(
          (data: Post[]) =>
            data.filter((post) => post.publicationId === this.publicationId)[0]
        )
      );
  }
}