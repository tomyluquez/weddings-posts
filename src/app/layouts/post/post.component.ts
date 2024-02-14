import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonNewPostComponent } from '@app/components/button-new-post/button-new-post.component';
import { CardPostComponent } from '@app/components/shared/card-post/card-post.component';
import { Wedding } from '@app/core/models/wedding.model';
import { selectInfoWedding } from '@app/state/selectors/posts.selectors';
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
  wedding$: Observable<Wedding> = this.store
    .select(selectInfoWedding)
    .pipe(map((data: Wedding) => data));

  constructor(private store: Store) {}
}
