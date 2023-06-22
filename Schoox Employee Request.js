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
        player.SetVar('statusCode','400');
      }
      if (data.results == null) {
        // handle no data from the employee redirect to manual entry, display message, etc.
        console.log('no data for the employee');
        player.SetVar('statusCode','404');
      } else {
        player.SetVar('statusCode', '200');  
        let store = '';
        let jobs = '';
        const fname = data.results.firstname;
        employee.fname = fname;
        const lname = data.results.lastname;
        employee.lname = lname
        const externalID = data.results.external_ids[0];
        employee.employeeId = externalID;
        player.SetVar('employeeID', externalID); 
        const dob = data.results.custom_fields[5].BIRTHDATE;
        const birthdate = new Date(dob).toLocaleDateString("en-US");
        employee.birthdate = birthdate;
        player.SetVar('dob', birthdate);
        // jobs will be an array if field employee
        if (data.results.units.length != 0) {
          store = data.results.units[0].name;
          employee.store = store;
          jobs = data.results.units[0].jobs;
          employee.jobs = jobs;
        } else {
          store = 'Not Found';
          employee.store = store;
          jobs = 'Corporate Employee';
          employee.jobs = jobs;
        }
        player.SetVar('storeNum', employee.store);
      }
    });