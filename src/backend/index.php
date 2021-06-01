<?php

include("Database.php");
session_start();

switch( $_SERVER["REQUEST_METHOD"] ) {

    $db = new Database();

    case "CREATE":
        $user = $db->validarToken($_SESSION["token"]);
        if( !isset($user["rol"]) ) return;

        if( $user["rol"] == 0 ) {
            $ticket = json_decode( file_get_contents("php://input"), TRUE );
            if( $ticket != NULL ) {
                
                if( !$db->ingresarTicket($ticket) ) {
                    header("HTTP/1.1 500 Internal Server Error");
                }
            }
        }

        break;

    case "UPDATE":

        $user = $db->validarToken($_SESSION["token"]);
        if( !isset($user["rol"]) ) return;

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
        
        $user = $db->validarToken($_SESSION["token"]);
        if( !isset($user["rol"]) ) return;
        
        if( $user["rol"] == 1 ) {
            
            $ticket = json_decode( file_get_contents("php://input"), TRUE );
        
            if( $ticket != NULL ) {
                if( isset($ticket["id"]) ) {
                    $db->execute("DELETE FROM ticket WHERE id=".$ticket["id"]);
                }
            }

        } else {

            header("HTTP/1.1 401 Unauthorized")

        }

        break;
    
    case "GET":
        
        if( isset($_GET["logout"]) ) {

            $user = $db->validarToken($_SESSION["token"]);
            if( $user == NULL ) return;

            $db->execute("UPDATE usuarios SET token='' WHERE nombre='".$user["nombre"]."'");
            session_destroy();

            return;
        }

        $json_user = "";
        if( isset($_SESSION["token"]) ) {
            $user = $db->validarToken($_SESSION["token"]);

            if( $user != NULL ) {
                $json_user = $user["nombre"];
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

            array_push($json_tickets, $t);
        }

        echo json_encode( array($json_user, $json_tickets) );
        break;

    case "POST":
        
        if( !isset($_SESSION["token"]) && isset($_POST["nombre"]) && isset($_POST["contrasena"]) ) {
            
            $stmt = $db->prepare("SELECT contrasena FROM usuarios WHERE nombre=?");
            $res = $stmt->execute( array($_POST["nombre"]) );

            $user = $res->fetch();
            if( $user != NULL ) {
                
                if( password_verify($_POST["contrasena"], $user["contrasena"]) ) {
                    $token = sha1( random_bytes(12) );
                    
                    $up = $db->execute("UPDATE usuarios SET token=$token WHERE nombre='".$_POST["nombre"]."'");
                    
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
}

?>