import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langPipe',
  standalone: true
})
export class LangPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const escaped = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    return escaped.replace(/\n/g, '<br>');
  }
}
