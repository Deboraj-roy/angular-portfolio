import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Additional } from '../../../models/cv.model';
import { LangPipe } from '../../pipes/lang.pipe';

@Component({
  selector: 'app-additional',
  standalone: true,
  imports: [CommonModule, LangPipe],
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalComponent {
  @Input() additional!: Additional;
}
