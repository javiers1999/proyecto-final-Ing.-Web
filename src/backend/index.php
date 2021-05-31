<?php

include("Database.php");

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

            $t["id"]          = $ticket["id"];          //INT AUTOINCREMENT PRIMARY KEY
            $t["estado"]      = $ticket["estado"];      //TINYINT 
            $t["prioridad"]   = $ticket["prioridad"];   //TINYINT
            $t["categoria"]   = $ticket["categoria"];   //VARCHAR(255)
            $t["asunto"]      = $ticket["asunto"];      //VARCHAR(255)
            $t["descripcion"] = $ticket["descripcion"]; //VARCHAR(255)

            array_push($json_tickets, $t);
        }

        echo json_encode($json_tickets);
        break;

    case "POST":



}

?>