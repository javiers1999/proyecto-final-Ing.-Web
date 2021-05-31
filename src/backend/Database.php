<?php 
    class Database {

        public __construct() {

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

    }