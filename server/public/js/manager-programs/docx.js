//using docx library via script tag
async function runDocx(element){
    console.log(element)
    var parcelid = element.children[0].children[0].children[1].innerHTML
    var adress = element.children[1].children[0].children[1].children[1].children[1].innerHTML
    var n1 =  element.children[1].children[0].children[2].children[0].children[1].innerHTML
    var n2 =  element.children[1].children[0].children[2].children[1].children[1].innerHTML
    var n3 =  element.children[1].children[0].children[2].children[2].children[1].innerHTML
    var n4 =  element.children[1].children[0].children[2].children[3].children[1].innerHTML
    var taxValue = element.children[1].children[0].children[0].children[1].children[1].innerHTML
    var b64GISImage = element.children[0].children[1].children[0].children[1].src
    

    neighboorArr = [n1, n2, n3, n4]
    generateEnvelope(adress, parcelid)
    for (let i = 0; i < neighboorArr.length; i++) {
        neighboorIndex = neighboorArr[i]
        if(neighboorIndex.length > 1){
            generateLetter(neighboorIndex, parcelid, taxValue, b64GISImage, i)
        }
    }
    
}

async function generateLetter(adress, parcelid, taxValue, image, index){
    //let img = new Image()
    //img.src = image

    const doc = new docx.Document({
        sections: [
            {
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `Dear,` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `Located at ${adress}` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `We’re the Jacobers and a few months ago, I acquired the property ${parcelid} next door with the intention of one day building my beautiful dream home. My wife and I  loved the area so much for its landscape, trails, peacefulness, and everything else it  has to offer. We 
                                also saw in it an opportunity for a very good investment, since many other people are looking to settle here exactly for the same reasons that made us love the place  so much. 
                                Unfortunately, we have changed our plans and we’re planning to put our property on the market for sale given that the land market is really hot, and we won’t have  problems finding a buyer; however, we would like to offer YOU the opportunity to buy  it before we put it online. You see, I for one care who will eventually move next to me  and that is why I consider it’s just right to offer the property to you first. 
                                Besides, you might have plans to have a bigger backyard, enjoy a little more privacy, or just want to hold on to it for future appreciation. Anyways, I’m sure you’ll see in this  the same great opportunity as I once have. 
                                If you are interested in buying it, please let me know as we’re planning to list this property in the upcoming weeks. We’re open to your reasonable cash offer, or even  $${taxValue} down and payments as low as $97.00/month with no credit check. 
                                Please feel free to contact me through the email support@thelanddepot.com or text me a message on the phone (501) 451-4696, and I will call you back at your  convenience. 
                                Best Regards, 
                                Marcos Jacober.
                                ` 
                            })
                        ]
                    }),
                ],
            },
        ],
    })

    
    createDocument(doc, docx, parcelid, index, 'letter')
}


async function generateEnvelope(adress, parcelid){
    const doc = new docx.Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            orientation: docx.PageOrientation.PORTRAIT,
                            height: docx.convertMillimetersToTwip(198,25),
                            width: docx.convertMillimetersToTwip(456.25),
                        },
                    },
                },
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `MARCOS JACOBER` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `K-4 CALLE PETUNIA` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `SAN JUAN - 00927` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `\n\n\n\n${adress}` 
                            })
                        ]
                    }),   
                ]
            },
        ],
    })
    
    createDocument(doc, docx, parcelid, '1', 'envelope')
}

async function createDocument(doc, docx, parcelid, index, type){
    docx.Packer.toBlob(doc).then( blob => {
        saveAs(blob, `${parcelid}-${type}-${index}.docx`)
    })
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}





/**/