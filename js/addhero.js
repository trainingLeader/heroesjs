
let divDetails = document.querySelector('.body-detail');


document.querySelector('#addSuite').addEventListener('click', (e) => {
    divDetails.insertAdjacentHTML('beforeend',crearItemHTML());
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