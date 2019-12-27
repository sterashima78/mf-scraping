const admin = require('firebase-admin');
const serviceAccount = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64'))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});

let db = admin.firestore();
module.exports = (data, date)=> {
    db.collection('stocks')
        .doc(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        .set({
            data
        })
}
