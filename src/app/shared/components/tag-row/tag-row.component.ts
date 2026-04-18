import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tag-row">
      <span *ngFor="let tag of tags" class="tag">{{ tag }}</span>
    </div>
  `,
  styles: [`
    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.85rem;
    }

    .tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--c-tag-bg);
      color: var(--c-tag-text);
      padding: 0.2rem 0.65rem;
      border-radius: 100px;
      border: 1px solid color-mix(in srgb, var(--c-tag-text) 20%, transparent);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagRowComponent {
  @Input() tags: string[] = [];
}
