var todasclase = el => document.querySelectorAll(el),
id=el => document.getElementById(el),
clase= el => document.querySelector(el),
scrip= el => document.createElement(el);
 

let mostrar = todasclase(".mostrar");
for (let index = 0; index < mostrar.length; index++) {
    mostrar[index].addEventListener("click",mostrarmodulo);
    
}
function mostrarmodulo() {
    let modulo = this.dataset.modulo;
    console.log(modulo);
    fetch(`Public/Vistas/${modulo}/${modulo}.html`).then(res => res.text()).then(res=> {
        id(`vista-${modulo}`).innerHTML =res;
        clase(`.close-${modulo}`).addEventListener("click", e => {
            id(`vista-${modulo}`).innerHTML ="";
        })
        let js=scrip("script");
        js.src=`Public/Vistas/${modulo}/${modulo}.js`;
        clase("body").appendChild(js);

        
    })
    
}