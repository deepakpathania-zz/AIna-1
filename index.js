var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'abcd_efgh') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'Analyze') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'Hi') {
                sendTextMessage(sender, "Hello Sir, Good afternoon")
            }
            else if (text === 'How do you do ?') {
                sendTextMessage(sender, "With a tonn lot of code at the back end sir, what about you ?")
            }
            else if (text === 'Ok bye') {
                sendTextMessage(sender, "Have a nice day, Sir :)")
            }
            
            
            else {
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "CAAJbsw7irIIBACBlT3yZAIUr7w7538axZBAjxwIZBzu8CuMEi8cZAMuYynJR2iOij8Jy7WhtQIQLF4e61ZCVZAZBS5VQSga84EfNvqSUcvDeEEG62jyRXmwU2gaG5507xpAwrQmdYL2LZAC1lwo7SGwhqzlosdDaO6B8WBEWWpxNCVrJZCaPBprpBDcoZBugU2accZD";

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Popularity Perception",
                    "subtitle": "Popularity Perception Analyzer",
                    "image_url": "https://s3.amazonaws.com/media-p.slid.es/uploads/471316/images/2419155/graph.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "50.0000000129%"
                    }, {
                        "type": "postback",
                        "title": "Share",
                        "payload": "hello"
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}