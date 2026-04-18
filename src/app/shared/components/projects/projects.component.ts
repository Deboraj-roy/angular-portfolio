import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/cv.model';
import { TagRowComponent } from '../tag-row/tag-row.component';

type ProjectFilter = 'all' | 'dotnet' | 'api' | 'cloud';

interface FilterOption {
  key: ProjectFilter;
  label: string;
}

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

  activeFilter: ProjectFilter = 'all';

  readonly filterOptions: FilterOption[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'dotnet', label: '.NET Focus' },
    { key: 'api', label: 'API & Architecture' },
    { key: 'cloud', label: 'Cloud & DevOps' }
  ];

  get filteredProjects(): Project[] {
    switch (this.activeFilter) {
      case 'dotnet':
        return this.projects.filter((project) => this.hasKeywords(project.tags, ['.net', 'asp.net', 'c#', 'entity framework']));
      case 'api':
        return this.projects.filter((project) => this.hasKeywords(project.tags, ['api', 'microservices', 'rbac', 'architecture']));
      case 'cloud':
        return this.projects.filter((project) => this.hasKeywords(project.tags, ['docker', 'cloudflare', 'aws', 'workers']));
      default:
        return this.projects;
    }
  }

  get hasFilteredProjects(): boolean {
    return this.filteredProjects.length > 0;
  }

  setFilter(filter: ProjectFilter): void {
    this.activeFilter = filter;
  }

  trackByTitle(_index: number, project: Project): string {
    return project.title;
  }

  private hasKeywords(tags: string[], keywords: string[]): boolean {
    return tags.some((tag) => {
      const normalizedTag = tag.toLowerCase();
      return keywords.some((keyword) => normalizedTag.includes(keyword));
    });
  }
}
