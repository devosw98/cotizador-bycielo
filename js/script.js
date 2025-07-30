// Espera a que todo el contenido del HTML se haya cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // 1. Seleccionar los elementos del DOM que vamos a necesitar
    const cotizadorForm = document.getElementById('cotizador-form');
    const precioMxnInput = document.getElementById('precio-mxn');
    const resultadoDiv = document.getElementById('resultado-final');
    const textoResultado = document.getElementById('texto-resultado');

    // 2. Escuchar el evento 'submit' del formulario
    cotizadorForm.addEventListener('submit', function(event) {
        // Prevenimos que la página se recargue al enviar el formulario
        event.preventDefault();

        // 3. Obtener y validar el valor del input
        const precioMxn = parseFloat(precioMxnInput.value);

        // Ocultamos el resultado anterior antes de un nuevo cálculo
        resultadoDiv.classList.add('hidden');

        // Validamos que el valor sea un número y sea mayor que cero
        if (isNaN(precioMxn) || precioMxn <= 0) {
            textoResultado.textContent = 'Por favor, ingresa un costo válido.';
            resultadoDiv.classList.remove('hidden'); // Mostramos el mensaje de error
            return; // Detenemos la ejecución si el valor no es válido
        }

        // 4. Realizar los cálculos según las reglas definidas
        
        // Paso 1: Obtener el costo del proveedor (50% del valor en MXN)
        const costoProveedor = precioMxn * 0.50;

        // Paso 2: Calcular la ganancia según el rango de precio
        let ganancia = 0;
        if (costoProveedor <= 100) {
            ganancia = 20;
        } else if (costoProveedor >= 101 && costoProveedor <= 150) {
            ganancia = 25;
        } else if (costoProveedor >= 151 && costoProveedor <= 300) {
            ganancia = 30;
        } else if (costoProveedor >= 301 && costoProveedor <= 1000) {
            ganancia = 50;
        } else { // Si es 1001 o más
            ganancia = 100;
        }

        // Paso 3: Calcular el precio final y redondearlo al entero más cercano
        const precioFinal = costoProveedor + ganancia;
        const precioRedondeado = Math.round(precioFinal);

        // 5. Mostrar el resultado en la pantalla
        // Usamos innerHTML para poder añadir etiquetas como <span> y <br>
        textoResultado.innerHTML = `El costo es de: <span class="precio-grande">Q ${precioRedondeado}.00</span>`;
        resultadoDiv.classList.remove('hidden'); // Mostramos el div de resultados
    });
});