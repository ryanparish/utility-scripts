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
  const proctorID = player.GetVar('proctorID');
  const proxy = player.GetVar('proxy');
  const schooxUsersAPI = player.GetVar('schooxUsersAPI');
  const url = `${schooxUsersAPI}${proctorID}?apikey=${apikey}&acadId=${acadId}`;
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
        player.SetVar('proctorStatusCode','404');

      }
      if (data.results == null) {
        // handle no data from the employee redirect to manual entry, display message, etc.
        console.log('no data for the employee');
        player.SetVar('proctorStatusCode','400');

      } else {
        player.SetVar('proctorStatusCode','200');
        const fname = data.results.firstname;
        employee.fname = fname;
        const lname = data.results.lastname;
        employee.lname = lname
        let proctorName = fname + " " + lname;
        player.SetVar("proctorName", proctorName);
        let store = '';
        const proctor = data.results.custom_fields[6].Proctor;
        if (proctor == "Yes") {
            player.SetVar('validProctor', 'Yes');
        } else {
            player.SetVar('validProctor', 'No');
        }
        employee.proctor = proctor;
        // jobs will be an array if field employee
        if (data.results.units.length != 0) {
          store = data.results.units[0].name;
          employee.store = store;
          player.SetVar('proctorStore', store);
        } else {
          store = 'Corporate Employee';
          employee.store = store;
          player.SetVar('proctorStore', store);
        }
      }
    });