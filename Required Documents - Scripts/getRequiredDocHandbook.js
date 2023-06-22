var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var employeeID = player.GetVar('employeeID');
var setupQuery = baseURI + "Handbook-Acknowledgement/" + employeeID;
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";



const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
        throw Error(response.status);
    } else {
        var statusCode = response.status;
        player.SetVar("statusCode", statusCode);
        return response.json()

    }
};
const auth = 'Basic ' + btoa('9874dcee4886d0:5a5f229977e295');
const uri = 'https://watershedlrs.com/api/organizations/17583/lrs/statements?activity=' + setupQuery;
fetch(uri, {
    method: 'GET',
    headers: {
        'X-Experience-API-Version': '1.0.3',
        'Content-Type': 'application/json',
        Authorization: auth,
    },
}
)
    .then(handleError)
    .then(data => {
        if (data.statements.length == 0) {
            console.log("empty statements");
            player.SetVar("handbookAcknowledgement", "none");
        } else {
            console.log(data);
            // process the data
            // retrieve answers
            // let ADR = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let assetProtection = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let cashierPolicy = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let employeeAcknowledgementWageHour = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let employeeAwareness = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            let handbookAcknowledgement = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let harrassmentDiscrimination = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let marketplaceNotice = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let personalHygiene = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let publicAccommodation = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let socialMedia = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let tipCreditNotice = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let language = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;
            // let california = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata"].timeStamp;

            // player.SetVar("ADR", ADR);
            // player.SetVar("assetProtection", assetProtection);
            // player.SetVar("cashierPolicy", cashierPolicy);
            // player.SetVar("employeeAcknowledgementWageHour", employeeAcknowledgementWageHour);
            // player.SetVar("employeeAwareness", employeeAwareness);
            player.SetVar("handbookAcknowledgement", handbookAcknowledgement);
            // player.SetVar("harrassmentDiscrimination", harrassmentDiscrimination);
            // player.SetVar("marketplaceNotice", marketplaceNotice);
            // player.SetVar("personalHygiene", personalHygiene);
            // player.SetVar("publicAccommodation", publicAccommodation);
            // player.SetVar("socialMedia", socialMedia);
            // player.SetVar("tipCreditNotice", tipCreditNotice);
            // player.SetVar("language", language);
            // player.SetVar("caStore", california);

            // set SL variables
            // set answer variables


        }
    })

    .catch(error => {
        switch (error.message) {
            case '401':
                console.log('validation or parsing error');
                break
            case '500':
                console.log('server error, try again')
                break
            default:
                console.log('unhandled')
                break
        }
    }); 