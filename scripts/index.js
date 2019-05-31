const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  var loggedInStyle = 'none';
  var loggedOutStyle = 'block';
  if (user) {
    //account info
    firestoreDB.collection('users').doc(user.uid).get().then((document) => {
      accountDetails.innerHTML = `
        <div>Logged in as ${user.email}</div>
        <div>${document.data().bio}</div>
      `;
    });
    loggedInStyle = 'block';
    loggedOutStyle = 'none';
  } else {
    accountDetails.innerHTML = '';   
  }
  loggedInLinks.forEach((item) => item.style.display = loggedInStyle);
  loggedOutLinks.forEach((item) => item.style.display = loggedOutStyle);
}

//set up documents
const setupGuides = (data) => {
  let html = '';

  if (data.length) {
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
        </li>
      `;
      html += li;    
    });
  } else {
    html = '<h5 class="center-align">Login to see guides</h5>';
  }
  guideList.innerHTML = html;
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });