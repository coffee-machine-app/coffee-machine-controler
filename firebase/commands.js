import { firebase } from './config.js'

async function checkStatus(disableButton, buttoncss) {
    //Search all the messages not from the user
    firebase.firestore().collection('status').orderBy("timestamp", "desc").limit(1).onSnapshot(async function (result) {
        var status = [];
        //Check if there is changes
        result.docChanges().forEach(function (doc) {
            //If the message is added
            if (doc.type == 'added') {
                status.length = 0;
                status.push(doc.doc.data().status);
            }
        });

        //Initialise the variables
        disableButton.length = 0;
        buttoncss.length = 0;

        if(status != "wait" && status.length != 0){
            //The coffee machine is working
            disableButton.push(true);
            buttoncss.push("button-container disabled");
        } else{
            //The coffee machine is waiting
            disableButton.push(false);
            buttoncss.push("button-container");
        }
    });
    return [disableButton,buttoncss];
}

//Create a command in firestore
async function sendCommand(status) {
    try {
        //Create a random id
        id = Date.now().toString();
        //Send the status to the firebase
        await firebase.firestore().collection('status').doc().set({
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
