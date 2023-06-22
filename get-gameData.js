var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var gameId = player.GetVar("gameId");
var setupQuery = baseURI + "game/" + gameId;


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
        let avatarP1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].avatarP1;
        let avatarP2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].avatarP2;
        let avatarP3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].avatarP3;
        let themeColorP1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].themeColorP1;
        let themeColorP2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].themeColorP2;
        let themeColorP3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].themeColorP3;
        let nameP1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].nameP1;
        let nameP2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].nameP2;
        let nameP3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].nameP3;
        let currentQuestion = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].currentQuestion;


        // load answers

        let ansQ1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].answerQ1;
        let ansQ2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].answerQ2;
        let ansQ3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].answerQ3;
        let ansQ4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].answerQ4;
        let ansQ5 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].answerQ5;
        let q1AnswerText = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q1AnswerText;
        let q2AnswerText = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q2AnswerText;
        let q3AnswerText = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q3AnswerText;
        let q4AnswerText = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q4AnswerText;
        let q5AnswerText = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q5AnswerText;



        // load question 1
        let cq1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].question1;
        let cq1Opt1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q1Opt1;
        let cq1Opt2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q1Opt2;
        let cq1Opt3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q1Opt3;
        let cq1Opt4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q1Opt4;

        // load question 2

        let cq2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].question2;
        let cq2Opt1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q2Opt1;
        let cq2Opt2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q2Opt2;
        let cq2Opt3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q2Opt3;
        let cq2Opt4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q2Opt4;

        // load question 3

        let cq3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].question3;
        let cq3Opt1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q3Opt1;
        let cq3Opt2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q3Opt2;
        let cq3Opt3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q3Opt3;
        let cq3Opt4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q3Opt4;

        // load question 4

        let cq4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].question4;
        let cq4Opt1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q4Opt1;
        let cq4Opt2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q4Opt2;
        let cq4Opt3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q4Opt3;
        let cq4Opt4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q4Opt4;

        // load question 5

        let cq5 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].question5;
        let cq5Opt1 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q5Opt1;
        let cq5Opt2 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q5Opt2;
        let cq5Opt3 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q5Opt3;
        let cq5Opt4 = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].q5Opt4;

        // set SL variables
        
        player.SetVar("avatarP1", avatarP1);
        player.SetVar("avatarP2", avatarP2);
        player.SetVar("avatarP3", avatarP3);
        player.SetVar("nameP1", nameP1);
        player.SetVar("nameP2", nameP2);
        player.SetVar("nameP3", nameP3);
        player.SetVar("themeColorP1", themeColorP1);
        player.SetVar("themeColorP2", themeColorP2);
        player.SetVar("themeColorP3", themeColorP3);
        player.SetVar("currentQuestion", currentQuestion);
        player.SetVar("ansQ1", ansQ1);
        player.SetVar("ansQ2", ansQ2);
        player.SetVar("ansQ3", ansQ3);
        player.SetVar("ansQ4", ansQ4);
        player.SetVar("ansQ5", ansQ5);
        player.SetVar("ansQ5", ansQ5);
        player.SetVar("q1AnswerText", q1AnswerText);
        player.SetVar("q2AnswerText", q2AnswerText);
        player.SetVar("q3AnswerText", q3AnswerText);
        player.SetVar("q4AnswerText", q4AnswerText);
        player.SetVar("q5AnswerText", q5AnswerText);
        player.SetVar("cq1", cq1);
        player.SetVar("cq2", cq2);
        player.SetVar("cq3", cq3);
        player.SetVar("cq4", cq4);
        player.SetVar("cq5", cq5);
        player.SetVar("cq1Opt1", cq1Opt1);
        player.SetVar("cq1Opt2", cq1Opt2);
        player.SetVar("cq1Opt3", cq1Opt3);
        player.SetVar("cq1Opt4", cq1Opt4);
        player.SetVar("cq2Opt1", cq2Opt1);
        player.SetVar("cq2Opt2", cq2Opt2);
        player.SetVar("cq2Opt3", cq2Opt3);
        player.SetVar("cq2Opt4", cq2Opt4);
        player.SetVar("cq3Opt1", cq3Opt1);
        player.SetVar("cq3Opt2", cq3Opt2);
        player.SetVar("cq3Opt3", cq3Opt3);
        player.SetVar("cq3Opt4", cq3Opt4);
        player.SetVar("cq4Opt1", cq4Opt1);
        player.SetVar("cq4Opt2", cq4Opt2);
        player.SetVar("cq4Opt3", cq4Opt3);
        player.SetVar("cq4Opt4", cq4Opt4);
        player.SetVar("cq5Opt1", cq5Opt1);
        player.SetVar("cq5Opt2", cq5Opt2);
        player.SetVar("cq5Opt3", cq5Opt3);
        player.SetVar("cq5Opt4", cq5Opt4);

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