class Usuario {

    constructor(user,mail,pass){
        this.user = user;
        this.pass = pass;
        this.mail = mail;
        this.activado = true ;
    }

    mensajeBienvenida(){

        alert("Bienvenido "+this.user+ "\n"+"Su email es "+this.mail + "\n");

    }

    desactivar(){

        this.activado = false;

    }
}