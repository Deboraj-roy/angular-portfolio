import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CV } from '../../models/cv.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() cv!: CV;

  // Icon map for contact labels
  readonly ICONS: Record<string, string> = {
    'deborajroy.in@gmail.com': 'fa-envelope',
    '+880 1708 119559': 'fa-phone',
    'github.com/Deboraj-roy': 'fab fa-github',
    'linkedin.com/in/deboraj-roy': 'fab fa-linkedin',
    'codeforces.com/profile/DEBORAJ': 'fa-code',
    'deboraj.me': 'fa-globe'
  };

  getIcon(label: string): string {
    return this.ICONS[label] || 'fa-link';
  }

  isBrandIcon(label: string): boolean {
    const icon = this.ICONS[label] || 'fa-link';
    return icon.startsWith('fab ');
  }
}
