<?php

define("ROL_ADMIN", 0);
define("ROL_USER", 1);

include("Database.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, DELETE");

$db = new Database();
if( $db->connection == NULL ) exit(0);
$con = $db->connection;

$user = NULL;

session_start();
if( isset($_SESSION["token"]) )
   $user = $db->validarToken($_SESSION["token"]);

switch( $_SERVER["REQUEST_METHOD"] ) {

    case "PUT":

        if( $user == NULL ) return;
        
        // Actualizar ticket si el rol es de administrador
        if( $user["rol"] == ROL_ADMIN ) {
            
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
    
    case "GET":
        
        // Cerrar Sesion
        if( isset($_GET["logout"]) ) {

            if( $user == NULL ) return;

            $con->exec("UPDATE usuarios SET token='' WHERE token='".$user["token"]."' ");
            session_destroy();
            
            header("Location: /");
            break;
        
        // Obtener usuario
        } else if( isset($_GET["user"]) ) {
           
           if( $user != NULL ) {
              
              $json["nombre"] = utf8_encode($user["nombres"]." ".$user["apellidos"]);
              $json["rol"] = intval($user["rol"]);
              
              echo json_encode($json);
              
           }
           
           break;
        
        //Obtener Regiones y Comunas
        } else if( isset($_GET["regiones"]) ) {
            
            $query = $con->query("SELECT * FROM regiones ORDER BY nombre ASC");
            $regiones = $query->fetchAll();
            
            $json_regiones = array();
            foreach($regiones as $region) {
               $json_region["id"]     = $region["ID"];
               $json_region["nombre"] = utf8_encode($region["nombre"]);
               array_push($json_regiones, $json_region);
            }
            
            $query = $con->query("SELECT * FROM comunas ORDER BY nombre ASC");
            $comunas = $query->fetchAll();
            
            $json_comunas = array();
            foreach($comunas as $comuna) {
               $json_comuna["id"]     = $comuna["ID"];
               $json_comuna["nombre"] = utf8_encode($comuna["nombre"]);
               array_push($json_comunas, $json_comuna);
            }
            
            echo json_encode(array($json_regiones, $json_comunas));
            break;
            
        } else if( isset($_GET["info"]) ) {
            
            if( $user !== NULL ) {
               if( $user["rol"] == ROL_ADMIN ) {
                  $query = $con->query("SELECT COUNT(id) FROM ticket");
                  $res = $query->fetch();
                  
                  $tickets = $res[0];
                  
                  $query = $con->query("SELECT COUNT(rut) FROM usuarios");
                  $res = $query->fetch();
                  
                  $usuarios = $res[0];
                    
                  $json["tickets"]  = intval($tickets);
                  $json["usuarios"] = intval($usuarios);
                  
                  echo json_encode($json);
                  break;
               }
               
            }
            
        }

        // Obtener Tickets
        $json_user = NULL;
        if( isset($_SESSION["token"]) ) {

            if( $user != NULL ) {
               $json_user["rut"]            = intval($user["rut"]);
               $json_user["nombre_usuario"] = utf8_encode($user["nombre_usuario"]);
               $json_user["nombres"]        = utf8_encode($user["nombres"]);
               $json_user["apellidos"]      = utf8_encode($user["apellidos"]);
               $json_user["direccion"]      = utf8_encode($user["direccion"]);
               $json_user["mail"]           = utf8_encode($user["mail"]);
               $json_user["region"]         = intval($user["region"]);
               $json_user["comuna"]         = intval($user["comuna"]);
               $json_user["rol"]            = intval($user["rol"]);
            }

        }
        
        $result = $con->query("SELECT * FROM ticket");
        $tickets = $result->fetchAll();
        
        $json_tickets = array();
        foreach( $tickets as $ticket ) {

            $t["id"]          = intval($ticket["id"]);
            $t["estado"]      = intval($ticket["estado"]);
            $t["autor"]       = intval($ticket["autor"]);
            $t["prioridad"]   = intval($ticket["prioridad"]);
            $t["categoria"]   = intval($ticket["categoria"]);
            $t["asunto"]      = utf8_encode($ticket["asunto"]);
            $t["descripcion"] = utf8_encode($ticket["descripcion"]);
            $t["respuesta"]   = utf8_encode($ticket["respuesta"]);

            array_push( $json_tickets, $t );
        }
        
        $json = array($json_user, $json_tickets);
        echo json_encode( $json, JSON_UNESCAPED_UNICODE );
        break;

    case "POST":

        if( $user == NULL ) {
            
            // Inicio de sesion
            if( isset($_POST["nombre_usuario"]) && isset($_POST["password"]) ) {
                
                $stmt = $con->prepare("SELECT nombres, apellidos, rol, password FROM usuarios WHERE nombre_usuario=?");
                $res = $stmt->execute( array($_POST["nombre_usuario"]) );
                
                $user = $stmt->fetch();
                if( $user != NULL ) {
                    
                    if( password_verify($_POST["password"], $user["password"]) ) {
                        $token = sha1( random_bytes(12) );
                        
                        $up = $con->exec("UPDATE usuarios SET token='$token' WHERE password='".$user["password"]."'");
                        
                        if( $up == 1 ) {

                            $_SESSION["token"] = $token;
                            
                            $json["nombre"] = utf8_encode($user["nombres"]." ".$user["apellidos"]);
                            $json["rol"] = $user["rol"];
                            
                            echo json_encode($json);

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
                
               $new_user = json_decode(file_get_contents("php://input"), TRUE );
               if( isset($new_user["nombre_usuario"]) ) {
                   
                  $res = $db->ingresarUsuario($new_user);
                  if( $res == 1 ) {
                     
                     header("HTTP/1.1 201 Created");
                     

                  } else {
                     
                     header("HTTP/1.1 500 Internal Server Error");
                     echo $res;

                  }
                  
               }
               
            }
        }

        // Crear ticket si el rol es de usuario
        else if( $user["rol"] == ROL_USER ) {
            
            $ticket = json_decode( file_get_contents("php://input"), TRUE );
            if( $ticket != NULL ) {
               
               $res = $db->ingresarTicket($ticket); 
               if( $res == FALSE ) {

                 header("HTTP/1.1 500 Internal Server Error");

               } else {

                 header("HTTP/1.1 201 Created");
                 echo $res;
                 
               }
            }

        } else {
           
           header("HTTP/1.1 401 Unauthorized");
           
        }

}

?>