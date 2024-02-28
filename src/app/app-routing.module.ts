import { NgModule } from '@angular/core';
import { RouterModule, Routes, withViewTransitions } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/bodas',
    pathMatch: 'full',
  },
  {
    path: 'bodas/:weddingName',
    loadComponent: () =>
      import('@app/layouts/wed-posts/wed-posts.component').then(
        (c) => c.WedPostsComponent
      ),
    children: [
      {
        path: 'posts',
        loadComponent: () =>
          import('@app/layouts/post/post.component').then(
            (c) => c.PostComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'posts/newPost',
        pathMatch: 'full',
        loadComponent: () =>
          import('@layouts/post/new-post/new-post.component').then(
            (c) => c.NewPostComponent
          ),
      },
      {
        path: 'posts/:publicationId',
        loadComponent: () =>
          import('@layouts/individual-post/individual-post.component').then(
            (c) => c.IndividualPostComponent
          ),
      },
      {
        path: 'posts/editPost/:publicationId',
        loadComponent: () =>
          import('@layouts/post/edit-post/edit-post.component').then(
            (c) => c.EditPostComponent
          ),
      },
    ], // Este componente se renderizará al acceder a /bodas
  },
  {
    path: 'panel',
    loadComponent: () =>
      import('@app/layouts/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@app/layouts/auth/auth.component').then((c) => c.AuthComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
