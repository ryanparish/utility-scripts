var player = GetPlayer();
var employeeID = player.GetVar("employeeID");
var baseURI = player.GetVar("baseURI");
var playerNumber = player.GetVar("playerNumber");
var playerStart = baseURI + playerNumber;
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";

// compiling custom question variables to send in statement

// Question 1 Info

var cq1 = player.GetVar("cq1");
var cq1Opt1 = player.GetVar("cq1Opt1");
var cq1Opt2 = player.GetVar("cq1Opt2");
var cq1Opt3 = player.GetVar("cq1Opt3");
var cq1Opt4 = player.GetVar("cq1Opt4");
var ansQ1 = player.GetVar("ansQ1");

// Question 2 Info

var cq2 = player.GetVar("cq2");
var cq2Opt1 = player.GetVar("cq2Opt1");
var cq2Opt2 = player.GetVar("cq2Opt2");
var cq2Opt3 = player.GetVar("cq2Opt3");
var cq2Opt4 = player.GetVar("cq2Opt4");
var ansQ2 = player.GetVar("ansQ2");

// Question 3 Info

var cq3 = player.GetVar("cq3");
var cq3Opt1 = player.GetVar("cq3Opt1");
var cq3Opt2 = player.GetVar("cq3Opt2");
var cq3Opt3 = player.GetVar("cq3Opt3");
var cq3Opt4 = player.GetVar("cq3Opt4");
var ansQ3 = player.GetVar("ansQ3");

// Question 4 Info

var cq4 = player.GetVar("cq4");
var cq4Opt1 = player.GetVar("cq4Opt1");
var cq4Opt2 = player.GetVar("cq4Opt2");
var cq4Opt3 = player.GetVar("cq4Opt3");
var cq4Opt4 = player.GetVar("cq4Opt4");
var ansQ4 = player.GetVar("ansQ4");

// Question 5 Info

var cq5 = player.GetVar("cq5");
var cq5Opt1 = player.GetVar("cq5Opt1");
var cq5Opt2 = player.GetVar("cq5Opt2");
var cq5Opt3 = player.GetVar("cq5Opt3");
var cq5Opt4 = player.GetVar("cq5Opt4");
var ansQ5 = player.GetVar("ansQ5");




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
        id: 'http://adlnet.gov/expapi/verbs/shared',
        display: {
            'en-US': 'shared',
        },
    },
    object: {
        objectType: 'Activity',
        id: playerStart,
        definition: {
            name: {
                'en-US': 'Uploaded Questions',
            },
        extensions: {
            "http://crackerbarrel.com/xapi/storyline/avatarChallenge/data": {
            	answerQ1: ansQ1,
                answerQ2: ansQ2,
            	answerQ3: ansQ3,
            	answerQ4: ansQ4,
            	answerQ5: ansQ5,
                question1: cq1,
                question2: cq2,
                question3: cq3,
                question4: cq4,
                question5: cq5,
                q1Opt1: cq1Opt1,
                q1Opt2: cq1Opt2,
                q1Opt3: cq1Opt3,
                q1Opt4: cq1Opt4,
                q2Opt1: cq2Opt1,
                q2Opt2: cq2Opt2,
                q2Opt3: cq2Opt3,
                q2Opt4: cq2Opt4,
                q3Opt1: cq3Opt1,
                q3Opt2: cq3Opt2,
                q3Opt3: cq3Opt3,
                q3Opt4: cq3Opt4,
                q4Opt1: cq4Opt1,
                q4Opt2: cq4Opt2,
                q4Opt3: cq4Opt3,
                q4Opt4: cq4Opt4,
                q5Opt1: cq5Opt1,
                q5Opt2: cq5Opt2,
                q5Opt3: cq5Opt3,
                q5Opt4: cq5Opt4,
                p1Avatar: p1a,
                p2Avatar: p2a,
                p3Avatar: p3a,
                p1Color: p1c,
                p2Color: p2c,
                p3Color: p3c,
                p1Name: p1n,
                p2Name: p2n,
                p3Name: p3n
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

