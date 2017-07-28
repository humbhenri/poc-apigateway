import { Disciplina } from './disciplina';
import { Turno } from "./turno.enum";
import { AtividadeAcademica } from './atividade-academica';

export class Turma {
    constructor(
        public disciplina: Disciplina,
        public turno: Turno,
        public atividadesAcademicas: AtividadeAcademica[],
    ) { }
}
