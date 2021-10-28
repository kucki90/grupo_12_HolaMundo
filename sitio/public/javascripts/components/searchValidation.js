const d = document;

export default function searchValidation(){
    d.addEventListener("submit" , e =>{
        // Si el buscador esta vacio, no se envia.
        d.querySelector('input[data-search="validation"]').value || e.preventDefault();
    })
}