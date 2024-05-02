
let divDetails = document.querySelector('.body-detail');
const grpSuites = document.querySelector('#grpSuites');
const modelHero = {
    characterName:'',
    actorName:'',
    age:0,
    cityName:'',
    poster:'',
    dateAppears:'',
    suites:[],
    producer:{
    }
}

let characters =[];
let characterp = modelHero;

document.addEventListener('DOMContentLoaded', (e) => {
    clearFrm(true);
    characters = JSON.parse(localStorage.getItem('data'));
    grpSuites.style.display = 'none';
    console.log(characters);
});

document.querySelector('#addHero').addEventListener('click',(e) =>{
    const frmRegistro = document.querySelector('#frmDataHero');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const character = JSON.parse(JSON.stringify(datos));
    const {characterName,actorName,age,cityName,poster,dateAppears,producer:{}, ...resto} = character;
    characterp.characterName = characterName;
    characterp.actorName = actorName;
    characterp.age = age;
    characterp.cityName = cityName;
    characterp.poster = poster;
    characterp.dateAppears = dateAppears;
    characterp.producer.nameProducer = character.producer;
    
    if(characterp.producer.nameProducer == 'Marvel'){
        characterp.producer.logoProducer = 'marvel.png';
    }else{
        characterp.producer.logoProducer = 'dc.png';
    }
    Object.entries(resto).forEach(item =>{
        characterp.suites.unshift(item[1]);
    })
    characters.unshift(characterp);
    localStorage.setItem('data',JSON.stringify(characters));
});
document.querySelector('#addSuite').addEventListener('click', (e) => {
    divDetails.insertAdjacentHTML('beforeend',crearItemHTML());
});
document.querySelector('#newHero').addEventListener('click', (e) => {
    clearFrm(false);
    document.querySelector('#characterName').focus();
});
document.querySelector('#cancelHero').addEventListener('click', (e) => {
    clearFrm(true);
    grpSuites.style.display = 'none';
});

divDetails.addEventListener("click", (e)=>{
    let cja = document.getElementById(`suite${e.target.dataset.id}`);
    if(e.target.name == "btnRemove"){
            eliminarItemLista(e.target.dataset.id);
    }
})
const eliminarItemLista = (idIdx) =>{
    let suite = document.querySelector(`#suite${idIdx}`);
    suite.remove();
}

const crearItemHTML = () => {
    let id = Date.now().toString(16);
    let suiteHTML = /* html */ `
                <div class="row justify-content-md-center suites" id="suite${id}">
                    <div class="col col-lg-1">
                    </div>
                    <div class="col-10">
                        <div class="fieldSuit">
                            <div class="row">
                                <div class="col-11">
                                    <label for="suitName"
                                        class="form-label">Nombre
                                        traje</label>
                                    <input type="text" class="form-control"
                                        name="suitNameid${id}" id="suitNameid${id}">
                                </div>
                                <div class="col  position-relative">
                                    <button type="button" class="btn btn-danger position-absolute bottom-0 end-0" data-id="${id}" name="btnRemove">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-1">
                    </div>
                </div>
    `;
    return suiteHTML;
}
const clearFrm = (estado) =>{
    let frm={
        characterName:'',
        actorName:'',
        age:'',
        cityName:'',
        poster:'',
        dateAppears:'',
    }
        const frmRegistro = document.querySelector('#frmDataHero');
        let myFrm = new FormData();
        Object.entries(frm).forEach(([key, value]) => myFrm.append(key, value));
        myFrm.forEach((value, key) => {
             frmRegistro.elements[key].value= value;
             frmRegistro.elements[key].disabled = estado;
        });
        let producerItem = document.getElementsByTagName("select");
        Array.from(producerItem).forEach(item => {
            item.disabled = estado;
        })
        grpSuites.style.display = 'block';
        divDetails.innerHTML = '';
}
