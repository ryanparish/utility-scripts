const handleError = (response) => {
  console.log(response);
  if (!response.ok) {
    throw Error(response.status);
  } else {
    return response.json();
  }
};
const player = GetPlayer();
const acadId = player.GetVar('acadId');
const apikey = player.GetVar('apikey');
const userId = player.GetVar('userID');
const proxy = player.GetVar('proxy');
const schooxUsersAPI = player.GetVar('schooxUsersAPI');
const url = `${schooxUsersAPI}${userId}?apikey=${apikey}&acadId=${acadId}`;
// employee array to hold all employee data
let employee = new Array();
fetch(`${proxy}?url=${url}`, {
  method: 'GET',
})
  .then(handleError)
  .then((data) => {
    console.log(data);
    if (data.status != 200) {
      // request was bad coming from Schoox handle bad request
      console.log('Bad request');
      player.SetVar('statusCode',400);
    }
    if (data.results == null) {
      // handle no data from the employee redirect to manual entry, display message, etc.
      console.log('no data for the employee');
      player.SetVar('statusCode',404);
    } else {
      const fname = data.results.firstname;
      employee.fname = fname;
      const lname = data.results.lastname;
      employee.lname = lname
      let fullName = fname + " " + lname;
      player.SetVar('fullName', fullName);
      player.SetVar('firstName', fname);
      player.SetVar('lastName', lname);
      const externalID = data.results.external_ids[0];
      employee.employeeId = externalID;
      player.SetVar('employeeID', externalID);
      // jobs will be an array if field employee
      player.SetVar('statusCode', 200);  

    }
  });