const d = document;

export default function searchValidation(form){
    const $form = d.querySelector(form)

    $form.addEventListener("submit" , e =>{
        // Si el buscador esta vacio, no se envia.
        $form.querySelector('input[data-search="validation"]').value || e.preventDefault();
    })
}