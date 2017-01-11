var assert      = require('assert'),
    test        = require('selenium-webdriver/testing'),
    webdriver   = require('selenium-webdriver'),
    chrome      = require('selenium-webdriver/chrome'),
    path        = require('chromedriver').path;

var driver;
var tapQA = 'http://www.tapqa.com';
var google = 'http://www.google.com';

test.describe('Google searching tapqa returns correct homepage', function() {
    this.timeout(15000);

    // Runs before each test
    test.before(function() {
        // local chromedriver
        var service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    // Runs after each test
    test.after(function() {
        driver.quit();
    });

    // Test with typically 1 validation
    test.it('Google homepage loads correctly', function() {
        driver.get(google);
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Google');
        });
    });

    // Finds and clicks link
    test.it('Search for tapQA and click link', function() {
        driver.findElement(webdriver.By.name('q')).sendKeys('tapqa');
        driver.findElement(webdriver.By.name('btnG')).click();
        driver.wait(findtapQAlink, 10000).
            then(clickLink);
    });

    // Asserts correct title
    test.it('tap|QA homepage loads', function() {
        driver.getTitle().then(function(title) {
            assert.equal(title, 'tap|QA - Software Testing, Continuous Integration, Selenium')
        });
    });

    // iterate results
    function findtapQAlink() {
        return driver.findElements(webdriver.By.css('[href="http://www.tapqa.com/"]'))
            .then(function(result) {
            return result[0];
        });
    }

    // click links
    function clickLink(link) {
        link.click();
    }
});