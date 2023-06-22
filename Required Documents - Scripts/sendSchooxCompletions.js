const handleError = (response) => {
    console.log(response);
    if (!response.ok) {
      throw Error(response.status);
    } else {
      return response.json();
    }
  };
  const player = GetPlayer();
  const userId = player.GetVar('userID');
  const caStore = player.GetVar('caStore');
  const requiredDocs = player.GetVar('requiredDocs');
  const url = `${requiredDocs}userID=${userId}&caStore=${caStore}`;
  fetch(`${url}`, {
    method: 'GET',
  })
    .then(handleError)
    .then((data) => {
      console.log(data);
      if (data.status != 200) {
        console.log('Bad request');
        player.SetVar('schooxStatus','400');
      }
     else {
        player.SetVar('schooxStatus', '200');  
      }
    });