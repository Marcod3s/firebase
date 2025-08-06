const database = firebase.database().ref();

const allMessages = document.querySelector('#all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const emailElem = document.querySelector('#email')
const sendBtn = document.getElementById('send-btn');
const previewImage = document.querySelector('#preview-image')
const profile = document.querySelector('#profile')

sendBtn.onclick = updateDB;
// sendBtn.addEventListener('click', updateDB);

function updateDB(event) {
  // Prevent default refresh
  event.preventDefault();
  // Create data object
  let now = new Date();

  previewImage.src = profile.value
  const data = {
    USERNAME: usernameElem.value,
    EMAIL: emailElem.value,
    MESSAGE: messageElem.value,
    PROFILE: previewImage.src,
    DATE: `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`,
    TIME: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
  };
  // console.log the object
  console.log(data);
  // GET *PUSH* PUT DELETE
  // Write to our database
  database.push(data);
  // Reset message
  messageElem.value = '';
}

database.on('child_added', addMessageToBoard);


function addMessageToBoard(rowData) {
  // Store the value of rowData inside object named 'data'
  const data = rowData.val();
  // console.log data
  console.log(data);
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  let singleMessage = makeSingleMessageHTML(data.PROFILE, data.USERNAME, data.MESSAGE, data.EMAIL, data.DATE, data.TIME, );
  // Append the new message HTML element to allMessages
  allMessages.append(singleMessage);
}

function makeSingleMessageHTML(imageUrl, usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt, ) {
  // Create Parent Div
  let parentDiv = document.createElement('div');
  // Add Class name .single-message
  parentDiv.className = 'single-message';
  // parentDiv.classList.add('single-message');
  let imageP = document.createElement('img')
  imageP.src = imageUrl
  imageP.classList.add('single-message-img')
  parentDiv.append(imageP)
  console.log(imageP.className)
  // Create Username P Tag
  let usernameP = document.createElement('p');
  usernameP.className = 'single-message-username';
  usernameP.innerHTML = usernameTxt + ':';
  
  // Append username
  parentDiv.appendChild(usernameP);

  // Create message P Tag
  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;
  
  // Append message
  parentDiv.append(messageP);
  
  let emailP = document.createElement('p');
  emailP.innerHTML = emailTxt;
  parentDiv.append(emailP)

  let timeP = document.createElement('p')
  timeP.innerHTML = timeTxt
  parentDiv.append(timeP)

  let dateP = document.createElement('p')
  dateP.innerHTML = dateTxt
  parentDiv.append(dateP)

  
  // Return Parent Div
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */











