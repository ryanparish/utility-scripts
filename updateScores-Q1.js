var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var gameId = player.GetVar("gameId");
var setupQuery = baseURI + "game/" + gameId + "/q1";


const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
        throw Error(response.status);
    } else {
        var statusCode = response.status;
        player.SetVar("statusCodeP1", statusCode);
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
      if(data.statements.length == 0) {
        console.log("empty statements");
      } else {
        console.log(data);
        // process the data
        // player setup info
        let p1Score = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].p1Score;
        let p2Score = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].p2Score;
        let p3Score = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].p3Score;
        let nextQuestion = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].nextQuestion;
        // set SL variables
        
        player.SetVar("p1Score", p1Score);
        player.SetVar("p2Score", p2Score);
        player.SetVar("p3Score", p3Score);
        player.SetVar("currentQuestion", nextQuestion);


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