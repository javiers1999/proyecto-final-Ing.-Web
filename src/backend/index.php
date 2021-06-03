<?php

include("Database.php");
session_start();

switch( $_SERVER["REQUEST_METHOD"] ) {

    $db = new Database();
    $user = $db->validarToken($_SESSION["token"]);

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
                    $n = $db->execute("DELETE FROM ticket WHERE id=".$ticket["id"]);

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

            $db->execute("UPDATE usuarios SET token='' WHERE nombre='".$user["nombre"]."' ");
            session_destroy();

            return;

        }

        // Obtener Tickets
        $json_username = "";
        if( isset($_SESSION["token"]) ) {

            if( $user != NULL ) {
                $json_username = $user["nombres"]." ".$user["apellidos"];
            }

        }

        $result = $db->query("SELECT * FROM ticket");
        $tickets = $result->fetchAll();

        $json_tickets = array();
        foreach( $tickets as $ticket ) {

            $t["id"]          = $ticket["id"];
            $t["estado"]      = $ticket["estado"];
            $t["prioridad"]   = $ticket["prioridad"];
            $t["categoria"]   = $ticket["categoria"];
            $t["asunto"]      = $ticket["asunto"];
            $t["descripcion"] = $ticket["descripcion"];
            $t["respuesta"]   = $ticket["respuesta"];

            array_push( $json_tickets, $t );
        }

        echo json_encode( array("usuario" => $json_username, 
                                "tickets" => $json_tickets)  );
        break;

    case "POST":

        if( $user == NULL ) {
            
            // Inicio de sesion
            if( isset($_POST["nombre_usuario"]) && isset($_POST["password"]) ) {

                $stmt = $db->prepare("SELECT password FROM usuarios WHERE nombre_usuario=?");
                $res = $stmt->execute( array($_POST["nombre"]) );

                $user = $res->fetch();
                if( $user != NULL ) {
                    
                    if( password_verify($_POST["password"], $user["password"]) ) {
                        $token = sha1( random_bytes(12) );
                        
                        $up = $db->execute("UPDATE usuarios SET token=$token WHERE password='".$user["password"]."'");
                        
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
                if( $new_user != NULL ) {

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