export class Horario {
  constructor(
    public id: number,
    public hora: number,
    public dia: Dia,
  ) {}
}

export class Dia {
  constructor(public id: number, public nome: string) {}
}
