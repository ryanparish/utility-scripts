const player = GetPlayer();
const employeeID = player.GetVar("employeeID");

//construct URI... base is: http://www.crackerbarrel.com/xapi/evaluation/par/rs/

const baseURI = player.GetVar("baseURI");
const selectedPosition = player.GetVar("selectedPosition");
const prof1Name = player.GetVar("prof1Name");
// const prof2Name = player.GetVar("prof2Name");
// const prof3Name = player.GetVar("prof3Name");
// const prof4Name = player.GetVar("prof4Name");

const ratingType = player.GetVar("ratingType");

const questionInit = baseURI + ratingType + "/" + selectedPosition + "/" + prof1Name + "/" + employeeID;
// const questionInit = baseURI + ratingType + "/" + selectedPosition + "/" + prof2Name + "/" + employeeID;
// const questionInit = baseURI + ratingType + "/" + selectedPosition + "/" + prof3Name + "/" + employeeID;
// const questionInit = baseURI + ratingType + "/" + selectedPosition + "/" + prof4Name + "/" + employeeID;




const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
      throw Error(response.status);
    } else {
      return response.json();
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
  })
    .then(handleError)
    .then((data) => {
      console.log(data);
      // grab today in mm/dd/yyyy
      const today = new Date().toLocaleDateString();
      // process the data
      let tempRatingDate = data.statements[0].object.definition.extensions["http://www.crackerbarrel.com/xapi/evaluation/metadata"].ratingDate;;
      let ratingDate = new Date(tempRatingDate).toLocaleDateString()
      console.log(`rating date is ${ratingDate}`);
      console.log(`today is ${today}`);
      if (ratingDate === today) {
        console.log('dates match');
        player.SetVar("prof1Validation", true);
        // player.SetVar("prof2Validation", true);
        // player.SetVar("prof3Validation", true);
        // player.SetVar("prof4Validation", true);

      } else {
        console.log('dates do not match');
        player.SetVar("prof1Validation", false);
        // player.SetVar("prof2Validation", false);
        // player.SetVar("prof3Validation", false);
        // player.SetVar("prof4Validation", false);
      }
    })
    .catch((error) => {
      console.log(error);
      switch (error.message) {
        case '401':
          console.log('validation or parsing error');
          break;
        case '500':
          console.log('server error, try again');
          break;
        default:
          console.log('unhandled');
          break;
      }
    });