import { Component, Input } from '@angular/core';
import { Comments } from '@app/core/models/post.model';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input({ required: true }) comments!: Comments[];
}
