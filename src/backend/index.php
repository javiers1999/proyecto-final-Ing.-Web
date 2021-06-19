<?php

include("Database.php");

$db = new Database();
if( $db->connection == NULL ) exit(0);
$con = $db->connection;

$user = NULL;

session_start();
if( isset($_SESSION["token"]) )
   $user = $db->validarToken($_SESSION["token"]);
    
switch( $_SERVER["REQUEST_METHOD"] ) {

    case "PUT":

        if( !isset($user["rol"]) ) return;
        
        // Actualizar ticket si el rol es de administrador
        if( $user["rol"] == 1 ) {
            
            $ticket = json_decode( file_get_contents("php://input"), TRUE );
            if( $ticket != NULL ) {

                if( !$db->actualizarTicket($ticket) ) {
                    header("HTTP/1.1 500 Internal Server Error");
                }

            }

        } else {

            header("HTTP/1.1 401 Unauthorized");

        }
        break;

    case "DELETE":

        if( !isset($user["rol"]) ) return;
        // Borrar ticket si el rol es de administrador
        if( $user["rol"] == 1 ) {
            
            $ticket = json_decode( file_get_contents("php://input"), TRUE );
        
            if( $ticket != NULL ) {
                if( isset($ticket["id"]) ) {
                    $n = $con->execute("DELETE FROM ticket WHERE id=".$ticket["id"]);

                    if( $n == False ) {

                        header("HTTP/1.1 500 Internal Server Error");

                    }

                }
            }

        } else {

            header("HTTP/1.1 401 Unauthorized");

        }
        break;
    
    case "GET":
        
        // Cerrar Sesion
        if( isset($_GET["logout"]) ) {

            if( $user == NULL ) return;

            $con->exec("UPDATE usuarios SET token='' WHERE token='".$user["token"]."' ");
            session_destroy();

            break;
        }

        // Obtener Tickets
        $json_username = "";
        if( isset($_SESSION["token"]) ) {

            if( $user != NULL ) {
               $json_username = utf8_encode($user["nombres"]." ".$user["apellidos"]);
            }

        }
        
        $result = $con->query("SELECT * FROM ticket");
        $tickets = $result->fetchAll();
        
        $json_tickets = array();
        foreach( $tickets as $ticket ) {

            $t["id"]          = $ticket["id"];
            $t["estado"]      = $ticket["estado"];
            $t["prioridad"]   = $ticket["prioridad"];
            $t["categoria"]   = $ticket["categoria"];
            $t["asunto"]      = utf8_encode($ticket["asunto"]);
            $t["descripcion"] = utf8_encode($ticket["descripcion"]);
            $t["respuesta"]   = utf8_encode($ticket["respuesta"]);

            array_push( $json_tickets, $t );
        }
        
        $json["username"] = $json_username;
        $json["tickets"]  = $json_tickets;
        echo json_encode( $json, JSON_UNESCAPED_UNICODE );
        break;

    case "POST":

        if( $user == NULL ) {
            
            // Inicio de sesion
            if( isset($_POST["nombre_usuario"]) && isset($_POST["password"]) ) {
                
             
                $stmt = $con->prepare("SELECT password FROM usuarios WHERE nombre_usuario=?");
                $res = $stmt->execute( array($_POST["nombre_usuario"]) );
                
                $user = $stmt->fetch();
                if( $user != NULL ) {
                    
                    if( password_verify($_POST["password"], $user["password"]) ) {
                        $token = sha1( random_bytes(12) );
                        
                        $up = $con->exec("UPDATE usuarios SET token='$token' WHERE password='".$user["password"]."'");
                        
                        if( $up == 1 ) {

                            $_SESSION["token"] = $token;

                        } else {

                            header("HTTP/1.1 500 Internal Server Error");

                        }

                    } else {

                        header("HTTP/1.1 401 Unauthorized");

                    }

                } else {

                    header("HTTP/1.1 401 Unauthorized");

                }

            }

            // Registro de nuevo usuario
            else {
                
               $new_user = json_decode( file_get_contents("php://input"), TRUE );
               if( isset($new_user["nombre_usuario"]) ) {
                    
                  if( !$db->ingresarUsuario($new_user) ) {

                     header("HTTP/1.1 500 Internal Server Error");

                  } else {

                     header("HTTP/1.1 201 Created");

                  }
                  
               }
            }
        }

        // Crear ticket si el rol es de usuario
        else if( $user["rol"] == 0 ) {
            
            $ticket = json_decode( file_get_contents("php://input"), TRUE );
            if( $ticket != NULL ) {
                
               if( !$db->ingresarTicket($ticket) ) {

                 header("HTTP/1.1 500 Internal Server Error");

               } else {

                 header("HTTP/1.1 201 Created");

               }
            }

        }

}

?>