const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminInRole = functions.https.onCall((data, context) => {
    //get the user and add a custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.id, {
            admin: true
        });
    }).then(() => {
        return {
            message: `success! ${data.email} has been made an admin`
        };
    }).catch((error) => {
        return error;
    });
});
