const superagent = require('superagent');
const chai = require('chai');
const expect = chai.expect;

var BASE_URL = 'http://localhost:443';

var testUser = {
    username: 'testuser',
    password: 'kilroywashere'
}

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

describe("DeadDrop Service - GET Tests", () => {
    it("Get Messages", (done) => {
        superagent.get(BASE_URL + '/api/message?latitude=5&longitude=6&range=5').end((err, res) => {
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.exist;
            done();
        });
    });
});

describe("DeadDrop Service - POST Tests", () => {
    it("Save Message", (done) => {
        superagent.post(BASE_URL + '/api/message')
            .send(testItem)
            .set('accept', 'json')
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Create User", (done) => {
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

    it("Doesn't create user that already exists", (done) => {
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
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(response.success).to.equal(true);
            expect(response.token.length > 0);
            expect(res.status).to.equal(200);
            done();
        });
    })

    it("Sends back error message if login request contains invalid password", (done) => {
        testUser = {
            username: 'kilroy',
            password: 'waskilroyhere'
        }
        superagent.post(BASE_URL + '/user/login')
        .send(testUser)
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
        testUser = {
            username: 'kilroyy',
            password: 'waskilroyhere'
        }
        superagent.post(BASE_URL + '/user/login')
        .send(testUser)
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
});
