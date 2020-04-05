<?php
 
    include('../../Config/Config.php');

    $materia = new materias($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $materia->$proceso($_GET['materia']);
 
    print_r(json_encode($materia->respuesta));


    class materias{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($materia){

            $this->datos = json_decode($materia, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['codigo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo de la materia';

            }

            if ( empty( $this->datos['materia']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre de la materia';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_materia();
            }
            else{
                $this->modificarMateria();
            }


        }

        private function almacenar_materia(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas("INSERT INTO materias (codigo, materia) VALUES(
                        '". $this->datos['codigo'] ."',
                        '". $this->datos['materia'] ."'
                    )");

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarMateria($valor=''){
            $this->db->consultas('
            select materias.id_materia, materias.codigo, materias.materia
            from materias
            where materias.codigo like "%'.$valor.'%" or materias.materia like "%'.$valor.'%" 
        ');
            return $this->respuesta = $this->db->obtener_datos();
        }

        public function eliminarMateria($idMateria=''){
            $this->db->consultas("DELETE FROM materias WHERE id_materia ='".$idMateria."'");
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarMateria(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas("UPDATE materias SET ".
                        "codigo = '". $this->datos['codigo']."',".
                        "materia = '". $this->datos['materia']."'".
                        "WHERE id_materia = ". $this->datos['id_materia']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>