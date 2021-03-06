var newCardButton = document.querySelector(".add-card")
var areaCards = document.querySelector(".area-cards")
var rootEditArea = document.querySelector(".root-edit")

newCardButton.addEventListener("click", ()=>{
    criarPaginaEdit()

    var botaoSalvar = document.querySelector(".save-button")
    botaoSalvar.addEventListener("click", function(event){
    event.preventDefault()
    criarCard()
    fecharCardEdit()
    })
})

function criarPaginaEdit(){
    var pageEdit = document.createElement('div')
    var editConteudo = 
        `<div class="card-edit">
            <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
            <form>
                <div class="campo1">
                    <div><label>PARCEL ID:</label><input name="parcelid" type="text"></div>
                    <div><img src='' id="cachesateliteimg" style='display:none;'><label>GIS IMAGE</label><label class="up-icon" for="imagem-satelite"><i class="fas fa-arrow-circle-up"></i></label><input onchange="preview_image('imagem-satelite')" id="imagem-satelite" type="file" accept=".jpg, .png, .pdf, .jpeg, .bmp"></div>
                    <div><img src='' id="cachefloodzoneimg" style='display:none;'><label>FLOODZONE IMAGE:</label><label class="up-icon" for="imagem-floodzone"><i class="fas fa-arrow-circle-up"></i></label><input onchange="preview_image('imagem-floodzone')" id="imagem-floodzone" type="file" accept=".jpg, .png, .pdf, .jpeg, .bmp"></div>
                    <div><img src='' id="cachemapsimg" style='display:none;'><label>MAPS IMAGE:</label><label class="up-icon" for="imagem-maps"><i class="fas fa-arrow-circle-up"></i></label><input onchange="preview_image('imagem-maps')" id="imagem-maps" type="file" accept=".jpg, .png, .pdf, .jpeg, .bmp"></div>
                    <div><img src='' id="cachestreetviewimg" style='display:none;'><label>STREETVIEW IMAGE:</label><label class="up-icon" for="imagem-streetview"><i class="fas fa-arrow-circle-up"></i></label><input onchange="preview_image('imagem-streetview')" id="imagem-streetview" type="file" accept=".jpg, .png, .pdf, .jpeg, .bmp"></div>
                    <div><label>TAX VALUE:</label><input name="taxowned" type="text"></div>
                    <div><label>LAND VALUE:</label><input name="marketvalue" type="text"></div>
                </div>
                <div class="campo2">
                    <div><label>LOT SIZE:</label><input name="acres" type="text"></div>
                    <div><label>GIS LINK:</label><input name="linkgis" type="text"></div>
                    <div><label>FLOODZONE:</label><input name="floodzone" type="text"></div>
                    <div><label>MAPS LINK:</label><input name="mapslink" type="text"></div>
                    <div><label>LATITUDE:</label><input name="latitude" type="text"></div>
                    <div><label>LONGITUDE:</label><input name="longitude" type="text"></div>
                    <div><label>ADDRESS:</label><input name="end" type="text"></div>
                </div>
                <div class="campo3">
                    <div><label>ZESTIMATE:</label><input name="zestimate" type="text"></div>
                    <div><label>ZILLOW/REALTOR LINK:</label><input name="zillow" type="text"></div>
                    <div><label>FLOODZONE LINK:</label><input name="floodzonelink" type="text"></div>
                    <div><label>NEIGHBOOR 1 NAME:</label><input name="n1name" type="text"></div>
                    <div><label>NEIGHBOOR 2 NAME:</label><input name="n2name" type="text"></div>
                    <div><label>NEIGHBOOR 3 NAME:</label><input name="n3name" type="text"></div>
                    <div><label>NEIGHBOOR 4 NAME:</label><input name="n4name" type="text"></div>
                </div>
            
                <div class="campo4">
                    
                    <div><label>WATER SUPPLY:</label><select name="watersupply"><option value="">--</option><option value="YES">YES</option><option value="NO">NO</option><option value="undefined">UNDEFINED</option></select></div>
                    <div><label>ELECTRICITY SUPPLY:</label><select name="elecsupply"><option value="">--</option><option value="YES">YES</option><option value="NO">NO</option><option value="undefined">UNDEFINED</option></select></div>
                    <div><label>SEWERAGE:</label><select name="sewerage"><option value="">--</option><option value="YES">YES</option><option value="NO">NO</option><option value="undefined">UNDEFINED</option></select></div>
                    <div><label>NEIGHBOOR 1 ADDRESS:</label><input name="end1" type="text"></div>
                    <div><label>NEIGHBOOR 2 ADDRESS:</label><input name="end2" type="text"></div>
                    <div><label>NEIGHBOOR 3 ADDRESS:</label><input name="end3" type="text"></div>
                    <div><label>NEIGHBOOR 4 ADDRESS:</label><input name="end4" type="text"></div>
                    
                    
                </div>

                <div class="campo5">
                    <div><label>HOA:</label><input name="hoa" type="text"></div>  
                    <div><label>RANK:</label><select name="rank"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="HOUSE">HOUSE(B CASA)</option></select></div>
                    <div><label>OBS:</label><input name="obs" type="text"></div>
                    <div><label>MINIMAL BID:</label><input name="minimalbid" type="text"></div>
                    
                    <div><button class="save-button">SAVE</button></div>
                </div>
            </form>
        </div>
    ` 
    //<div><label>RANK:</label><input name="rank" type="text"></div>
    pageEdit.innerHTML = editConteudo
    rootEditArea.append(pageEdit)
}

