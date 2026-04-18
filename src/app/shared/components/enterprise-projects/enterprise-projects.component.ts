import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseProject } from '../../../models/cv.model';
import { TagRowComponent } from '../tag-row/tag-row.component';

@Component({
  selector: 'app-enterprise-projects',
  standalone: true,
  imports: [CommonModule, TagRowComponent],
  templateUrl: './enterprise-projects.component.html',
  styleUrls: ['./enterprise-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterpriseProjectsComponent {
  @Input() projects: EnterpriseProject[] = [];
}
