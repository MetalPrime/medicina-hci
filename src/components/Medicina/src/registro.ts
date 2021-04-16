interface Registro{
    errores : number;
    tiempoRestante : number;
    aciertos : number;
    estadoPaciente : 'VIVO' | 'MUERTO' ;
}

export default Registro;