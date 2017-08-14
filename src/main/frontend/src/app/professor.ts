export class Professor {

  public constructor(
    public id: number,
    public nome: string,
    public username: Username,
    public endereco: string,
    public telefone: string,
    public nascimento: Date,
  ) { }

}

export class Username {
  public constructor(
    public username: string,
    public enabled: number,
    public password: string,
  ) { }
}
