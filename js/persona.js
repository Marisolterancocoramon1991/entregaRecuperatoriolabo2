class Persona {
    constructor(id, nombre, apellido, edad) {
        if (id === null || nombre === null || apellido === null || edad === null) {
            throw new Error('Ninguno de los atributos puede ser nulo.');
        }

        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

export default Persona;
