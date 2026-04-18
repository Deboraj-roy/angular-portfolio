import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/cv.model';
import { TagRowComponent } from '../tag-row/tag-row.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TagRowComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  @Input() projects: Project[] = [];
}
