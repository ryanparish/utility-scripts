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
const extUrl = "https://52.70.115.197/proxy/proxy.php?url=https://api.schoox.com/v1/courses/4016222?apikey="+ apikey + "&acadId=" + acadId;

fetch(`${extUrl}`, {
    method: 'GET',
})
    .then(handleError)
    .then((data) => {
        console.log(data);
        if (data.status != 200) {
            // request was bad coming from Schoox handle bad request
            console.log('Not allowed on external server...');
            player.SetVar('networkConfig', 'Not External');
        }
        else {
            player.SetVar('networkConfig', 'External');
        }
    });