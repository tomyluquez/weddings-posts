import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-scroll-to-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-scroll-to-up.component.html',
  styleUrl: './button-scroll-to-up.component.css',
})
export class ButtonScrollToUpComponent implements OnInit {
  scrollPosition = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;
      this.cd.detectChanges();
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
