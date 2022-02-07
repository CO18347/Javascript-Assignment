const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '692086907101-i4fmac24jbr16i8eosjq5n4p9aa92euj.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04YQpx-HyqfV2CgYIARAAGAQSNwF-L9IrLMKzZzPAVUedS9ooKPf7ptAkYoHxtT1d-mgzwF_vCWMic0qrAC2HOa8VRtcFDgRpJNw';


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  const filePath = path.join(__dirname, 'MyImage.jpg');

  async function uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: 'MyImage.jpg', //This can be name of your choice
          mimeType: 'image/jpg',
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(filePath),
        },
      });

      console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}
  
//uploadFile();

async function generatePublicUrl() {
    try {
      const fileId = '1UyCB_INOv2aSUQ8GXm-aVGFEuZif0aOH';
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      }); //setting the image to be viewed by anyone who has the link
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  
//generatePublicUrl()