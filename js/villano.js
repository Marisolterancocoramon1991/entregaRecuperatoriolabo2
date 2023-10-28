import Persona from "./persona.js";

class Villano extends Persona {
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinos) {
        super(id, nombre, apellido, edad);

        if (enemigo === null) {
            throw new Error('El campo "enemigo" no puede ser nulo.');
        }

        if (typeof robos !== 'number' || robos <= 0) {
            throw new Error('El campo "robos" debe ser un número entero mayor a cero.');
        }

        if (typeof asesinos !== 'number' || asesinos <= 0) {
            throw new Error('El campo "asesinos" debe ser un número mayor a cero.');
        }

        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinos = asesinos;
    }
}

export default Villano;
