// click handlers

const textLogin = document.querySelector(".text-login")
const textRegiter = document.querySelector(".text-regiter")

const y = document.querySelector("#regiter")
const x = document.querySelector("#login")


textRegiter.onclick = () => {
    x.style.left =  -100 + "%";
    y.style.right = 0 + "%";
}

textLogin.onclick = () => {
    x.style.left =  0 + "%";
    y.style.right = -100 + "%";
}
