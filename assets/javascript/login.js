const nameRegiter = document.querySelector(".name-regiter")
const password = document.querySelector(".password")
const passwordRetype = document.querySelector(".password-retype")

console.log(nameRegiter)

nameRegiter.onkeydown = () => {
    console.log(nameRegiter.value)
}