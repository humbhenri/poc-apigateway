import { Aluno } from './aluno';
import { Disciplina } from './disciplina';

export class Inscricao {
    constructor(
        public id: number,
        public aluno: Aluno,
        public disciplinas: Array<Disciplina>,
    ) {}
}
