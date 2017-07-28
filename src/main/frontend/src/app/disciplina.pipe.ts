import { Pipe, PipeTransform } from '@angular/core';
import { Disciplina } from './disciplina';

@Pipe({
  name: 'disciplina'
})
export class DisciplinaPipe implements PipeTransform {

  transform(value: Disciplina[], args?: any): string {
    return value.map(d => d.id).join(", ");
  }

}
