//Variables
//Contenedor para los resultados
const resultado = document.querySelector("#resultado");

const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const precioMin = document.querySelector("#minimo");
const precioMax = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const max = new Date().getFullYear();
const min = 2000; //El año minimo de los autos

//Generar un objeto con la busqueda
const datosBusqueda = {
  marcaB: '',
  yearB: '',
  precioMinB: '',
  precioMaxB: '',
  puertasB: '',
  transmisionB: '',
  colorB: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
  //Muestra los autos al cargar
  mostrarAutos(autos)
  //Lena las opciones de año
  llenarSelectAnio();
});

//Event Listener para los select de búsqueda
marca.addEventListener('change', e => {
  datosBusqueda.marcaB = e.target.value;

  filtrarAuto();
});

year.addEventListener('change', e => {
  datosBusqueda.yearB = e.target.value;

  filtrarAuto();

});

precioMin.addEventListener('change', e => {
  datosBusqueda.precioMinB = e.target.value;

  filtrarAuto();

});

precioMax.addEventListener('change', e => {
  datosBusqueda.precioMaxB = e.target.value;

  filtrarAuto();

});

puertas.addEventListener('change', e => {
  datosBusqueda.puertasB = e.target.value;

  filtrarAuto();

});

transmision.addEventListener('change', e => {
  datosBusqueda.transmisionB = e.target.value;

  filtrarAuto();

});

color.addEventListener('change', e => {
  datosBusqueda.colorB = e.target.value;

  filtrarAuto();

  console.log(datosBusqueda);
});

//Funciones
const mostrarAutos = (autos) => {
  //Limpia el HTML previo
  limpiarHTML();

  autos.forEach(auto => {

    //Destructuring
    const { marca, modelo, year, color, puertas, transmision, precio } = auto;
    const autoHTML = document.createElement('P');

    autoHTML.textContent = `Marca: ${marca} ${modelo} | Año: ${year} | Color: ${color} | Puertas: ${puertas} | Trnasmisión: ${transmision} | Precio: U$S ${precio}`;

    //Insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}

//Limpiar HTML
const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}

//Genera los años del select
const llenarSelectAnio = () => {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('OPTION');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //Agrega las opciones de año al select
  }
}

//Funcion que filtra en base a la busqueda
const filtrarAuto = () => {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMin).filter(filtrarPrecioMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado)
  }
  else{
    sinResultados();
  }
}

const sinResultados = () =>{

  limpiarHTML();

  const div = document.createElement('DIV');
  div.classList.add('alerta', 'error');
  div.textContent = 'No se encontraron resultados con los filtros ingresados, vuelve a intentar con otros filtros';
  resultado.appendChild(div);
}

//Aplicar los filtros
const filtrarMarca = (auto) => {
  if (datosBusqueda.marcaB) {
    return auto.marca === datosBusqueda.marcaB;
  }
  return auto;
}

const filtrarYear = (auto) => {
  if (datosBusqueda.yearB) {
    return auto.year === parseInt(datosBusqueda.yearB);
  }
  return auto;
}

const filtrarPrecioMin = (auto) => {
  if (datosBusqueda.precioMinB) {
    return auto.precio >= parseInt(datosBusqueda.precioMinB);
  }
  return auto;
}

const filtrarPrecioMax = (auto) => {
  if (datosBusqueda.precioMaxB) {
    return auto.precio <= parseInt(datosBusqueda.precioMaxB);
  }
  return auto;
}

const filtrarPuertas = (auto) => {
  if (datosBusqueda.puertasB) {
    return auto.puertas === parseInt(datosBusqueda.puertasB);
  }
  return auto;
}

const filtrarTransmision = (auto) => {
  if (datosBusqueda.transmisionB) {
    return auto.transmision === datosBusqueda.transmisionB;
  }
  return auto;
}

const filtrarColor = (auto) => {
  if (datosBusqueda.colorB) {
    return auto.color === datosBusqueda.colorB;
  }
  return auto;
}