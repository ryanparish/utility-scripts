var player = GetPlayer();
var employeeID = player.GetVar("employeeID");
var baseURI = player.GetVar("baseURI");
var currentDoc = player.GetVar("currentDoc");
var language = player.GetVar("langauge");
var caStore = player.GetVar("caStore");
var timeStamp = player.GetVar("timeStamp");
var questionInit = baseURI + currentDoc + "/" + employeeID;
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";

// compiling custom question variables to send in statement



//set timeStamp to correct variable

// player.SetVar("ADR", timeStamp);
// player.SetVar("assetProtection", timeStamp);
// player.SetVar("cashierPolicy", timeStamp);
// player.SetVar("employeeAcknowledgementWageHour", timeStamp);
// player.SetVar("employeeAwareness", timeStamp);
// player.SetVar("handbookAcknowledgement", timeStamp);
// player.SetVar("harrassmentDiscrimination", timeStamp);
// player.SetVar("marketplaceNotice", timeStamp);
// player.SetVar("personalHygiene", timeStamp);
// player.SetVar("publicAccommodation", timeStamp);
// player.SetVar("socialMedia", timeStamp);
// player.SetVar("tipCreditNotice", timeStamp);





const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
        throw Error(response.status);
    } else {
        console.log(response);
        var statusCode = response.status;
        player.SetVar("statusCode", statusCode);
        return response.json()

    }
};
const statement = {
    actor: {
        objectType: 'Agent',
        account: {
            homePage: 'http://www.crackerbarrel.com',
            name: "'" + employeeID + "'",
        }
    },
    verb: {
        id: 'http://activitystrea.ms/schema/1.0/acknowledge',
        display: {
            'en-US': 'acknowledged',
        },
    },
    object: {
        objectType: 'Activity',
        id: questionInit,
        definition: {
            name: {
                'en-US': 'Acknowledged ' + currentDoc ,
            },
            extensions: {
                "http://crackerbarrel.com/xapi/compliance/requiredDocs/metadata": {
                    form: currentDoc,
                    timestamp: timeStamp,
                    language: language,
                    california: caStore 
                }

            }
        }
    }
};
const auth = 'Basic ' + btoa('9874dcee4886d0:5a5f229977e295');
const uri = 'https://watershedlrs.com/api/organizations/17583/lrs/statements';
fetch(uri, {
    method: 'POST',
    headers: {
        'X-Experience-API-Version': '1.0.3',
        'Content-Type': 'application/json',
        'Authorization': auth,
    },
    body: JSON.stringify(statement)
})
    .then(handleError)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        switch (error.message) {
            case '400':
                console.log('bad request');
                break;
            case '401':
                console.log('unauthorized');
                break;
            case '500':
                console.log('server error');
                break;
            default:
                console.log('unhandled');
                break;
        }
    });

