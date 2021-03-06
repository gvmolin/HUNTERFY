function getUserJson(){
    var user = document.querySelector('#user').value
    var pass = document.querySelector('#pass').value
    var jsonModel = `{"user":"${user}", "pass":"${pass}"}`
    const UserPassJson = JSON.parse(jsonModel)
    return UserPassJson
}

async function checkUserPass(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        fetch('/login', options)
        
        const rawResponse = await fetch('/login', options)
        console.log(rawResponse.statusText)
        if(rawResponse.statusText == 'OK'){
            console.log('logado')
            window.location.replace('./manager');
        }
        else{
            alert('incorrect info')
        }
    }
    catch(error){
        console.log(error)
    }
}

document.querySelector(".login-button").addEventListener("click", (event) => {
    event.preventDefault()
    var userPassJson = getUserJson()
        checkUserPass(userPassJson)
})