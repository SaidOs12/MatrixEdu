// Variables globales
let steps = [];
let currentStep = 0;

// Función para mostrar el siguiente paso
function showNextStep() {
    if (currentStep < steps.length) {
        document.getElementById('output').textContent = steps[currentStep];
        currentStep++;
    } else {
        alert("Has alcanzado el último paso.");
    }
}

// Función para inicializar el proceso de pasos
function initializeSteps() {
    steps = [];
    currentStep = 0;
    document.getElementById('output').textContent = "";
}

// Obtener los valores de la matriz A y vector B
function getMatrixAndVector() {
    const form = document.getElementById('matrix-form');
    const A = [
        [parseFloat(form.a11.value), parseFloat(form.a12.value), parseFloat(form.a13.value)],
        [parseFloat(form.a21.value), parseFloat(form.a22.value), parseFloat(form.a23.value)],
        [parseFloat(form.a31.value), parseFloat(form.a32.value), parseFloat(form.a33.value)],
    ];
    const B = [
        parseFloat(form.b1.value),
        parseFloat(form.b2.value),
        parseFloat(form.b3.value),
    ];
    return { A, B };
}

// Método Gauss-Jordan
function solveGaussJordan() {
    initializeSteps();
    const { A, B } = getMatrixAndVector();

    // Paso 1: Formar la matriz aumentada
    let augmented = A.map((row, i) => [...row, B[i]]);
    steps.push("Matriz aumentada inicial:\n" + augmented.map(row => row.join(" ")).join("\n"));

    // Paso 2: Aplicar eliminación Gauss-Jordan
    for (let i = 0; i < 3; i++) {
        // Hacer el pivote 1
        const pivot = augmented[i][i];
        for (let j = 0; j < 4; j++) augmented[i][j] /= pivot;
        steps.push(`Fila ${i + 1} dividida por el pivote (${pivot}):\n` + augmented.map(row => row.join(" ")).join("\n"));

        // Hacer ceros en la columna del pivote
        for (let k = 0; k < 3; k++) {
            if (k !== i) {
                const factor = augmented[k][i];
                for (let j = 0; j < 4; j++) augmented[k][j] -= factor * augmented[i][j];
                steps.push(`Haciendo cero el elemento (${k + 1}, ${i + 1}):\n` + augmented.map(row => row.join(" ")).join("\n"));
            }
        }
    }

    // Paso 3: Extraer soluciones
    const solution = augmented.map(row => row[3]);
    steps.push("Solución final:\n" + solution.join("\n"));
    showNextStep();
}

// Método de Cramer
function solveCramer() {
    initializeSteps();
    const { A, B } = getMatrixAndVector();

    // Determinante de la matriz principal
    const determinant = (matrix) =>
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);

    const detA = determinant(A);
    steps.push(`Determinante de A: ${detA}`);

    if (detA === 0) {
        steps.push("El sistema no tiene solución única (determinante = 0).");
        showNextStep();
        return;
    }

    // Calcular determinantes de matrices modificadas
    const solutions = [];
    for (let i = 0; i < 3; i++) {
        const modifiedMatrix = A.map((row, rowIndex) => row.map((val, colIndex) => (colIndex === i ? B[rowIndex] : val)));
        const detModified = determinant(modifiedMatrix);
        steps.push(`Determinante de A reemplazando columna ${i + 1}: ${detModified}`);
        solutions.push(detModified / detA);
    }

    steps.push("Solución final:\n" + solutions.join("\n"));
    showNextStep();
}

function solveCrout() {
    initializeSteps();
    const { A, B } = getMatrixAndVector();

    // Inicializar matrices L y U
    let L = Array(3).fill(null).map(() => Array(3).fill(0));
    let U = Array(3).fill(null).map(() => Array(3).fill(0));

    // Crout: L tiene la diagonal y U tiene 1's en la diagonal
    for (let i = 0; i < 3; i++) U[i][i] = 1;

    for (let i = 0; i < 3; i++) {
        for (let j = i; j < 3; j++) {
            L[j][i] = A[j][i];
            for (let k = 0; k < i; k++) {
                L[j][i] -= L[j][k] * U[k][i];
            }
        }

        for (let j = i + 1; j < 3; j++) {
            U[i][j] = A[i][j];
            for (let k = 0; k < i; k++) {
                U[i][j] -= L[i][k] * U[k][j];
            }
            U[i][j] /= L[i][i];
        }
    }

    steps.push(`Matrices L y U formadas:\nL:\n${L.map(row => row.join(" ")).join("\n")}\nU:\n${U.map(row => row.join(" ")).join("\n")}`);

    // Resolución de Ly = B
    let y = Array(3).fill(0);
    for (let i = 0; i < 3; i++) {
        y[i] = B[i];
        for (let k = 0; k < i; k++) y[i] -= L[i][k] * y[k];
        y[i] /= L[i][i];
    }
    steps.push(`Resolviendo Ly = B:\ny = [${y.join(", ")}]`);

    // Resolución de Ux = y
    let x = Array(3).fill(0);
    for (let i = 2; i >= 0; i--) {
        x[i] = y[i];
        for (let k = i + 1; k < 3; k++) x[i] -= U[i][k] * x[k];
    }
    steps.push(`Resolviendo Ux = y:\nx = [${x.join(", ")}]`);

    showNextStep();
}

