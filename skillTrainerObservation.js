const player = GetPlayer();
const employeeID = player.GetVar("employeeID");

//construct URI... base is: http://www.crackerbarrel.com/xapi/evaluation/par/rs/

const baseURI = player.GetVar("baseURI");
const selectedPosition = player.GetVar("selectedPosition");
const currentActivityID = player.GetVar("currentActivityID");
const ratingType = player.GetVar("ratingType");

const questionInit = baseURI + ratingType + "/" + selectedPosition + "/" + currentActivityID + "/" + employeeID;
const queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";



//get necessary rating data from Storyline

const currentActivity = player.GetVar("currentActivity");
const rating = player.GetVar("rating");
const name = player.GetVar("name");
const ratingNotes = player.GetVar("ratingNotes");
const ratingDate = player.GetVar("ratingDate");
const storeNum = player.GetVar("storeNum");
const skillTrainerID = player.GetVar("skillTrainerID");
const skillTrainerName = player.GetVar("skillTrainerName");



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
            name: `${employeeID}`,
        }
    },
    verb: {
        id: 'http://activitystrea.ms/schema/1.0/submit',
        display: {
            'en-US': 'submitted',
        },
    },
    object: {
        objectType: 'Activity',
        id: questionInit,
        definition: {
            name: {
                'en-US': 'Received ',
            },
            extensions: {
                "http://www.crackerbarrel.com/xapi/evaluation/metadata": {
                    currentActivity: currentActivity,
                    rating: rating,
                    ratingNotes: ratingNotes,
                    ratingDate: ratingDate,
                    storeNum: storeNum,
                    skillTrainerID: skillTrainerID,
                    skillTrainerName: skillTrainerName,
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

