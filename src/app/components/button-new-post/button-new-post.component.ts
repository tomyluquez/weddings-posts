import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-new-post',
  standalone: true,
  imports: [],
  templateUrl: './button-new-post.component.html',
  styleUrl: './button-new-post.component.css',
})
export class ButtonNewPostComponent {
  constructor(private _router: Router) {}

  goToNewPost() {
    const currentUrl = this._router.url;
    const newUrl = currentUrl.endsWith('/')
      ? `${currentUrl}/newPost`
      : `${currentUrl}/newPost`;
    this._router.navigateByUrl(newUrl);
  }
}
