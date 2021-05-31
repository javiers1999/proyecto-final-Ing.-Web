<?php

include("Database.php");

session_start();

switch( $_SERVER["REQUEST_METHOD"] ) {

    case "CREATE":
    
        break;
    
    case "READ":

        break;

    case "UPDATE":

        break;

    case "DELETE":

        break;
    
    case "GET":
        
        $db = new Database();
        
        $query = "SELECT * FROM ticket";
        $result = $db->query($query);
        $tickets = $result->fetchAll();

        $json_tickets = array();

        foreach( $tickets as $ticket ) {

            $t["id"]          = $ticket["id"];        
            $t["estado"]      = $ticket["estado"];      
            $t["prioridad"]   = $ticket["prioridad"];   
            $t["categoria"]   = $ticket["categoria"];   
            $t["asunto"]      = $ticket["asunto"];      
            $t["descripcion"] = $ticket["descripcion"]; 

            array_push($json_tickets, $t);
        }

        echo json_encode($json_tickets);
        break;

    case "POST":



}

?>