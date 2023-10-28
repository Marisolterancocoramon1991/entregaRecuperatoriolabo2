import Persona from "./persona.js";

class Heroe extends Persona {
    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado) {
        super(id, nombre, apellido, edad);


        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
}

export default Heroe;
