function mostrarContrasena(){
    const iconEye =document.querySelector("#icon-eye");
    var tipo = document.getElementById("password");
    if(tipo.type == "password"){
        tipo.type = "text";
        iconEye.classList.remove("fa-eye-slash");
        iconEye.classList.add("fa-eye");
    }else{
        tipo.type = "password";
        iconEye.classList.add("fa-eye-slash");
        iconEye.classList.remove("fa-eye");
    }
}