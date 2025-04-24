const CLIENT_ID = '470781940912-k8hallj7bl393pn9id646pi1mlp79q6f.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content=document.getElementById('content');
const channelForm=document.getElementById('chanel-form');
const channelInput=document.getElementById('channel-input');
const videoContainer=document.getElementById('video-container');
 
function handleClientLoad() {
    gapi.load('client:auth2',initClient);
}

function initClient() {
    gapi.client.init({
        discoveryDocs:DISCOVERY_DOCS,
        clientId:CLIENT_ID,
        scopes:SCOPES
    }).then(()=>{
        //listen to sign changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        //handelling signin 
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick=handleAuthClick;
        signoutButton.onclick=handleSignoutClick;
    })
}

//update UI A/SO
function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.diplay='none';
        signoutButton.style.diplay='block';
        content.style.diplay='block';
        videoContainer.style.diplay='block';
    }else{
        authorizeButton.style.diplay='block';
        signoutButton.style.diplay='none';
        content.style.diplay='none';
        videoContainer.style.diplay='none';
    }
}

