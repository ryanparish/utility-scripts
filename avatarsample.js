var player = GetPlayer();

//pull result objects from all quiz variable objects

//var quizCheck = player.GetVar("RedQuiz");


//get setup values from player

var employeeID = player.GetVar("employeeID");
var key = player.GetVar("watershedKey");
var secret = player.GetVar("watershedSecret");
var endPoint = player.GetVar("endPoint");
var preAuth = key + ":" + secret;

//construct URIs for each statement

var baseURI = player.GetVar("baseURI");
var playerNumber = player.GetVar("playerNumber");
var playerStart = baseURI + playerNumber;
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";

//posting statement



const auth = "Basic " + btoa("90277214a3b348:feb28280d4de4c");
fetch(
queryString,
  {
    method: "POST",
    headers: {
      "X-Experience-API-Version": "1.0.3",
      "Content-Type": "application/json",
      "Authorization": auth,
    },
    body: {

        "actor": {
            "objectType": "Agent",
            "name": "Edward Spalding",
            "mbox": "mailto:edward.spalding@crackerbarrel.com"
          },
          "verb": {
            "id": "http://adlnet.gov/expapi/verbs/experienced",
            "display": {
              "en-US": "experienced"
            }
          },
          "object": {
            "objectType": "Activity",
            "id": "http://schoox.com/xapi/storyline/xAPI",
            "definition": {
              "name": {
                "en-US": "xAPI"
              }
            }
          }
        }
    // "actor":{
    //     "objectType": "Agent",
    //     "account": {
    //         "homePage": "http://www.crackerbarrel.com",
    //         "name": employeeID
    //     }
    // },
    // "verb":{
    //         "id": "http://activitystrea.ms/schema/1.0/checkin",
    //         "name": {
    //             "en-US": "checked in"
    //         },
    //         "description": {
    //             "en-US": "Indicates that the actor has checked-in to the object. For instance, a person checking-in to a place."
    //         }
    //     }
    // },
    // "object":{
    //     "id": playerStart,
    //     "definition": {
    //         "name": {"en-US": "Checked into new Avatar Challenge game instance"}
    //     }
    // }
}
  
)
  .then((response) => {
    console.log(response);
    response.json();
  }).then((data) => {
    // player.SetVar("quizCheck", data);
    // if(data.statements.length == 0) {
    //   player.SetVar("quizCheck", "0");
    console.log(data);
    })
  .catch((error) => console.error(error.message));
