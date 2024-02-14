import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonNewPostComponent } from '@app/components/button-new-post/button-new-post.component';
import { CardPostComponent } from '@app/components/shared/card-post/card-post.component';
import { WeddingState } from '@app/core/models/wedding.model';
import { selectStore } from '@app/state/selectors/posts.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ButtonNewPostComponent, CardPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  store$: Observable<WeddingState> = this.store
    .select(selectStore)
    .pipe(map((store: WeddingState) => store));

  constructor(private store: Store) {}
}
