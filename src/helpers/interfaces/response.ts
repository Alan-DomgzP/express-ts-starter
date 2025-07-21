export interface ResponseTO {
    codigo      : string;
    mensaje     : string;
    status      : number;
    folio       : string;
    resultado   ?: Resultado;
}

export interface MessageObject {
    codigo: string;
    mensaje: string;
    status: number;
}

export interface ExtendedMessageObject extends MessageObject {
    detalles?: any
}

export interface Resultado {
    [key: string]: any;
}