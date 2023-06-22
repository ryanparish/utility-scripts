const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
	let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++){
        result =+ characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
    var playerNumber = generateString(4);

// secondary test

    
var player = GetPlayer();

var characters ='abcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    var result = ' ';
    var charactersLength = characters.length;
    for ( let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
    var playerNumber = generateString(4);
    
player.SetVar("playerNumber", playerNumber);