function criarCard(){
    var form = document.querySelector("form")
    var floodzoneImg = document.querySelectorAll("#imagem-floodzone")[0]
    var mapsImg = document.querySelectorAll("#imagem-maps")[0]
    var streetviewImg = document.querySelectorAll("#imagem-streetview")[0]
    var sateliteImg = document.querySelectorAll("#imagem-satelite")[0]
    var novoCard = document.createElement("div")
    
    novoCard.innerHTML = `
    <div class="card" style="background-image: url('./img/antique-texture.jpg');">
        <div class="options">
            <button class="send" onclick="postJson(this.parentElement.parentElement)"><i class="fas fa-share"></i></button>   
            <button class="edit" onclick="editarCard(this.parentElement.parentElement)"><i class="fas fa-pen-square"></i></button>
            <button class="house-edit" onclick="editarHouse(this.parentElement.parentElement)"><i class="fas fa-home"></i></button>
            <button class="neigh-edit" onclick="editarNeighboorInfo(this.parentElement.parentElement)"><i class="fas fa-at"></i></button>  
            <button class="exclude" onclick="excluirCard(this.parentElement.parentElement)"><i class="fas fa-trash"></i></i></button>
              
        </div>
        <div class="infos">
            <div class="info-card info-text"><h2>PARCEL ID:</h2> <h2>${formatStringPlus(checkValue(form.parcelid.value))}</h2></div>
            <div class="info-card info-img"><h2>GIS IMAGE:</h2> <img src="${checkFile(sateliteImg)}"></img></div>
            <div class="info-card info-text"><h2>LINK GIS:</h2> <h2>${formatString(checkValue(form.linkgis.value))}</h2></div>
            <div class="info-card info-img"><h2>FLOODZONE IMAGE:</h2> <img src="${checkFile(floodzoneImg)}"></img></div>
            <div class="info-card info-text"><h2>FLOODZONE:</h2> <h2>${formatString(checkValue(form.floodzone.value))}</h2></div>
            <div class="info-card info-img"><h2>MAPS IMAGE:</h2> <img src="${checkFile(mapsImg)}"></div>
            <div class="info-card info-text"><h2>MAPS LINK:</h2> <h2>${formatString(checkValue(form.mapslink.value))}</h2></div>
            <div class="info-card info-img"><h2>STREETVIEW IMAGE</h2> <img src="${checkFile(streetviewImg)}"></div>
            <div class="info-card info-text"><h2>TAX VALUE:</h2> <h2>${formatString(checkValue(form.taxowned.value))}</h2></div>
            <div class="info-card info-text"><h2>LAND VALUE</h2> <h2>${formatString(checkValue(form.marketvalue.value))}</h2></div>
            <div class="info-card info-text"><h2>LATITUDE:</h2> <h2>${formatString(checkValue(form.latitude.value))}</h2></div>
            <div class="info-card info-text"><h2>LONGITUDE:</h2> <h2>${formatString(checkValue(form.longitude.value))}</h2></div>
            <div class="info-card info-text"><h2>LOT SIZE:</h2> <h2>${formatString(checkValue(form.acres.value))}</h2></div>
            <div class="info-card info-text"><h2>ADDRESS:</h2> <h2>${formatString(checkValue(form.end.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 1 ADRESS:</h2> <h2>${formatString(checkValue(form.end1.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 2 ADRESS:</h2> <h2>${formatString(checkValue(form.end2.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 3 ADRESS:</h2> <h2>${formatString(checkValue(form.end3.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 4 ADRESS:</h2> <h2>${formatString(checkValue(form.end4.value))}</h2></div>
            <div class="info-card info-text"><h2>RANK:</h2> <h2>${formatString(checkValue(form.rank.value))}</h2></div>
            <div class="info-card info-text"><h2>OBS:</h2> <h2>${formatString(checkValue(form.obs.value))}</h2></div>
            <div class="info-card info-text"><h2>FLOODZONE LINK:</h2> <h2>${formatString(checkValue(form.floodzonelink.value))}</h2></div>
            <div class="info-card info-text"><h2>ZESTIMATE:</h2> <h2>${formatString(checkValue(form.zestimate.value))}</h2></div>
            <div class="info-card info-text"><h2>ZILLOW/REALTOR LINK:</h2> <h2>${formatString(checkValue(form.zillow.value))}</h2></div>
            <div class="info-card info-text"><h2>HOA:</h2> <h2>${formatString(checkValue(form.hoa.value))}</h2></div>
            <div class="info-card info-text"><h2>WATER SUPPLY:</h2> <h2>${formatString(checkValue(form.watersupply.value))}</h2></div>
            <div class="info-card info-text"><h2>ELECTRICITY SUPPLY:</h2> <h2>${formatString(checkValue(form.elecsupply.value))}</h2></div>
            <div class="info-card info-text"><h2>SEWERAGE:</h2> <h2>${formatString(checkValue(form.sewerage.value))}</h2></div>
            <div class="info-card info-text"><h2>MINIMAL BID:</h2> <h2>${formatString(checkValue(form.minimalbid.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 1 NAME:</h2> <h2>${formatString(checkValue(form.n1name.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 2 NAME:</h2> <h2>${formatString(checkValue(form.n2name.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 3 NAME:</h2> <h2>${formatString(checkValue(form.n3name.value))}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 4 NAME:</h2> <h2>${formatString(checkValue(form.n4name.value))}</h2></div>

            
        </div>

        <div class="infos">
            <div class="house-button" onclick="accordion(this.parentElement)"><i class="fas fa-home"></i></div>
            <div style="display: none;">
                <div class="info-card info-text"><h2>OWNER NAME:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>PROPSTREAM MARKET VALUE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>ESTIMATED ARV:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>GOOGLE MAPS DATE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>GOOGLE EARTH LINK:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>SHOWING BUILDING?:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>BUILDING SIZE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>YEAR BUILT:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>STRUCTURE TYPE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NUMBER OF BEDROOMS:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NUMBER OF BATHROOMS:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>GARAGE SIZE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>TAXES PER YEAR:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>CAD LAND VALUE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>CAD BUILDING VALUE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>CAD TOTAL VALUE:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NEED TO CONFIRM CONDITION:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>CAD INFO FROM GIS:</h2> <img src=""></img></div>
            </div>
        </div>

        <div class="infos">
            <div class="house-button at-button" onclick="accordion(this.parentElement)"><i class="fas fa-at"></i></div>
            <div style="display: none;">
                <div class="info-card info-text"><h2>NEIGHBOOR 1 EMAIL:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 1 NUMBER:</h2> <h2></h2></div>

                <div class="info-card info-text"><h2>NEIGHBOOR 2 EMAIL:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 2 NUMBER:</h2> <h2></h2></div>

                <div class="info-card info-text"><h2>NEIGHBOOR 3 EMAIL:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 3 NUMBER:</h2> <h2></h2></div>

                <div class="info-card info-text"><h2>NEIGHBOOR 4 EMAIL:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 4 NUMBER:</h2> <h2></h2></div>
            </div>
        </div>
    </div>  
    `
    areaCards.append(novoCard)
}








