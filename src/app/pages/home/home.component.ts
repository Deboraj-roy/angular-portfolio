import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVService } from '../../core/services/cv.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SkillsComponent } from '../../shared/components/skills/skills.component';
import { ExperienceComponent } from '../../shared/components/experience/experience.component';
import { EnterpriseProjectsComponent } from '../../shared/components/enterprise-projects/enterprise-projects.component';
import { ProjectsComponent } from '../../shared/components/projects/projects.component';
import { EducationComponent } from '../../shared/components/education/education.component';
import { CertificationsComponent } from '../../shared/components/certifications/certifications.component';
import { AdditionalComponent } from '../../shared/components/additional/additional.component';
import { FABGroupComponent } from '../../shared/components/fab-group/fab-group.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SkillsComponent,
    ExperienceComponent,
    EnterpriseProjectsComponent,
    ProjectsComponent,
    EducationComponent,
    CertificationsComponent,
    AdditionalComponent,
    FABGroupComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  cv$ = this.cvService.getCV();

  constructor(private cvService: CVService) {}
}
