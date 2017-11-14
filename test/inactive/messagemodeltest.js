var dataRepo = require('../models/message.js');
const expect = require('chai').expect;

describe("DeadDrop DB Tests", function () {
    
    it("Saves a message in the database", function (done) {
        dataRepo.saveMessage('15.545', '16.545', '2017-09-10 10:22:33', 'Database test message', '99', 'kilroy', (err, result) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("Gets messages within a small range", () => {
        dataRepo.getMessages(15.545, 16.545, 15, (err, result) => {
            expect(err).not.to.exist;
            expect(result.data.messages[0].message.length).greaterThan(0);
            done();
        });
    });

    it("Gets messages within a big range", () => {
        dataRepo.getMessages(44.56258, -123.25724, 150, (err, result) => {
            expect(err).to.not.exist;
            expect(result.data.messages[0].message.length).greaterThan(0);
            done();
        });
    });
});