<?php
   session_start();
    date_default_timezone_set("America/Sao_Paulo");

   class Conexao{
   	  public static $conn;

        function __construct(){
            if (self::$conn == null)
               self::conectar();
        }

   		public function conectar()
   		{
            try{
               self::$conn = new PDO('mysql:host=localhost;dbname=final', 'root', '');
            }
   			catch(PDOException $e){
       			echo $e->getMessage();
            }
   		}

        public function executarComRetornoId(){
            $numparametros = func_num_args();

            $query = func_get_arg(0)." returning *";

            $stmt = self::$conn->prepare($query);
            if($numparametros == 2){
               $parametros = func_get_arg(1);
               if (!empty($parametros))
                  foreach ($parametros as $nome => $valor){
                     $stmt->bindValue($nome, $valor);
                  }
            }

            $stmt->execute();
	    
            $retorno = $stmt->fetchAll(PDO::FETCH_NUM);
            
            return $retorno[0][0];
        }
   		public function executar()
   		{
            $numparametros = func_num_args();

            if (self::$conn == null)
               self::conectar();

            $query = func_get_arg(0);

            $stmt = self::$conn->prepare($query);
            if($numparametros == 2){
               $parametros = func_get_arg(1);
               if (!empty($parametros))
                  foreach ($parametros as $nome => $valor){
                     $stmt->bindValue($nome, $valor);
                  }
            }

            return $stmt->execute();
   		}
   		public function consultar()
   		{

            $numparametros = func_num_args();

            if (self::$conn == null)
               self::conectar();

            $query = func_get_arg(0);

            $stmt = self::$conn->prepare($query);
            if($numparametros == 2){
               $parametros = func_get_arg(1);
               if (!empty($parametros))
                  foreach ($parametros as $nome => $valor){
                     $stmt->bindValue($nome, $valor);
                  }
            }

            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
         }
         
        
        public function consultarObjeto()
   		{
            $numparametros = func_num_args();

            if (self::$conn == null)
               self::conectar();

            $query = func_get_arg(0);
            $stmt = self::$conn->prepare($query);
            if($numparametros == 2){
               $parametros = func_get_arg(1);
               if (!empty($parametros))
                  foreach ($parametros as $nome => $valor){
                     $stmt->bindValue($nome, $valor);
                  }
            }

            $stmt->execute();
   			return $stmt->fetchAll(PDO::FETCH_CLASS);
         }
   }
?>
