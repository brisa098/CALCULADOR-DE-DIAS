const fs = require('fs');

let clientes = JSON.parse(fs.readFileSync('clientes.json', 'utf-8'));

function sumarDias(fecha, dias){
    let nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
}


let hoy = new Date();

clientes.forEach(cliente => {
    cliente.fechaVencimiento = sumarDias(hoy, 30);
    cliente.historial.push({
        tipo: "registro",
        fecha: cliente.fechaVencimiento.toISOString().split("T")[0]
    });
});


function registroPago(cliente){
    cliente.fechaVencimiento = sumarDias(cliente.fechaVencimiento, 30);
    cliente.historial.push({
        tipo: "pago",
        fecha: cliente.fechaVencimiento.toISOString().split("T")[0]
    });
}

registroPago(clientes[0]);
registroPago(clientes[0]);


fs.writeFileSync('clientes.json', JSON.stringify(clientes, null, 2));
