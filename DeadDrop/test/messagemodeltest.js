var dataRepo = require('../models/message.js');
const expect = require('chai').expect;

describe("DeadDrop DB Tests", function () {
    
    it("saveMessage", function (done) {
        dataRepo.saveMessage('15.545', '16.545', '2017-09-10 10:22:33', 'model unit test message', (err, result) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("getMessages", function (done) {
        dataRepo.getMessages(15.545, 16.545, 10, (err, result) => {
            expect(err).not.to.exist;
            expect(result.length).greaterThan(0);
            done();
        });
    });
    
});