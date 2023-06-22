var player = GetPlayer();
var employeeID = player.GetVar("employeeID");
var baseURI = player.GetVar("baseURI");
var questionInit = baseURI + employeeID + "/answers";
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";
var proctorID = player.GetVar("proctorID");
var proctorStore = player.GetVar("proctorStore");
var proctorName = player.GetVar("proctorName");
var initialScore = player.GetVar("initialScore");

// compiling custom question variables to send in statement

// Answers

var a1 = player.GetVar("a1");
var a2 = player.GetVar("a2");
var a3 = player.GetVar("a3");
var a4 = player.GetVar("a4");
var a5 = player.GetVar("a5");
var a6 = player.GetVar("a6");
var a7 = player.GetVar("a7");
var a8 = player.GetVar("a8");
var a9 = player.GetVar("a9");
var a10 = player.GetVar("a10");
var a11 = player.GetVar("a11");
var a12 = player.GetVar("a12");
var a13 = player.GetVar("a13");
var a14 = player.GetVar("a14");
var a15 = player.GetVar("a15");
var a16 = player.GetVar("a16");
var a17 = player.GetVar("a17");
var a18 = player.GetVar("a18");
var a19 = player.GetVar("a19");
var a20 = player.GetVar("a20");
var a21 = player.GetVar("a21");
var a22 = player.GetVar("a22");
var a23 = player.GetVar("a23");
var a24 = player.GetVar("a24");
var a25 = player.GetVar("a25");
var a26 = player.GetVar("a26");
var a27 = player.GetVar("a27");
var a28 = player.GetVar("a28");
var a29 = player.GetVar("a29");
var a30 = player.GetVar("a30");


// Flags

var flag1 = player.GetVar("flag1");
var flag2 = player.GetVar("flag2");
var flag3 = player.GetVar("flag3");
var flag4 = player.GetVar("flag4");
var flag5 = player.GetVar("flag5");
var flag6 = player.GetVar("flag6");
var flag7 = player.GetVar("flag7");
var flag8 = player.GetVar("flag8");
var flag9 = player.GetVar("flag9");
var flag10 = player.GetVar("flag10");
var flag11 = player.GetVar("flag11");
var flag12 = player.GetVar("flag12");
var flag13 = player.GetVar("flag13");
var flag14 = player.GetVar("flag14");
var flag15 = player.GetVar("flag15");
var flag16 = player.GetVar("flag16");
var flag17 = player.GetVar("flag17");
var flag18 = player.GetVar("flag18");
var flag19 = player.GetVar("flag19");
var flag20 = player.GetVar("flag20");
var flag21 = player.GetVar("flag21");
var flag22 = player.GetVar("flag22");
var flag23 = player.GetVar("flag23");
var flag24 = player.GetVar("flag24");
var flag25 = player.GetVar("flag25");
var flag26 = player.GetVar("flag26");
var flag27 = player.GetVar("flag27");
var flag28 = player.GetVar("flag28");
var flag29 = player.GetVar("flag29");
var flag30 = player.GetVar("flag30");


//Player Info





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
        id: 'http://adlnet.gov/expapi/verbs/answered',
        display: {
            'en-US': 'answered',
        },
    },
    object: {
        objectType: 'Activity',
        id: questionInit,
        definition: {
            name: {
                'en-US': 'Submitted Answers',
            },
            extensions: {
                "http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers": {
                    a1: a1,
                    a2: a2,
                    a3: a3,
                    a4: a4,
                    a5: a5,
                    a6: a6,
                    a7: a7,
                    a8: a8,
                    a9: a9,
                    a10: a10,
                    a11: a11,
                    a12: a12,
                    a13: a13,
                    a14: a14,
                    a15: a15,
                    a16: a16,
                    a17: a17,
                    a18: a18,
                    a19: a19,
                    a20: a20,
                    a21: a21,
                    a22: a22,
                    a23: a23,
                    a24: a24,
                    a25: a25,
                    a26: a26,
                    a27: a27,
                    a28: a28,
                    a29: a29,
                    a30: a30,
                    flag1: flag1,
                    flag2: flag2,
                    flag3: flag3,
                    flag4: flag4,
                    flag5: flag5,
                    flag6: flag6,
                    flag7: flag7,
                    flag8: flag8,
                    flag9: flag9,
                    flag10: flag10,
                    flag11: flag11,
                    flag12: flag12,
                    flag13: flag13,
                    flag14: flag14,
                    flag15: flag15,
                    flag16: flag16,
                    flag17: flag17,
                    flag18: flag18,
                    flag19: flag19,
                    flag20: flag20,
                    flag21: flag21,
                    flag22: flag22,
                    flag23: flag23,
                    flag24: flag24,
                    flag25: flag25,
                    flag26: flag26,
                    flag27: flag27,
                    flag28: flag28,
                    flag29: flag29,
                    flag30: flag30,
                    initialScore: initialScore

                },
                "http://crackerbarrel.com/xapi/storyline/alabamaRVP/proctorInfo": {
                    proctorName: proctorName,
                    proctorID: proctorID,
                    proctorStore: proctorStore
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

