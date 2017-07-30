import {Aluno} from './aluno';
import {Turma} from './turma';

export class Inscricao {
  constructor(
    public id: number,
    public aluno: Aluno,
    public turmas: Array<Turma>,
  ) {}
}
