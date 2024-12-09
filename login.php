<?php
// login.php
session_start();

// Configuración de la base de datos
$host = "mysql-said121.alwaysdata.net";
$username = "said121_adminmat";
$password = "host98M";
$database = "said121_db_matrixedux";

// Función para validar el login
function validarLogin($conn, $identificacion, $password) {
    $identificacion = mysqli_real_escape_string($conn, $identificacion);
    $password = mysqli_real_escape_string($conn, $password);
    
    $query = "SELECT * FROM estudiantes WHERE identificacion = ? AND contraseña = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ss", $identificacion, $password);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if($row = mysqli_fetch_assoc($result)) {
        return $row;
    }
    return false;
}

$error = '';

// Procesar el formulario cuando se envía
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conectar a la base de datos
    $conn = mysqli_connect($host, $username, $password, $database);
    
    // Verificar la conexión
    if (!$conn) {
        $error = "Error de conexión: " . mysqli_connect_error();
    } else {
        $identificacion = $_POST['identificacion'];
        $pass = $_POST['password'];
        
        $estudiante = validarLogin($conn, $identificacion, $pass);
        if ($estudiante) {
            $_SESSION['estudiante'] = $estudiante;
            header("Location: dashboard.php");
            exit();
        } else {
            $error = "Identificación o contraseña incorrectos";
        }
        
        mysqli_close($conn);
    }
}