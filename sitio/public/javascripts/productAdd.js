import productsValidation from "./components/productsValidation.js"

document.addEventListener("DOMContentLoaded", e =>{
  productsValidation(".formulario")
})


/* let inputImage = document.getElementById('imagen');


inputImage.addEventListener('change', function () {
  var preview = document.querySelector('#preview');

  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {


    var reader = new FileReader();
    preview.innerHTML = null;

    reader.addEventListener("load", function () {
      var image = new Image();
      image.height = 100;
      image.title = file.name;
      image.src = this.result;
      preview.appendChild(image);
    });

    reader.readAsDataURL(file);

  }
}) */