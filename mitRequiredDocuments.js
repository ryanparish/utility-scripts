var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var employeeID = player.GetVar('employeeID');
var setupQuery = baseURI + employeeID;
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
            player.SetVar("priorEvals", "FALSE");
        } else if(data.statements[0].verb.id == "http://adlnet.gov/expapi/verbs/voided") {
        	console.log("voided statement");
        	player.SetVar("priorEvals", "FALSE");        
        } else {
            console.log(data);
            player.SetVar("priorEvals", "TRUE");
            var evalNum = data.statements.length;
            player.SetVar("evalNum", evalNum);

            // process the data
            // retrieve answers
            let adaptabilityComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].adaptabilityComments;
            let adaptabilityRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].adaptabilityRating;
            let coachingTeachingComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].coachingTeachingComments;
            let coachingTeachingRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].coachingTeachingRating;
            let collaborationComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].collaborationComments;
            let collaborationRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].collaborationRating;
            let communicationComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].communicationComments;
            let communicationRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].communicationRating;
            let continuousLearningComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].continuousLearningComments;
            let continuousLearningRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].continuousLearningRating;
            let decisionMakingComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].decisionMakingComments;
            let decisionMakingRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].decisionMakingRating;
            let drivingExecutionComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].drivingExecutionComments;
            let drivingExecutionRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].drivingExecutionRating;
            let empGuestComments = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].empGuestComments;
            let empGuestRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].empGuestRating;
            let evalDate = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].evalDate;
            let evaluatorName = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].evaluatorName;
            let evaluatorStore = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].evaluatorStore;
            let mitClass = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].mitClass;
            let mitID = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].mitID;
            let mitName = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].mitName;
            let mitStore = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].mitStore;
            let overallRating = data.statements[3].object.definition.extensions["http://crackerbarrel.com/xapi/evaluations/extensions"].overallRating;

            player.SetVar("adaptabilityComments", adaptabilityComments);
            player.SetVar("adaptabilityRating", adaptabilityRating);
            player.SetVar("coachingTeachingComments", coachingTeachingComments);
            player.SetVar("coachingTeachingRating", coachingTeachingRating);
            player.SetVar("collaborationComments", collaborationComments);
            player.SetVar("collaborationRating", collaborationRating);
            player.SetVar("communicationComments", communicationComments);
            player.SetVar("communicationRating", communicationRating);
            player.SetVar("continuousLearningComments", continuousLearningComments);
            player.SetVar("decisionMakingComments", decisionMakingComments);
            player.SetVar("continuousLearningRating", continuousLearningRating);
            player.SetVar("decisionMakingRating", decisionMakingRating);
            player.SetVar("drivingExecutionComments", drivingExecutionComments);
            player.SetVar("drivingExecutionRating", drivingExecutionRating);
            player.SetVar("empGuestComments", empGuestComments);
            player.SetVar("empGuestRating", empGuestRating);
            player.SetVar("evalDate", evalDate);
            player.SetVar("evaluatorName", evaluatorName);
            player.SetVar("evaluatorStore", evaluatorStore);
            player.SetVar("mitClass", mitClass);
            player.SetVar("mitID", mitID);
            player.SetVar("mitName", mitName);
            player.SetVar("mitStore", mitStore);
            player.SetVar("overallRating", overallRating);



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