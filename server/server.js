const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        clientId: '1aa4d54f09144ff598b474f7145975d2',
        clientSecret: 'bdbd6f22edc84b22bcb3826db2df5aab',
        redirectUri: 'http://localhost:3000'
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((e) => {
        res.sendStatus(400)
        // console.log(e);
    })
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
        clientId: '1aa4d54f09144ff598b474f7145975d2',
        clientSecret: 'bdbd6f22edc84b22bcb3826db2df5aab',
        redirectUri: 'http://localhost:3000',
        refreshToken
    })
    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        }).catch(() => {
            res.sendStatus(400)
        })
})
// console.log(accessToken);

app.listen(3001)