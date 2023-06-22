var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var employeeID = player.GetVar('employeeID');
var setupQuery = baseURI + employeeID + "/pdf";

const handleError = (response) => {
      console.log(response);
      if (!response.ok) {
        throw Error(response.status);
      } else {
        return response.json();
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
      })
      .then(handleError)
      .then((data) => {
        if (data.statements.length == 0) {
          console.log('empty statements');
        } else {
          console.log(data);
          // process the data
          pdf = data.statements[0].object.definition.extensions['http://crackerbarrel.com/xapi/storyline/alabamaRVP/pdf/data'].pdf;
          title = data.statements[0].object.definition.extensions['http://crackerbarrel.com/xapi/storyline/alabamaRVP/pdf/data'].title;
          console.log(`pdf is ${pdf}`);
          console.log(`title is ${title}`);
          const linkSource = `data:application/pdf;base64,${pdf}`;
          const downloadLink = document.createElement('a');
          const fileName = title + '.pdf';
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
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

