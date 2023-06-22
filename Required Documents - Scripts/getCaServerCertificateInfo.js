var player = GetPlayer();
var baseURI = player.GetVar("baseURI");
var employeeID = player.GetVar('employeeID');
var setupQuery = baseURI + employeeID + "/serverID";
var queryString = "https://watershedlrs.com/api/organizations/17583/lrs/statements";



const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
        throw Error(response.status);
    } else {
        var statusCode = response.status;
        player.SetVar("statusCode", statusCode);
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
        if (data.statements.length == 0) {
            console.log("empty statements");
            player.SetVar("serverCertificate", "none");
        } else {
            console.log(data);
            let serverCertificate = data.statements[0].object.definition.extensions["http://crackerbarrel.com/xapi/storyline/californiaRVP/registration"].serverCertificate;
            player.SetVar("serverCertificate", serverCertificate);
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


