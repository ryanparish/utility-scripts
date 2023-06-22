var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var employeeID = player.GetVar('employeeID');
var setupQuery = baseURI + employeeID + "/answers";


const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
        throw Error(response.status);
    } else {
        var statusCode = response.status;
        player.SetVar("statusCodePC", statusCode);
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
            player.SetVar("priorAttempts", "FALSE");
        } else if(data.statements[0].verb.id == "http://adlnet.gov/expapi/verbs/voided") {
        	console.log("voided statement");
        	player.SetVar("priorAttempts", "FALSE");        
        } else {
            console.log(data);
            player.SetVar("priorAttempts", "TRUE");
            // process the data and log prior attempt value
            
            let voidStatement = data.statements[0].id;
            player.SetVar("voidStatement",voidStatement);

            // retrieve answers
            let a1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a1;
            let a2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a2;
            let a3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a3;
            let a4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a4;
            let a5 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a5;
            let a6 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a6;
            let a7 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a7;
            let a8 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a8;
            let a9 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a9;
            let a10 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a10;
            let a11 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a11;
            let a12 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a12;
            let a13 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a13;
            let a14 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a14;
            let a15 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a15;
            let a16 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a16;
            let a17 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a17;
            let a18 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a18;
            let a19 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a19;
            let a20 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a20;
            let a21 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a21;
            let a22 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a22;
            let a23 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a23;
            let a24 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a24;
            let a25 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a25;
            let a26 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a26;
            let a27 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a27;
            let a28 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a28;
            let a29 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a29;
            let a30 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].a30;

            //retrieve flags
            let flag1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag1;
            let flag2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag2;
            let flag3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag3;
            let flag4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag4;
            let flag5 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag5;
            let flag6 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag6;
            let flag7 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag7;
            let flag8 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag8;
            let flag9 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag9;
            let flag10 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag10;
            let flag11 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag11;
            let flag12 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag12;
            let flag13 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag13;
            let flag14 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag14;
            let flag15 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag15;
            let flag16 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag16;
            let flag17 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag17;
            let flag18 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag18;
            let flag19 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag19;
            let flag20 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag20;
            let flag21 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag21;
            let flag22 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag22;
            let flag23 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag23;
            let flag24 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag24;
            let flag25 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag25;
            let flag26 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag26;
            let flag27 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag27;
            let flag28 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag28;
            let flag29 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag29;
            let flag30 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].flag30;

            //load initial score
            let initialScore = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/answers"].initialScore;


            //load proctor information
            let proctorID = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/proctorInfo"].proctorID;
            let proctorStore = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/proctorInfo"].proctorStore;
            let proctorName = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/alabamaRVP/proctorInfo"].proctorName;

            // set SL variables
            // set answer variables

            player.SetVar("a1", a1);
            player.SetVar("a2", a2);
            player.SetVar("a3", a3);
            player.SetVar("a4", a4);
            player.SetVar("a5", a5);
            player.SetVar("a6", a6);
            player.SetVar("a7", a7);
            player.SetVar("a8", a8);
            player.SetVar("a9", a9);
            player.SetVar("a10", a10);
            player.SetVar("a11", a11);
            player.SetVar("a12", a12);
            player.SetVar("a13", a13);
            player.SetVar("a14", a14);
            player.SetVar("a15", a15);
            player.SetVar("a16", a16);
            player.SetVar("a17", a17);
            player.SetVar("a18", a18);
            player.SetVar("a19", a19);
            player.SetVar("a20", a20);
            player.SetVar("a21", a21);
            player.SetVar("a22", a22);
            player.SetVar("a23", a23);
            player.SetVar("a24", a24);
            player.SetVar("a25", a25);
            player.SetVar("a26", a26);
            player.SetVar("a27", a27);
            player.SetVar("a28", a28);
            player.SetVar("a29", a29);
            player.SetVar("a30", a30);

            // set flag variables

            player.SetVar("flag1", flag1);
            player.SetVar("flag2", flag2);
            player.SetVar("flag3", flag3);
            player.SetVar("flag4", flag4);
            player.SetVar("flag5", flag5);
            player.SetVar("flag6", flag6);
            player.SetVar("flag7", flag7);
            player.SetVar("flag8", flag8);
            player.SetVar("flag9", flag9);
            player.SetVar("flag10", flag10);
            player.SetVar("flag11", flag11);
            player.SetVar("flag12", flag12);
            player.SetVar("flag13", flag13);
            player.SetVar("flag14", flag14);
            player.SetVar("flag15", flag15);
            player.SetVar("flag16", flag16);
            player.SetVar("flag17", flag17);
            player.SetVar("flag18", flag18);
            player.SetVar("flag19", flag19);
            player.SetVar("flag20", flag20);
            player.SetVar("flag21", flag21);
            player.SetVar("flag22", flag22);
            player.SetVar("flag23", flag23);
            player.SetVar("flag24", flag24);
            player.SetVar("flag25", flag25);
            player.SetVar("flag26", flag26);
            player.SetVar("flag27", flag27);
            player.SetVar("flag28", flag28);
            player.SetVar("flag29", flag29);
            player.SetVar("flag30", flag30);

            //set initial score

            player.SetVar("initialScore", initialScore);

            //set proctor variables

            player.SetVar("proctorID", proctorID);
            player.SetVar("proctorStore", proctorStore);
            player.SetVar("proctorName", proctorName);


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