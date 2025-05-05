// Variables globales
let entradaActual = '';
let operacionPendiente = false;
let operadorActual = '';
let primerOperando = 0;
let expresionCompleta = '';

// Función para agregar números a la pantalla
function agregarNumero(numero) {
    if (operacionPendiente) {
        entradaActual = numero;
        operacionPendiente = false;
    } else {
        entradaActual += numero;
    }
    expresionCompleta = (primerOperando !== 0 ? primerOperando + ' ' + operadorActual + ' ' : '') + entradaActual;
    actualizarPantalla(expresionCompleta);
}

// Función para agregar punto decimal
function agregarDecimal() {
    if (entradaActual === '') {
        entradaActual = '0.';
    } else if (entradaActual.indexOf('.') === -1) {
        entradaActual += '.';
    }
    expresionCompleta = (primerOperando !== 0 ? primerOperando + ' ' + operadorActual + ' ' : '') + entradaActual;
    actualizarPantalla(expresionCompleta);
}

// Función para agregar operadores
function agregarOperador(operador) {
    if (entradaActual === '' && operador === '-') {
        entradaActual = '-';
        actualizarPantalla(entradaActual);
        return;
    }
    
    if (entradaActual !== '') {
        if (operadorActual !== '') {
            calcularResultado(false);
        }
        primerOperando = parseFloat(entradaActual);
        operadorActual = operador;
        operacionPendiente = true;
        expresionCompleta = primerOperando + ' ' + operadorActual;
        entradaActual = '';
        actualizarPantalla(expresionCompleta);
    }
}

// Función para limpiar la pantalla
function limpiarPantalla() {
    entradaActual = '';
    operadorActual = '';
    primerOperando = 0;
    operacionPendiente = false;
    expresionCompleta = '';
    actualizarPantalla('0');
}

// Función para calcular el resultado (con parámetro para mostrar solo resultado)
function calcularResultado(mostrarSoloResultado = true) {
    if (operadorActual === '' || entradaActual === '') {
        return;
    }
    
    const segundoOperando = parseFloat(entradaActual);
    let resultado = 0;
    
    if (operadorActual === '+') {
        resultado = primerOperando + segundoOperando;
    } else if (operadorActual === '-') {
        resultado = primerOperando - segundoOperando;
    } else if (operadorActual === '*') {
        resultado = primerOperando * segundoOperando;
    } else if (operadorActual === '/') {
        resultado = segundoOperando === 0 ? 'Error: División por cero' : primerOperando / segundoOperando;
    }
    
    if (mostrarSoloResultado) {
        expresionCompleta = resultado.toString();
    } else {
        expresionCompleta = primerOperando + ' ' + operadorActual + ' ' + segundoOperando;
    }
    
    entradaActual = resultado.toString();
    operadorActual = '';
    operacionPendiente = true;
    actualizarPantalla(expresionCompleta);
}

// Función para actualizar la pantalla
function actualizarPantalla(valor) {
    document.getElementById('resultado').value = valor;
}

// Inicializar la pantalla
actualizarPantalla('0');