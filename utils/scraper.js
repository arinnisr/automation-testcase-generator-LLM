import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import createCsvWriter from 'csv-writer';

// Specify paths for ChromeDriver and Chrome binary
const CHROMEDRIVER_PATH = '/Users/ryan.i/downloads/arin/skripsi/chrome_things/chromedriver_mac64/chromedriver-mac-arm64/chromedriver';

// Function to start Selenium Server
var allScrapedData = []

export const scrapIt = async (url) => {
  let driver;
  try {
    const options = new chrome.Options();
    options.setChromeBinaryPath('/Users/ryan.i/Downloads/arin/skripsi/chrome_things/chrome-mac-arm64-new/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing')
    options.addArguments("--no-sandbox");
    options.addArguments("--headless=new")
    options.addArguments("--disable-gpu")
    options.addArguments("--disable-extension")
    driver = await new Builder()
      .usingServer('http://0.0.0.0:4444/wd/hub')
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(new chrome.ServiceBuilder(CHROMEDRIVER_PATH))
      .build();

    await driver.get(url);
    await driver.manage().addCookie({
      name: "JMWPHP",
      value: "qvggkba798hcr575np8cca993d"
    })
    const page = url;
    const inputs = [];
    const inputClassesAndIds = [];
    const inputRequiredFields = [];
    const inputLabels = [];

    const inputElements = await driver.findElements(By.css('input'));
    for (const element of inputElements) {
      let type = await element.getAttribute("type");
      if (!type) {
        type = "text";
      }

      let className = await element.getAttribute("class");
      if (!className) {
        className = "No class";
      }

      let id = await element.getAttribute("id");
      if (!id) {
        id = "No id";
      }

      let required = await element.getAttribute("required");
      if (required) {
        required = "Yes";
      } else {
        required = "No";
      }
      let label = "No label";
      try {
        const labelElement = await driver.findElement(By.css(`label[for='${id}']`));
        let labelText = await labelElement.getText();
        if (labelText) {
          label = labelText.trim();
        }
      } catch (err) {
        label = "No label";
      }

      inputs.push(type);
      inputClassesAndIds.push(`Class: ${className}, ID: ${id}`);
      inputRequiredFields.push(required);
      inputLabels.push(label);
    }

    const forms = [];
    const formElements = await driver.findElements(By.css('form'));
    for (const form of formElements) {
      let action = await form.getAttribute("action");
      if (!action) {
        action = "No action";
      }

      let method = await form.getAttribute("method");
      if (!method) {
        method = "GET";
      }

      forms.push(`Action: ${action}, Method: ${method}`);
    }

    const links = [];
    const linkTexts = [];
    const linkElements = await driver.findElements(By.css('a'));
    for (const element of linkElements) {
      let href = await element.getAttribute("href");
      let text = await element.getText();

      if (text) {
        text = text.trim();
      } else {
        text = "";
      }

      if (href && text) {
        links.push(href);
        linkTexts.push(text);
      }
    }

    const buttons = [];
    const buttonElements = await driver.findElements(By.css('button'));
    for (const button of buttonElements) {
      let type = await button.getAttribute("type");
      if (!type) {
        type = "button";
      }

      let buttonText = await button.getText();
      if (buttonText) {
        buttonText = buttonText.trim();
      } else {
        buttonText = "No text";
      }

      buttons.push(`Type: ${type}, Text: ${buttonText}`);
    }

    const headings = [];
    const headingElements = await driver.findElements(By.css('h1, h2, h3, h4, h5, h6'));
    for (const element of headingElements) {
      let headingText = await element.getText();
      if (headingText) {
        headings.push(headingText.trim());
      }
    }

    // Extract images
    const images = [];
    const imageElements = await driver.findElements(By.css('img'));
    for (const element of imageElements) {
      let src = await element.getAttribute("src");
      let alt = await element.getAttribute("alt");

      if (!alt) {
        alt = "No alt text";
      }

      images.push(`Src: ${src}, Alt: ${alt}`);
    }

    const data = [
      { category: 'Page URL', value: page },
      { category: 'Inputs (Types)', value: inputs.join(', ') },
      { category: 'Input Classes/IDs', value: inputClassesAndIds.join(', ') },
      { category: 'Input Required Fields', value: inputRequiredFields.join(', ') },
      { category: 'Input Labels', value: inputLabels.join(', ') },
      { category: 'Forms', value: forms.join(', ') },
      { category: 'Links', value: links.join(', ') },
      { category: 'Link Texts', value: linkTexts.join(', ') },
      { category: 'Buttons', value: buttons.join(', ') },
      { category: 'Headings', value: headings.join(', ') },
      { category: 'Images', value: images.join(', ') },
    ];

    allScrapedData.push(...data);
    await saveToCsv('qa_testing_data.csv', data);

    console.log('QA testing data saved to qa_testing_data.csv');
    return data;

      } catch (error) {
        console.error('Error scraping website:', error);
        throw new Error('Failed to scrape the website.');
      } finally {
        if (driver) {
          await driver.quit();
        }
      }
};

const saveToCsv = async (filename) => {
  const csvWriter = createCsvWriter.createObjectCsvWriter({
    path: filename,
    header: [
      { id: 'category', title: 'Category' },
      { id: 'value', title: 'Value' },
    ],
  });

  try {
    await csvWriter.writeRecords(allScrapedData);
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving to ${filename}:`, error.message);
    throw new Error('Failed to save data to CSV.');
  }
};
