var player = GetPlayer();

//pull result objects from all quiz variable objects

//first, we're pulling scores for each quiz

var redQuiz = player.GetVar("RedQuiz");
var brownQuiz = player.GetVar("BrownQuiz");
var goldQuiz = player.GetVar("GoldQuiz");
var greenQuiz = player.GetVar("GreenQuiz");
var mysteryQuiz = player.GetVar("MysteryQuiz");

//then, we're pulling specific question level details for each quiz

//Red Quiz Responses

var a1 = player.GetVar("a1");
var a2 = player.GetVar("a2");
var a3 = player.GetVar("a3");
var a4 = player.GetVar("a4");
var a5 = player.GetVar("a5");

//Brown Quiz Responses

var b1 = player.GetVar("b1");
var b2 = player.GetVar("b2");
var b3 = player.GetVar("b3");
var b4 = player.GetVar("b4");
var b5 = player.GetVar("b5");

//Gold Quiz Responses

var c1 = player.GetVar("c1");
var c2 = player.GetVar("c2");
var c3 = player.GetVar("c3");
var c4 = player.GetVar("c4");
var c5 = player.GetVar("d5");

//Green Quiz Responses

var d1 = player.GetVar("d1");
var d2 = player.GetVar("d2");
var d3 = player.GetVar("d3");
var d4 = player.GetVar("d4");
var d5 = player.GetVar("d5");

//Mystery Quiz Responses

var e1 = player.GetVar("e1");
var e2 = player.GetVar("e2");
var e3 = player.GetVar("e3");
var e4 = player.GetVar("e4");
var e5 = player.GetVar("e5");

//get setup values from player

var employeeID = player.GetVar("employeeID");
var key = player.GetVar("watershedKey");
var secret = player.GetVar("watershedSecret");
var endPoint = player.GetVar("endPoint");
var preAuth = key + ":" + secret;

//construct URIs for each statement

var baseURI = player.GetVar("baseURI");
var redQuizActivityId = baseURI + "redquiz/" + employeeID;
var brownQuizActivityId = baseURI + "brownquiz/" + employeeID;
var goldQuizActivityId = baseURI + "goldquiz/" + employeeID;
var greenQuizActivityId = baseURI + "greenquiz/" + employeeID;
var mysteryQuizActivityId = baseURI + "mysteryquiz/" + employeeID;

//sending statement for Red Quiz

const auth = "Basic " + btoa(preAuth)
const sendStatement = () => {
    const statement = {
        actor: {
            objectType: "Agent",
            name: employeeID
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed"
        },
        object: {
            id: redQuizActivityId
        },
        result: {
            score: {
                scaled: redQuiz / 100,
                raw: redQuiz,
                min: 0,
                max: 100
            }
        },
        extensions:{
            questionOne: a1,
            questionTwo: a2,
            questionThree: a3,
            questionFour: a4,
            questionFive: a5
        }
    }
  
  fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            },
            body: JSON.stringify(statement)
    }).catch (error => console.error(error.message))
}


