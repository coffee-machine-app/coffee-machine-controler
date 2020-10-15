import { firebase } from './config.js'

async function checkStatus(disableButton, buttoncss) {
    //Search all the messages not from the user
    firebase.firestore().collection('status').orderBy("timestamp", "desc").limit(1).onSnapshot(async function (result) {;
        var status = [];
        //Check if there is changes
        result.docChanges().forEach(function (doc) {
            //If the message is added
            if (doc.type == 'added') {
                status.length = 0;
                status.push(doc.doc.data().status);
            }
        });
        
        //console.log(status.length);

        disableButton.length = 0;
        buttoncss.length = 0;

        if(status != "wait" && status.length !=0 ){

            //console.log("Option1");
            
            disableButton.push(true);
            buttoncss.push("button-container disabled");
            
        } else{

            //console.log("Option2");
            
            disableButton.push(false);
            buttoncss.push("button-container");
        
        }
        console.log("Fin check")
        //console.log("disableB", disableButton)
        //console.log("buttoncss", buttoncss)
    });
    return [disableButton,buttoncss];
}

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

export { checkStatus, sendCommand };
