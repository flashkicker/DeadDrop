var userRepo = require('../models/user.js');
const expect = require('chai').expect;

describe("DeadDrop Create User Test", () => {
    it("createUser", (done) => {
        userRepo.createUser('test-user2', 'thisisagreatpassword', (err, result) => {
            expect(err).to.not.exist;
            done();
        });
    });
});