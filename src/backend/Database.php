<?php 
    class Database {

        public __construct() {
            return $this->connect();
        }

        private connect() {
            
            $dsn = "mysql:dbname=ticket;host=localhost";
            $pdo = NULL;

            try {

                $pdo = new PDO($dsn, "root", "");

            } catch (PDOException $e) {
                
                $log = fopen("error.txt", "a");
                fwrite($log, $e->getMessage());
                fclose($log);

            }

            return $pdo;

        }

        public ingresarTicket($ticket) {
            
            $pdo = $this->connect();

            $query = "INSERT INTO ticket(estado, prioridad,".
                     "categoria,asunto,descripcion,respuesta) ".
                     "VALUES(?,?,?,?,?,?)";

            $stmt = $pdo->prepare( $query );

            $new = array( $ticket["estado"], 
                          $ticket["prioridad"],
                          $ticket["categoria"],
                          $ticket["asunto"],
                          $ticket["descripcion"],
                          $ticket["respuesta"] );

            $n = $stmt->execute( $new );

            if($n == 1) return TRUE;
            return FALSE;
        }

        public actualizarTicket($ticket) {

            $pdo = $this->connect();

            $query = "UPDATE ticket SET estado=?,prioridad=?,categoria=?,".
                     "asunto=?, descripcion=?, respuesta=? WHERE id=".
                     $ticket["id"];
            
            $stmt = $pdo->prepare( $query );

            $updated = array( $ticket["estado"], 
                              $ticket["prioridad"],
                              $ticket["categoria"],
                              $ticket["asunto"],
                              $ticket["descripcion"],
                              $ticket["respuesta"] );

            $n = $stmt->execute( $updated );

            if($n == 1) return TRUE;
            return FALSE;
        }

        public validarToken($token) {
            
            $pdo = $this->connect();

            $statement = $pdo->prepare("SELECT token, nombre, rol FROM usuarios WHERE token=? LIMIT 1");
            $res = $statement->execute( array($token) );

            $user = $res->fetch();
            if( $user != NULL ) {
                return $user;
            }

        }

    }