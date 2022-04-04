
const url="http://localhost:3000"

function start(){
    axios.get(url)
    .then(response => {console.log(JSON.stringify(response.data))})
    .catch(error => console.log(error))
}

function register(mail){
    axios.post(url, mail)
    .then(response => {console.log(JSON.stringify(response.data))})
    .catch(error => console.log(error))
}

function getEmails(dest){
    console.log(dest)
    axios.get(`${url}/mail`, { params: dest })
    .then(response => {
        console.log(response.data)
        var bode = document.getElementById('mostrar')
        let t = ``
        bode.innerHTML = `
        <div>
            ${response.data.map(x => {t += `
            <div>${JSON.stringify(x)}</div>
            `})}
            ${t}
            <input id="encid" name="encid" placeholder="mensagem id"></input>
            <input id="enc" name="enc" placeholder="novo destinatario"></input>
            <button onclick="encaminhar(enc.value, encid.value)">Enacaminhar</button>
        </div>
        `

        encaminhar = (D, I) => {
            let J = {}
            response.data.map(x => {if(I === x._id){J = x}})

            m = {
                "rem": J.dest,
                "dest": D,
                "ass": J.ass,
                "msg": J.msg
            }

            postEmail(m)
        }
    })
    .catch(error => console.log(error))
}

function postEmail(msg){
    axios.post(`${url}/mail`, msg)
    .then(response => {
        console.log(JSON.stringify(response.data))
    })
    .catch(error => console.log(error))
}

function deleteEmails(dest){
    axios.delete(`${url}/mail`, { params: dest })
    .then(response => {
        console.log(JSON.stringify(response.data))
    })
    .catch(error => console.log(error))
}

function inicio() {
    var bode = document.getElementById('mostrar')
    bode.innerHTML = `
    <div id="menu">
        <div onclick="seeMails()"><label>Ver emails</label></div>
        <div onclick="sendMail()"><label>Escrever email</label></div>
        <div onclick="deleteMails()"><label>Deletar emails</label></div>
    <div>
    `
    }

function deleteMails(){
    var bode = document.getElementById('mostrar')
    bode.innerHTML = `
    <div>
        <div><label>Email que terá mensagen removidas:</label></div>
        <div><input id="del"></input></div>
        <div><button onclick="deletar()">Deletar</button></div>
    </div>
    `

    let del = document.getElementById('del').value
    const D = {
        "dest": del
    }

    deletar = () => {
        deleteEmails(D)
    }
}

function seeMails(){
    var bode = document.getElementById('mostrar')
    bode.innerHTML = `
    <div>
        <div><label>Informe o usuário:</label></div>
        <div><input id="user"></input></div>
        <div><button onclick="buscar()">Buscar</button></div>
    </div>
    `

    buscar = () => {
        let user = document.getElementById('user').value
        const U = { "d" : user }

        getEmails(U)
    }
}

function sendMail(){
    var bode = document.getElementById('mostrar')
    bode.innerHTML = `
    <div>
        <div><input id="rem" placeholder="remetente"></input></div>
        <div><input id="dest" placeholder="destinatario"></input></div>
        <div><input id="ass" placeholder="assunto"></input></div>
        <div><textarea id="msg" placeholder="mensagem"></textarea></div>
        <div><button onclick="enviar()">enviar</button></div>
    </div>
    `

    enviar = () => {
        let rem = document.getElementById('rem').value
        let dest = document.getElementById('dest').value
        let ass = document.getElementById('ass').value
        let msg = document.getElementById('msg').value

        const M = {
            "rem": rem,
            "dest": dest,
            "ass": ass,
            "msg": msg
        }

        postEmail(M)
    }
}

function nome(){
    var bode = document.getElementById('mostrar')
    bode.innerHTML = `
    <div>
    </div>
    `
}