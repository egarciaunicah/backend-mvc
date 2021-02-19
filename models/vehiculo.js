var Vehiculo = function(id, color, marca, modelo){
    this.id = id;
    this.color = color;
    this.marca = marca;
    this.modelo = modelo
}

//Arreglo de vehiculos
Vehiculo.allVehiculos = [];

//Metodo para agregar vehiculos al arreglo

Vehiculo.add = function (aVehi){
    Vehiculo.allVehiculos.push(aVehi);
}

Vehiculo.RemoveById = function(aVehi){
    for(var i=0; i<Vehiculo.allVehiculos.length; i++){
        if(Vehiculo.allVehiculos[i].id == aVehi){
            Vehiculo.allVehiculos.splice(i,1);
            break;
        }
    }
}

Vehiculo.findById = function(aVehi){
    var aVehi = Vehiculo.allVehiculos.find(x => x.id == aVehi);

    if(aVehi)
        return aVehi
    else
        throw new Error(`No existe el vehiculo con el id ${aVehi}`)
}



var a = new Vehiculo(1, 'Negro', 'Ford', 'Escape');
var b = new Vehiculo(2, 'Gris', 'Nisssan', 'Sentra');

Vehiculo.add(a);
Vehiculo.add(b);

module.exports = Vehiculo;