function solveDoolittle() {
    initializeSteps();
    const { A, B } = getMatrixAndVector();

    // Inicializar matrices L y U
    let L = Array(3).fill(null).map(() => Array(3).fill(0));
    let U = Array(3).fill(null).map(() => Array(3).fill(0));

    // Doolittle: U tiene la diagonal y L tiene 1's en la diagonal
    for (let i = 0; i < 3; i++) L[i][i] = 1;

    for (let i = 0; i < 3; i++) {
        for (let j = i; j < 3; j++) {
            U[i][j] = A[i][j];
            for (let k = 0; k < i; k++) {
                U[i][j] -= L[i][k] * U[k][j];
            }
        }

        for (let j = i + 1; j < 3; j++) {
            L[j][i] = A[j][i];
            for (let k = 0; k < i; k++) {
                L[j][i] -= L[j][k] * U[k][i];
            }
            L[j][i] /= U[i][i];
        }
    }

    steps.push(`Matrices L y U formadas:\nL:\n${L.map(row => row.join(" ")).join("\n")}\nU:\n${U.map(row => row.join(" ")).join("\n")}`);

    // Resolución de Ly = B
    let y = Array(3).fill(0);
    for (let i = 0; i < 3; i++) {
        y[i] = B[i];
        for (let k = 0; k < i; k++) y[i] -= L[i][k] * y[k];
    }
    steps.push(`Resolviendo Ly = B:\ny = [${y.join(", ")}]`);

    // Resolución de Ux = y
    let x = Array(3).fill(0);
    for (let i = 2; i >= 0; i--) {
        x[i] = y[i];
        for (let k = i + 1; k < 3; k++) x[i] -= U[i][k] * x[k];
        x[i] /= U[i][i];
    }
    steps.push(`Resolviendo Ux = y:\nx = [${x.join(", ")}]`);

    showNextStep();
}

function solveCholesky() {
    initializeSteps();
    const { A, B } = getMatrixAndVector();

    // Verificar si la matriz es simétrica
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (A[i][j] !== A[j][i]) {
                steps.push("La matriz no es simétrica. El método de Cholesky requiere una matriz simétrica definida positiva.");
                showNextStep();
                return;
            }
        }
    }

    // Inicializar matriz L
    let L = Array(3).fill(null).map(() => Array(3).fill(0));

    // Calcular L tal que A = L * L^T
    try {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j <= i; j++) {
                let sum = 0;
                for (let k = 0; k < j; k++) {
                    sum += L[i][k] * L[j][k];
                }

                if (i === j) {
                    if (A[i][i] - sum <= 0) {
                        steps.push("La matriz no es definida positiva. El método de Cholesky no puede aplicarse.");
                        showNextStep();
                        return;
                    }
                    L[i][j] = Math.sqrt(A[i][i] - sum);
                } else {
                    L[i][j] = (A[i][j] - sum) / L[j][j];
                }
            }
        }
    } catch (error) {
        steps.push("Error en el cálculo de la matriz L: " + error.message);
        showNextStep();
        return;
    }

    steps.push(`Matriz L formada:\n${L.map(row => row.join(" ")).join("\n")}`);

    // Resolución de Ly = B
    let y = Array(3).fill(0);
    for (let i = 0; i < 3; i++) {
        y[i] = B[i];
        for (let k = 0; k < i; k++) y[i] -= L[i][k] * y[k];
        y[i] /= L[i][i];
    }
    steps.push(`Resolviendo Ly = B:\ny = [${y.join(", ")}]`);

    // Resolución de L^T x = y
    let x = Array(3).fill(0);
    for (let i = 2; i >= 0; i--) {
        x[i] = y[i];
        for (let k = i + 1; k < 3; k++) x[i] -= L[k][i] * x[k];
        x[i] /= L[i][i];
    }
    steps.push(`Resolviendo L^T x = y:\nx = [${x.join(", ")}]`);

    showNextStep();
}


// Event listeners para los botones
document.getElementById('solve-gauss-jordan').addEventListener('click', solveGaussJordan);
document.getElementById('solve-cramer').addEventListener('click', solveCramer);
document.getElementById('step').addEventListener('click', showNextStep);
document.getElementById('solve-crout').addEventListener('click', solveCrout);
document.getElementById('solve-doolittle').addEventListener('click', solveDoolittle);
document.getElementById('solve-cholesky').addEventListener('click', solveCholesky);

