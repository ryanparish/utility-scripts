const player = GetPlayer();
const baseURI = player.GetVar("baseURI");
const employeeID = player.GetVar('employeeID');

//construct URI... base is: http://www.crackerbarrel.com/xapi/evaluation/par/rs/

const selectedPosition = player.GetVar("selectedPosition");
const currentActivityID = player.GetVar("currentActivityID");
const ratingType = player.GetVar("ratingType");
const observationNum = player.GetVar("observationNum");


const questionInit = baseURI + ratingType + "/" + selectedPosition + "/" + currentActivityID + "/" + employeeID;


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
const uri = 'https://watershedlrs.com/api/organizations/17583/lrs/statements?activity=' + questionInit;
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
            //comment out the unused variable assignments!
            player.SetVar("statements", false);
        } else {
            const observation = observationNum - 1;
            console.log(data);
            // process the data
            //comment out the unused variable assignments!
            player.SetVar("statements", true);
            let ratingQty = data.statements.length;
            let lastSkillTrainer = data.statements[observation].object.definition.extensions["http://www.crackerbarrel.com/xapi/evaluation/metadata"].skillTrainerName;
            let lastRatingDate = data.statements[observation].object.definition.extensions["http://www.crackerbarrel.com/xapi/evaluation/metadata"].ratingDate;
            let rating = data.statements[observation].object.definition.extensions["http://www.crackerbarrel.com/xapi/evaluation/metadata"].rating;
            let ratingNotes = data.statements[observation].object.definition.extensions["http://www.crackerbarrel.com/xapi/evaluation/metadata"].ratingNotes;


            player.SetVar("ratingQty", ratingQty);
            player.SetVar("lastSkillTrainer", lastSkillTrainer);
            player.SetVar("lastRatingDate", lastRatingDate);
            player.SetVar("lastRating", rating);
            player.SetVar("ratingNotes", ratingNotes);
        };

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