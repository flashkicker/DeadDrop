var dataRepo = require('../models/message.js');
const expect = require('chai').expect;

describe("DeadDrop DB Tests", function () {
    
    it("saveMessage", function (done) {
        dataRepo.saveMessage('15.545', '16.545', '2017-09-10 10:22:33', 'model unit test message', (err, result) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("getMessages_WithinASmallRange", () => {
        dataRepo.getMessages(15.545, 16.545, 15, (err, result) => {
            expect(err).not.to.exist;
            expect(result.data.messages[0].message.length).greaterThan(0);
            done();
        });
    });

    it("getMessages_WithinABigRange", () => {
        dataRepo.getMessages(44.56258, -123.25724, 150, (err, result) => {
            expect(err).to.not.exist;
            expect(result.data.messages[0].message.length).greaterThan(0);
            done();
        });
    });
});