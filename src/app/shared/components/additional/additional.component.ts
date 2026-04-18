import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Additional } from '../../models/cv.model';

@Component({
  selector: 'app-additional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalComponent {
  @Input() additional!: Additional;
}
