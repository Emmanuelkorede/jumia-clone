const fakeUser = {
    email : 'test@gmail.com'
}
const loginButton = document.querySelector('.continue-button') ;
const notificationMessgae = document.getElementById('notification-message') ;

alert(`The login is  ${fakeUser.email}`) ;

function login() {
    const email = document.querySelector('.input').value ;

    if (email === fakeUser.email ) {
        document.body.innerHTML = `<p>loggin in...</p>` ;

        setTimeout(() => {
            window.location.href = "payment.html" ;
        },1000) ;
    } else {
        notificationMessgae.innerHTML =
         `Wrong email please use the login  ${fakeUser.email}` ;
    }
}
loginButton.addEventListener('click' , () => {
    login() ;
})