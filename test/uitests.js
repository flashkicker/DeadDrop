var createform = require('../public/javascripts/createsubmit.js');
const expect = require('chai').expect;

describe("UI Tests", function () {
    
    it("getting timestamp", function (done) {
        var timestamp = createform.getTimestamp();
        console.log('timestamp is '+timestamp);
        if (!timestamp) throw new Error("Error in getting timestamp");
        done();
    });
});