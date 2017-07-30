import {Disciplina} from './disciplina';
import {Professor} from './professor';
import {Horario} from './horario';

export class Turma {
  constructor(
    public id: number,
    public disciplina: Disciplina,
    public capacidade: number,
    public semestre: number,
    public professor: Professor
  ) {}
}
