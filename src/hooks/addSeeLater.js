export default class addSeeLater{
    static async seeLater(event){
        event.preventDefault();
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(id);
    
        docRef.set({
            type: type,
        })
    }
}
