import { Component } from '@angular/core';
import { FormPostComponent } from '../form-post/form-post.component';
import { ButtonBackComponent } from '@app/components/shared/button-back/button-back.component';
import { Observable, map } from 'rxjs';
import { Post } from '@app/core/models/post.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectIndividualPost } from '@app/state/selectors/posts.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ButtonBackComponent, FormPostComponent, CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent {
  loading = false;
  publicationId = this.route.snapshot.paramMap.get('publicationId');
  post$!: Observable<Post>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true; // Cambiar a true antes de obtener el post
    this.post$ = this.store.select(selectIndividualPost).pipe(
      map((data: Post[]) => {
        const postInd = data.filter(
          (post) => post.publicationId === this.publicationId
        )[0];
        return postInd;
      })
    );
    this.loading = false; // Cambiar a false cuando se obtenga el post
  }
}
