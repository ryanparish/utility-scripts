const handleError = response => {
    console.log(response);
    if(!response.ok) {;
      throw Error(response.status);
    } else {
      return response.json();
    }
  }
  const auth = 'Basic ' + btoa('9874dcee4886d0:5a5f229977e295');
  const uri = 'https://watershedlrs.com/api/organizations/17583/lrs/statements?activity=http://crackerbarrel.com/xapi/storyline/avatarChallenge/hsds';
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
        let avatar = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].avatar;
        let name = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].name;
        let themeColor = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/avatarChallenge/data"].themeColor;
        player.SetVar("avatarP1", avatar);
        player.SetVar("nameP1", name);
        player.SetVar("themeColorP1", themeColor);
        console.log(`name is ${name}`);
        console.log(`avatar is ${avatar}`);
        console.log(`theme color is ${themeColor}`);
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