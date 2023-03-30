const bannerPage = document.querySelector(".banner-page")
const bar = document.querySelector(".content-bar")
const header = document.querySelector(".header")




// Scroll cố định 
window.onscroll = () => {
    console.log(bar.offsetTop - window.scrollY)
    if ((bar.offsetTop - window.scrollY) <= 62 ) {
        bannerPage.style.position = "fixed"

    } 
    if ((bar.offsetTop - window.scrollY) > 62 ) {
        bannerPage.style.position = "static";
    }
}
