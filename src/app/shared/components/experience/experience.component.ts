import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../models/cv.model';
import { TagRowComponent } from '../tag-row/tag-row.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TagRowComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
