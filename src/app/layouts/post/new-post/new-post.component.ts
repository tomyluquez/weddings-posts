import { Component } from '@angular/core';
import { ButtonBackComponent } from '@app/components/shared/button-back/button-back.component';
import { FormPostComponent } from '../form-post/form-post.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ButtonBackComponent, FormPostComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {}
