import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { CVService } from '../../../core/services/cv.service';
import { PrintService } from '../../../core/services/print.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-fab-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fab-group.component.html',
  styleUrls: ['./fab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FABGroupComponent {
  readonly darkMode$ = this.themeService.darkMode$;

  constructor(
    private themeService: ThemeService,
    private cvService: CVService,
    private printService: PrintService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  generatePrintCV(): void {
    this.cvService.getCV().pipe(take(1)).subscribe(cv => {
      this.printService.generatePrintCV(cv);
    });
  }
}
