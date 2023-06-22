var player = GetPlayer();
var employeeID = player.GetVar("employeeID");
var baseURI = player.GetVar("baseURI");
var questionInit = baseURI + "summary/" + employeeID;
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";

// compiling custom question variables to send in statement



//get all timeStamps 

var ADR = player.GetVar("ADR");
var assetProtection = player.GetVar("assetProtection");
var cashierPolicy = player.GetVar("cashierPolicy");
var employeeAcknowledgementWageHour = player.GetVar("employeeAcknowledgementWageHour");
var employeeAwareness = player.GetVar("employeeAwareness");
var handbookAcknowledgement = player.GetVar("handbookAcknowledgement");
var harrassmentDiscrimination = player.GetVar("harrassmentDiscrimination");
var marketplaceNotice = player.GetVar("marketplaceNotice");
var personalHygiene = player.GetVar("personalHygiene");
var publicAccommodation = player.GetVar("publicAccommodation");
var socialMedia = player.GetVar("socialMedia");
var tipCreditNotice = player.GetVar("tipCreditNotice");
var language = player.GetVar("language");
var california = player.GetVar("caStore");






const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
        throw Error(response.status);
        player.SetVar("summaryStatement", "Error");
    } else {
        console.log(response);
        var statusCode = response.status;
        player.SetVar("summaryStatement", "Sent");
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
                'en-US': 'Acknowledged all Required Documents',
            },
            extensions: {
                "http://crackerbarrel.com/xapi/evaluations/extensions": {
                    adaptabilityComments: adaptabilityComments,
                    adaptabilityRating: adaptabilityRating,
                    coachingTeachingComments: coachingTeachingComments,
                    coachingTeachingRating: coachingTeachingRating,
                    collaborationComments: collaborationComments,
                    collaborationRating: collaborationRating,
                    communicationComments: communicationComments,
                    communicationRating: communicationRating,
                    continuousLearningComments: communicationRating,
                    continuousLearningRating: continuousLearningRating,
                    decisionMakingComments: decisionMakingComments,
                    drivingExecutionComments: drivingExecutionComments,
                    drivingExecutionRating: drivingExecutionComments,
                    empGuestComments: empGuestComments,
                    empGuestRating: empGuestRating,
                    evalDate: evalDate,
                    evaluatorName: evaluatorName,
                    evaluatorStore: evaluatorStore,
                    mitClass: mitClass,
                    mitID: mitID,
                    mitName: mitName,
                    mitStore: mitStore,
                    overallRating: overallRating

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
