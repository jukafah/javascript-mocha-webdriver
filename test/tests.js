var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

var driver;
var tapQA = 'http://www.tapqa.com';
var google = 'http://www.google.com';

test.describe('Google searching tapqa returns correct homepage', function() {
    this.timeout(15000);

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    test.after(function() {
        driver.quit();
    });

    test.it('Google homepage loads correctly', function() {
        driver.get(google);
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Google');
        });
    });

    function findtapQAlink() {
        return driver.findElements(webdriver.By.css('[href="http://www.tapqa.com/"]'))
            .then(function(result) {
            return result[0];
        });
    }

    function clickLink(link) {
        link.click();
    }

    test.it('Search for tapQA and click link', function() {
        driver.findElement(webdriver.By.name('q')).sendKeys('tapqa');
        driver.findElement(webdriver.By.name('btnG')).click();
        driver.wait(findtapQAlink, 10000).
            then(clickLink);
    });

    test.it('tap|QA homepage loads', function() {
        driver.getTitle().then(function(title) {
            assert.equal(title, 'tap|QA: Software Quality Assurance Testing Company in MN')
        });
    });
});

test.describe('tap|QA homepage', function() {
  this.timeout(15000);

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    test.after(function() {
        driver.quit();
    });

    test.it('tap|QA homepage loads correctly', function() {
        driver.get(tapQA);
        driver.getTitle().then(function(title) {
            assert.equal(title, 'tap|QA: Software Quality Assurance Testing Company in MN')
        });
    });

    test.it("Displays 'We test software.' in first header", function() {
      var title = driver.findElement(webdriver.By.xpath("//div[contains(@class, 'col-sm-8 col-sm-offset-2 text-center')]/h1"));
      title.getAttribute('innerText').then(function(title) {
          assert.equal(title, 'We test software.');
      });
    });

    test.it("Displays 'What quality concerns keep you up at night?' in second header", function() {
      var title = driver.findElement(webdriver.By.xpath("//div[contains(@class, 'col-sm-8 col-sm-offset-2 text-center')]/h2"));
      title.getAttribute('innerText').then(function(title) {
          assert.equal(title, 'What quality concerns keep you up at night?')
      });
    });
  });