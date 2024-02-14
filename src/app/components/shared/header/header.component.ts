import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Wedding } from '@app/core/models/wedding.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() wedding?: Wedding;

  imgBg = './assets/bg-header.webp';
  scrollPosition = 0;

  constructor(private dc: ChangeDetectorRef) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;
      this.dc.detectChanges();
    });
  }
}
