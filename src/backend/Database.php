<?php 
    class Database {
       
        public $connection = NULL;

        public function __construct() {
            $this->connect();
        }

        private function connect($params=NULL) {
            
            $dsn = "mysql:dbname=ticket;host=localhost";
            $pdo = NULL;
            
            try {
               
               $pdo = new PDO($dsn, "root", "", $params);

            } catch (PDOException $e) {
                
                $log = fopen("error.txt", "a");
                fwrite($log, $e->getMessage()."\n");
                fclose($log);

            }

            $this->connection = $pdo;
        }

        public function ingresarTicket($ticket) {
           
            $this->connect( array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') );
            $pdo = $this->connection;
            if( $pdo == NULL ) return;

            $query = "INSERT INTO ticket(estado, prioridad,".
                     "categoria,asunto,descripcion) ".
                     "VALUES(?,?,?,?,?)";

            $stmt = $pdo->prepare( $query );

            $new = array( $ticket["estado"], 
                          $ticket["prioridad"],
                          $ticket["categoria"],
                          $ticket["asunto"],
                          $ticket["descripcion"] );

            $n = $stmt->execute( $new );

            if($n == 1) return TRUE;
            return FALSE;
        }

        public function actualizarTicket($ticket) {

            $this->connect( array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') );
            $pdo = $this->connection;
            if( $pdo == NULL ) return;

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

        public function ingresarUsuario( $usuario ) {
           
            //Si falta un campo, se cancela el ingreso del usuario.
            if( !isset($usuario["nombre_usuario"]) || !isset($usuario["nombres"]) 
                || !isset($usuario["apellidos"])   || !isset($usuario["rut"]) 
                || !isset($usuario["direccion"])   || !isset($usuario["comuna"])
                || !isset($usuario["region"])      || !isset($usuario["mail"])
                || !isset($usuario["password"]) ) return;

            //Si cualquiera de los campos está vacio, se cancela el ingreso del usuario.
            if( strlen($usuario["nombre_usuario"]) > 0 )
               $new_user[0] = $usuario["nombre_usuario"];
            else return;
            
            if( strlen($usuario["nombres"]) > 0 )
               $new_user[1] = $usuario["nombres"];
            else return;
            
            if( strlen($usuario["apellidos"]) > 0 )
               $new_user[2] = $usuario["apellidos"];
            else return;
            
            if( strlen($usuario["rut"]) > 0 )
               $new_user[3] = $usuario["rut"];
            else return;
            
            if( strlen($usuario["direccion"]) > 0 )
               $new_user[4] = $usuario["direccion"];
            else return;
            
            if( strlen($usuario["comuna"]) > 0 )
               $new_user[5] = $usuario["comuna"];
            else return;
            
            if( strlen($usuario["region"]) > 0 )
               $new_user[6] = $usuario["region"];
            else return;
            
            if( strlen($usuario["mail"]) > 0 )
               $new_user[7] = $usuario["mail"];
            else return;
            
            if( strlen($usuario["password"]) > 0 )
               $new_user[8] = password_hash($usuario["password"], PASSWORD_BCRYPT); 
            else return;
            
            $new_user[9] = 0;
            
            $this->connect( array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') );
            $pdo = $this->connection;
            if( $pdo == NULL ) return;

            $query = "INSERT INTO usuarios(nombre_usuario, nombres, apellidos,".
                     "rut, direccion, comuna, region, mail, password, rol)".
                     "VALUES(?,?,?,?,?,?,?,?,?,?)";
            $statement = $pdo->prepare( $query );
            $n = $statement->execute( $new_user );

            if($n == 1) return TRUE;
            return FALSE;
        }

        public function validarToken($token) {
            
            if( $this->connection == NULL )
               $this->connect();
            
            $pdo = $this->connection;
            if( $pdo == NULL ) return;

            $statement = $pdo->prepare("SELECT token, nombres, apellidos, rol FROM usuarios WHERE token=? LIMIT 1");
            $statement->execute( array($token) );

            $user = $statement->fetch();
            if( $user != NULL ) {
                return $user;
            }

        }

    }