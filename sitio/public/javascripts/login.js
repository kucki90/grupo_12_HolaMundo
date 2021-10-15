import loginValidaciones from "./components/loginValidation.js"

const d = document 
//cuando se carga el documento
d.addEventListener("DOMContentLoaded",e=>{
    loginValidaciones(".form-reg")
    loginValidaciones(".form-log")
})

