import {getFirestore} from 'firebase-admin/firestore'
var admin = require("firebase-admin");
var serviceAccount = 
{
  "type": "service_account",
  "project_id": "tinamys-89aa9",
  "private_key_id": "a06ad67e21d3e1037a4aa234fe35e806afc73533",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDne53OBatbjiWi\n6WRSdODJXfDDolv+koPZLXMvPE6g35NPqcoD4cSDUyPVPciRyHqsun+fTDFY5PaW\n4JPxKaEnAK+VP/posavIQB4IqxUb63L7uSDPoLTlIxC5Kyt7y9sky+5wUdNyYO3X\nGl+eb+81O2V3ryHYFxKGq5eFSl9xJU8Q80G5UgV0G8dVxYJmxEEdsBzPHcLk9Wez\nmdcBQjL9wQd5XKxflhc8pA7rM0ZP6QRgCD9tPoOQp4yctdklx6g7xmB3cWk9rdpu\nf4mD7n8Xn+/LmNIhNY6Xe2gYE4p8Hap3WftjDrPuRtqXUaw3OFE0LX6NELVtnIFk\npyr2wZAPAgMBAAECggEASzCAjCSUSgtslzO3Vf9H6rCcXXd16UVfFWKpeOzeX2vv\n1h8BEuy5H60YRRIp/YyAqG11ueEOYGES5eQxudJ7WYdkARdEd9BKS6Pj/Y3Qr/51\nHWW/TiHV0F3o9zSaDb6kQpoJK6uwgoUQjF+xMm4KZaCS72LQG/g2mM7Qy0dipAXL\nryTeJiiiLXmy3dE9335gu7DOkZzDVSdIynQTSlsc96/d3Bc41YDF/qxs0a0G8/PT\nMvvTKdXHM7Q6NY9KbnGKeXgqJ6KKnmO3UE/u26ruhpdvwriLalKdkunoJaEfNPha\n8G6oPGXaB93LNG5Wwc0/9DSCr91mYh1QG/1Ay81bXQKBgQD4+aa/2tBvmRzH3I8M\nrN/kB2If19AYKHoTIfx3PjPA1hUiCEy2EKWgZb1nklxbhG3y0GmBleyzKwLqubZE\nKQsl8pKu0dzi4GeHR++R4CFCTseHcf6YIrkytEo8YySE78KoM/5tXRoMQXqBDoWY\naWdImP+UDyPBpIi5iMIYdyYpowKBgQDuA54x/kTf+bMUqziLR5Vc+NjMnHG3DT1n\napxNA7VfZzAblR1lWiuPKAWxRey7ASFzQt7zphYlvRV0LE1GZs+Cv7JkAR/fBpIG\nZsJjvrGqd0ZIkFcjhoDuFEaYEjcBGPwh0MGaoCyIrP+v61SRfw8rBMXMLqmJ2YUu\ngHne2lP+pQKBgEQY3F/bNGlhonqTu9iGrBINZuw4teT1pTX4dLoUnEkhBNSzGnAt\nq29shFqAsJwjY4MnN8RGwl/a4shalRydcTwm1bHVGqo/IHHi3gazG8WsEGzeY/ku\nfiL9JtTPdRybC03AMtWswkQZ4KzN0QJ3ydUUa8sOPQRowTCl1Bim9hwrAoGAX8QC\n5biZ+8hbPqi5woiV12eky4by1iU0nKSvqOkiE/XPzHlN75a9Sgdfavloi8GjtN2m\nGUCtTpfqxuiAWyBIxCHfZA9zxGe/X2X/NuTmVWFSXSX+eaPHwoNT+CH0EbP81ppJ\nG67w3DlHU4ALcdM+xh9QepwXyQhFZvV4k6si+qUCgYB9XNuJVDphJ121JkhNIMM5\n6Gwe1T31UcWDoNNWBauzBQxBcQqZeh/nePvnXhtKjEwI85/EC3KBtZClUgImPfMF\nhhTQoKSK3M4Kjn/RCj6RpqL3MQl7TnmryU0+Xv3/qcoRYhXsEApEYceG5cptjONM\nXMFDUKHNrcStT1xK24wzWw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fzt9p@tinamys-89aa9.iam.gserviceaccount.com",
  "client_id": "106875592709884436831",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fzt9p%40tinamys-89aa9.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = getFirestore();

export default admin
