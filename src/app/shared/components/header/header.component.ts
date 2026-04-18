import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CV } from '../../../models/cv.model';

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

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110'%3E%3Crect fill='%231d4f8a' width='110' height='110'/%3E%3Ctext x='50%25' y='54%25' font-size='44' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='serif'%3EDR%3C/text%3E%3C/svg%3E";
  }
}
