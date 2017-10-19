var selenium = require('selenium-webdriver'); // remember to npm install...
var By = selenium.By;
var test = require('selenium-webdriver/testing'); // nb: selenium is not quite compatible with mocha, and this bridge will cover the differences
const expect = require('chai').expect;

var browser;
test.before(function () {
    this.timeout(10000); // timeout for running the tests
    browser = new selenium.Builder()
      .withCapabilities(selenium.Capabilities.chrome())
      .build();
  });
test.after(function () {
      browser.quit();
});

test.describe("DeadDrop testing", function () {
    test.it("should be able to access home page", function (done) {
        browser.get('http://localhost:443/');
        done();
    });
    test.it("should be able to scroll up and down", function (done) {
        browser.executeScript("window.scroll(0, 1000);");
        browser.sleep(1000);
        browser.executeScript("window.scroll(0, -1000);");
        done();
    });
    test.it("View messages in location", function (done) {
        var view = browser.findElement(selenium.By.id("list"));
        browser.sleep(1500);
        if(!view) throw new Error('No messages')
        //expect.apply(err).not.to.exist;
        done();
    });
    test.it("navigating back to home page", function (done){
        browser.sleep(1500);
        var home = browser.findElement(selenium.By.className("btn"));
        home.click();
        var logo = browser.findElement(selenium.By.id("logo"));
        if(!logo) throw new Error('Error in navigating to home page')
        done();
    });
    test.it("should be able to click logo", function(done) {
        var logo = browser.findElement(selenium.By.id("logo"));
        logo.click();
        done();
    });
    test.it("should open create message view", function (done) {
       var ele = browser.findElement(selenium.By.id("create"));
       if(!ele) throw new Error('not opened')
       done();  
    });
    test.it("should write message",function (done) {
        var inputfield = browser.findElement(selenium.By.name("message"));
        inputfield.clear();
        inputfield.sendKeys("I am testing");
        var insubmit = browser.findElement(selenium.By.id("create-submit"));
        insubmit.click();
        browser.sleep(1500);
        done();
    });
    });