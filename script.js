// Asignación de Eventos tras carga del DOM
document.getElementById('btn-calor').addEventListener('click', calcularTemperatura);
document.getElementById('btn-sorteo').addEventListener('click', calcularSorteo);

// --- EJERCICIO 1: ENFRIAMIENTO ---
function calcularTemperatura() {
    const t0 = parseFloat(document.getElementById('t0').value);
    const ts = parseFloat(document.getElementById('ts').value);
    const k = parseFloat(document.getElementById('k').value);
    const t = parseFloat(document.getElementById('t-tiempo').value);
    const contenedor = document.getElementById('result-calor');

    if (isNaN(t0) || isNaN(ts) || isNaN(k) || isNaN(t)) {
        mostrarError(contenedor, "Por favor, llene todos los campos obligatorios.");
        return;
    }

    // Fórmula: T = Ts + (T0 - Ts) * e^(-k * t)
    const tFinal = ts + (t0 - ts) * Math.exp(-k * t);
    const resultadoRedondeado = Math.round(tFinal);

    contenedor.className = "result-box";
    contenedor.innerHTML = `Temperatura Final Calculada: <span>${resultadoRedondeado} °C</span>`;
}

// --- EJERCICIO 2: COMBINACIONES ---
// Función factorial propia iterativa para evitar desbordamiento de pila
function calcularFactorial(num) {
    if (num === 0 || num === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= num; i++) {
        resultado *= i;
    }
    return resultado;
}

// Función para calcular combinación individual C(n, r)
function calcularCombinacion(n, r) {
    if (r > n) return 0;
    return calcularFactorial(n) / (calcularFactorial(r) * calcularFactorial(n - r));
}

function calcularSorteo() {
    const n1 = parseInt(document.getElementById('n1').value);
    const r1 = parseInt(document.getElementById('r1').value);
    const n2 = parseInt(document.getElementById('n2').value);
    const r2 = parseInt(document.getElementById('r2').value);
    const contenedor = document.getElementById('result-sorteo');

    // Validaciones lógicas obligatorias
    if (isNaN(n1) || isNaN(r1) || isNaN(n2) || isNaN(r2)) {
        mostrarError(contenedor, "Por favor, complete todos los campos.");
        return;
    }
    if (r1 > n1 || r2 > n2) {
        mostrarError(contenedor, "Error: El tamaño de la muestra (r) no puede ser mayor que el total del grupo (n).");
        return;
    }
    if (n1 < 0 || r1 < 0 || n2 < 0 || r2 < 0) {
        mostrarError(contenedor, "Error: Los números no pueden ser negativos.");
        return;
    }

    const combGrupo1 = calcularCombinacion(n1, r1);
    const combGrupo2 = calcularCombinacion(n2, r2);
    const totalCombinaciones = combGrupo1 * combGrupo2;

    contenedor.className = "result-box";
    contenedor.innerHTML = `
        Grupo 1 C(${n1},${r1}): ${combGrupo1.toLocaleString()}<br>
        Grupo 2 C(${n2},${r2}): ${combGrupo2.toLocaleString()}<br>
        <strong>Total Combinaciones: ${totalCombinaciones.toLocaleString()}</strong>
    `;
}

function mostrarError(elemento, mensaje) {
    elemento.className = "result-box error-box";
    elemento.innerText = mensaje;
}
