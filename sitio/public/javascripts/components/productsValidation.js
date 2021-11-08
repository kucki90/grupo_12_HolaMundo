const d = document;

export default function productsValidation(form) {
  // Selecciono todos los inputs/textarea que son requeridos
  const $inputs = d.querySelectorAll(`${form} [required]`);

  // Genero span dinámicamente para mostrar el error
  $inputs.forEach(i => {
    const $span = d.createElement('span');
    $span.id = i.name;
    $span.textContent = i.title;
    $span.classList.add("text-danger", "d-none");
    i.insertAdjacentElement("beforebegin", $span)
  })

  // Creo un evento a la escucha para el cambio de los valores del input
  d.addEventListener('keyup', e => {
    // Me fijo que input (required) saltó el evento
    if (e.target.matches(`${form} [required]`)) {
      // Guardo el input y el pattern, para el caso del textarea, el data-pattern
      const $input = e.target,
        pattern = new RegExp($input.pattern || $input.dataset.pattern);

      // Si el pattern no coincide con el valor se crean los errores, caso contrario se borran si estuviesen creados.
      if (!pattern.test($input.value)) {
        $input.classList.add('invalid')
        d.getElementById($input.name).classList.remove('d-none')
      }
      else {
        $input.classList.remove('invalid')
        d.getElementById($input.name).classList.add('d-none')
      }
    }
  })
}
/* function validarImagen(obj) { 
  let uploadFile = obj.files[0]; 
  if (!window.FileReader) {
     alert('El navegador no soporta la lectura de archivos');
      return; 
    }
     if (!(/\.(jpg|png|gif)$/i).test(uploadFile.name)) {
        alert('El archivo a adjuntar no es una imagen');
       } 
       else { 
         let img = new Image();
          img.onload = function () { 
            if (this.width.toFixed(0) != 200 && this.height.toFixed(0) != 200) { 
              alert('Las medidas deben ser: 200 * 200');
             } else if (uploadFile.size > 20000) { 
               alert('El peso de la imagen no puede exceder los 200kb') 
              } else { 
                alert('Imagen correcta :)') 
              } 
            }; 
            img.src = URL.createObjectURL(uploadFile); 
          }  
        }  */
 
