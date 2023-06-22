var player = GetPlayer();
var employeeID = player.GetVar("employeeID");
var baseURI = player.GetVar("baseURI");
var gameId = player.GetVar("gameId");
var score = player.GetVar("score");
var parentGame = player.GetVar("parentGame");

// add time elapsed in Storyline for each interaction
// var timeElapsed = player.GetVar("timeElapsed");
var statementInit = baseURI + parentGame + "/" + gameId + "/" + employeeID;
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";


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
            name: employeeID
        }
    },
    verb: {
        id: 'http://activitystrea.ms/schema/1.0/play',
        display: {
            'en-US': 'Played'
        },
    },
    object: {
        objectType: 'Activity',
        id: statementInit,
        definition: {
            name: {
                'en-US': 'Played ' + gameId
            },
            extensions: {
                "http://crackerbarrel.com/xapi/storyline/arcade/metadata": {
                    gameId: gameId,
                    score: score
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
