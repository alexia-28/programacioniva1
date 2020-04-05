<?php 
    include('../../Config/Config.php');
    $docentes = new docentes($conexion);
    
    $proceso = '';
    if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
        $proceso = $_GET['proceso'];
    }
    $docentes->$proceso( $_GET['docente'] );
    print_r(json_encode($docentes->respuesta));
    
    class docentes{
        private $datos = array(), $db;
        public $respuesta = ['msg'=>'correcto'];
        
        public function __construct($db){
            $this->db=$db;
        }
        public function recibirDatos($docentes){
            $this->datos = json_decode($docentes, true);
            $this->validar_datos();
        }
        private function validar_datos(){
            if( empty($this->datos['codigo']) ){
                $this->respuesta['msg'] = 'por favor ingrese el codigo del docente';
            }
            if( empty($this->datos['nombre']) ){
                $this->respuesta['msg'] = 'por favor ingrese el nombre del docente';
            }
            if( empty($this->datos['direccion']) ){
                $this->respuesta['msg'] = 'por favor ingrese la direccion del docente';
            }
            if( empty($this->datos['NIT']) ){
                $this->respuesta['msg'] = 'por favor ingrese el NIT del docente';
            }
            $this->almacenar_docentes();
        }
        private function almacenar_docentes(){
            if( $this->respuesta['msg']==='correcto' ){
                if( $this->datos['accion']==='nuevo' ){
                    $this->db->consultas('
                        INSERT INTO docentes (codigo,nombre,direccion,telefono, NIT) VALUES(
                            "'. $this->datos['codigo'] .'",
                            "'. $this->datos['nombre'] .'",
                            "'. $this->datos['direccion'] .'",
                            "'. $this->datos['telefono'] .'",
                            "'. $this->datos['NIT'] .'"
                        )
                    ');
                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                } else if( $this->datos['accion']==='modificar' ){
                    $this->db->consultas('
                       UPDATE docentes SET
                            codigo     = "'. $this->datos['codigo'] .'",
                            nombre     = "'. $this->datos['nombre'] .'",
                            direccion  = "'. $this->datos['direccion'] .'",
                            telefono   = "'. $this->datos['telefono'] .'",
                            NIT   = "'. $this->datos['NIT'] .'"
                        WHERE id_docentes = "'. $this->datos['id_docentes'] .'"
                    ');
                    $this->respuesta['msg'] = 'Registro actualizado correctamente';
                }
            }
        }
        public function buscarDocentes($valor=''){
            $this->db->consultas('
                select docentes.id_docentes, docentes.codigo, docentes.nombre, docentes.direccion, docentes.telefono, docentes.NIT
                from docentes
                where docentes.codigo like "%'.$valor.'%" or docentes.nombre like "%'.$valor.'%" or docentes.NIT like "%'.$valor.'%"
            ');
            return $this->respuesta = $this->db->obtener_datos();
        }
        public function eliminarDocente($iddocentes=''){
            $this->db->consultas('
                delete docentes
                from docentes
                where docentes.id_docentes = "'.$iddocentes.'"
            ');
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }
    }
?>