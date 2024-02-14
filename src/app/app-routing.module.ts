import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WedPostsComponent } from './layouts/wed-posts/wed-posts.component';
import { HomeComponent } from './layouts/home/home.component';

const routes: Routes = [
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

  // {
  //   path: 'bodas/:weddingName',
  //   loadComponent: () =>
  //     import('@app/layouts/wed-posts/wed-posts.component').then(
  //       (c) => c.WedPostsComponent
  //     ),
  // },
  // {
  //   path: 'bodas/:weddingName/post/:publicationId',
  //   loadComponent: () =>
  //     import('@layouts/individual-post/individual-post.component').then(
  //       (c) => c.IndividualPostComponent
  //     ),
  // },
  {
    path: 'panel',
    loadComponent: () =>
      import('@app/layouts/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
