import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonNewPostComponent } from '@app/components/button-new-post/button-new-post.component';
import { ButtonScrollToUpComponent } from '@app/components/button-scroll-to-up/button-scroll-to-up.component';
import { CardPostComponent } from '@app/components/shared/card-post/card-post.component';
import { HeaderComponent } from '@app/components/shared/header/header.component';
import { LoaderComponent } from '@app/components/shared/loader/loader.component';
import { WeddingState } from '@app/core/models/wedding.model';
import { FirebaseService } from '@app/services/firebase.service';
import { loadWedding, setWedding } from '@app/state/actions/wedding.actions';
import { selectStore } from '@app/state/selectors/posts.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-wed-posts',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CardPostComponent,
    HeaderComponent,
    ButtonNewPostComponent,
    ButtonScrollToUpComponent,
    LoaderComponent,
  ],
  templateUrl: './wed-posts.component.html',
  styleUrl: './wed-posts.component.css',
})
export class WedPostsComponent {
  weddingPath!: string;
  wedding$: Observable<WeddingState> = this.store
    .select(selectStore)
    .pipe(map((data: WeddingState) => data));

  constructor(
    private store: Store,
    private _firestore: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.weddingPath = params['weddingName'];
    });
  }

  ngOnInit(): void {
    this._firestore.getWedding(this.weddingPath).subscribe((wedding) => {
      this.store.dispatch(loadWedding());
      const currentUrl = this.router.url;
      if (wedding) {
        if (!currentUrl.includes('posts')) {
          this.router.navigateByUrl(`/bodas/${this.weddingPath}/posts`);
        }
        this.store.dispatch(setWedding({ wedding }));
        localStorage.setItem('weddingInfo', JSON.stringify(wedding));
      } else {
        this.router.navigateByUrl(`/bodas/notFound`);
      }
    });
  }
}
