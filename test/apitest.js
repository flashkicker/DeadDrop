const superagent = require('superagent');
const chai = require('chai');
const expect = chai.expect;

var BASE_URL = 'http://localhost:443';

var username = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}

var testUser = {
    username: username(),
    password: 'kilroywashere'
}

var testUser_id = {}

var testItem = {
	data: {
		message: {
			message: "Hey, a new message!",
			timestamp: '2017-09-11 10:22:33',
			latitude: 62.233589156441724,
			longitude: 25.735066461654696
		}
	}
}

var testMessageDelete = {}

describe("DeadDrop service tests", () => {
    
    var token = '';
    
    it("Creates a user", (done) => {
        superagent.post(BASE_URL + '/user/register')
        .send(testUser)
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });
    
    it("Doesn't create a user that already exists", (done) => {
        superagent.post(BASE_URL + '/user/register')
        .send(testUser)
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(response.success).to.equal(false);
            done();
        });
    })
    
    it("Sends back token if login request is accepted", (done) => {
        superagent.post(BASE_URL + '/user/login')
        .send(testUser)
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            token = response.token;
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(response.token.length > 0);
            expect(res.status).to.equal(200);
            done();
        });
    })
    
    it("Sends back error message if login request contains invalid password", (done) => {
        var fakeTestUser = {
            username: 'kilroy',
            password: 'waskilroyhere'
        }
        superagent.post(BASE_URL + '/user/login')
        .send(fakeTestUser)
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(false);
            expect(res.status).to.equal(200);
            done();
        });
    })
    
    it("Sends back error message if username doesn't exist", (done) => {
        fakeTestUser = {
            username: 'kilroyy',
            password: 'waskilroyhere'
        }
        superagent.post(BASE_URL + '/user/login')
        .send(fakeTestUser)
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(false);
            expect(res.status).to.equal(200);
            done();
        });
    })
    
    it("Saves a message with token authentication", (done) => {
        superagent.post(BASE_URL + '/api/message')
        .send(testItem)
        .set('accept', 'json')
        .set('x-auth', token)
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });
    
    it("Doesn't save a message without a token", (done) => {
        superagent.post(BASE_URL + '/api/message')
        .send(testItem)
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(false);
            expect(res.status).to.equal(403);
            done();
        });
    });
    
    it("Doesn't save a message with an invalid token", (done) => {
        superagent.post(BASE_URL + '/api/message')
        .send(testItem)
        .set('accept', 'json')
        .set('x-auth', `abc${token}`)
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(false);
            expect(res.status).to.equal(403);
            done();
        });
    });

    it("Gets messages", (done) => {
        superagent.get(BASE_URL + '/api/message?latitude=5&longitude=6&range=5')
        .set('accept', 'json')
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });

    it("Gets all messages posted by a user", (done) => {
        superagent.get(BASE_URL + '/api/message/user')
        .set('accept', 'json')
        .set('x-auth', token)
        .end((err, res) => {
            var response = JSON.parse(res.text);
            testMessageDelete = {
                message: "hola",
                message_id: res.body.data.messages[0].message_id
            }
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });

    it("Gets user account info", (done) => {
        superagent.get(BASE_URL + '/user/me')
        .set('accept', 'json')
        .set('x-auth', token)
        .end((err, res) => {
            console
            testUser_id = {
                id: res.body.id
            }
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(res.body.username).to.equal(testUser.username);
            expect(res.status).to.equal(200);
            done();
        });
    });

    it("Edits a message posted by a user", (done) => {
        superagent.patch(BASE_URL + '/api/message')
        .send(testMessageDelete)
        .set('accept', 'json')
        .set('x-auth', token)
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });

    it("Deletes a message posted by a user", (done) => {
        superagent.delete(BASE_URL + '/api/message')
        .send(testMessageDelete)
        .set('accept', 'json')
        .set('x-auth', token)
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });

    it("Deletes a user account", (done) => {
        superagent.delete(BASE_URL + '/user/deleteAccount')
        .send(testUser_id)
        .set('accept', 'json')
        .set('x-auth', token)
        .end((err, res) => {
            var response = JSON.parse(res.text);
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(res.status).to.equal(200);
            done();
        });
    });
});
