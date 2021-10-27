window.addEventListener('load',  () => {
    let formProfile = document.getElementById('form-profile');
    let inputPass = document.getElementById('input-pass');
    
    formProfile.addEventListener('submit', async e => {
      e.preventDefault();
        try {
            let response = await fetch('/api/verify-password',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    email: e.target.email.value,
                    password : e.target.password.value
                })
            })
            let result = await response.json();
            
            if(!result.response){
                alert('contraseña incorrecta!!')
            }else{
                formProfile.submit()
            }

        } catch (error) {
            console.log(error)
        }
      //inputPass.value && formProfile.submit();
    })

    
    let imgPreview = document.getElementById('img-preview');
    let avatar = document.getElementById('avatar');
    avatar.addEventListener('change', (e) => {
        // Creamos el objeto de la clase FileReader
        let reader = new FileReader();
              // Leemos el archivo subido y se lo pasamos a nuestro fileReader
              reader.readAsDataURL(e.target.files[0]);
              // Le decimos que cuando este listo ejecute el código interno
              reader.onload = function(){
                imgPreview.src = reader.result;
              };

    })

})