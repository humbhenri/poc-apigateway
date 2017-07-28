export class Disciplina {
    constructor(
        public id: string,
        public nome: string, 
        public creditos: number,
        public aulas: number,
        public requisitos: Array<Disciplina>, // ids de matrículas
    ) {}
}
