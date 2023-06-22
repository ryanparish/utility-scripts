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
const intUrl = "https://10.220.255.207/proxy/proxy.php?url=https://api.schoox.com/v1/courses/4016222?apikey=" + apikey +"&acadId=" +acadId;

fetch(`${intUrl}`, {
    method: 'GET',
})
    .then(handleError)
    .then((data) => {
        console.log(data);
        if (data.status != 200) {
            // request was bad coming from Schoox handle bad request
            console.log('Not allowed on internal server.. testing external server.');
            player.SetVar('networkConfig', 'Not Internal');
        }
        else {
            player.SetVar('networkConfig', 'Internal');
        }
    });