import { Disciplina } from './disciplina';

export class Aluno {
    constructor(
        public id: number,
        public nome: string,
        public username: string,
        public disciplinasFeitas: Array<Disciplina>
    ) {}
}
