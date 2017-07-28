import { TipoAtividadeAcademica } from "./tipo-atividade-academica.enum";
import { Nota } from './nota';

export class AtividadeAcademica {
    public constructor(
        public tipo : TipoAtividadeAcademica,
        public nota : Nota,
    ){}
}
