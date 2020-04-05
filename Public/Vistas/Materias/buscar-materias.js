var appBuscarMateria = new Vue({

    el: "#frm-buscar-materias",
    data: {

        data_materias:[],
        valor:''

    },
    methods: {

        buscarMaterias: function () {
            
            fetch(`Private/Modulos/Materias/proceso.php?proceso=buscarMateria&materia=${this.valor}`).then( resp => resp.json() ).then( resp => {

                this.data_materias = resp;

            });

        },
        modificarMaterias: function (materias_data) {
            this.cerrarBuscarMaterias();
            appMateria.materias = materias_data;
            appMateria.materias.accion = 'modificar';
            console.log(JSON.stringify(materias_data));
            
        },
        verificacionEliminacion: function (idMateria) {
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarMateria.eliminarDocente(idMateria);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarDocente(id){
            console.log(id);
            
            fetch(`Private/Modulos/Materias/proceso.php?proceso=eliminarMateria&materia=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarMaterias();
            });
        },
        cerrarBuscarMaterias:function(){
            $(`#modulo-vista-materias`).html("");
            
        }

    },
    created: function () {
        this.buscarMaterias();
    }

})