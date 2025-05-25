import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'tokenModel',
  standalone: true
})
export class TokenModelPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const words = value.trim().split(/\s+/);
    const initials = words.map(w => w[0]?.toUpperCase()).slice(0, 2).join('');
    return initials;
  }
}
