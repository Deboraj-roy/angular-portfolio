import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVService } from '../../core/services/cv.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvComponent {
  readonly cv$ = this.cvService.getCV();

  constructor(private cvService: CVService) {}
}
