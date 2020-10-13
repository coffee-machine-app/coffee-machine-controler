import { firebase } from './config.js'

//Generate an id with 20 characters
function generateId() {
    var length = 20,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

//Create a command in firestore
async function sendCommand(status) {
    try {
        var id = generateId();
        await firebase.firestore().collection('status').doc(id).set({
            key: id,
            status: status,
            time: new Date(),
            timestamp: Date.now()
        });
        return {
            status: status,
            time: new Date(),
            timestamp: Date.now()        
        }
    } catch (e) {
        console.log(e.toString())
        return null;
    }
}

export { sendCommand };
