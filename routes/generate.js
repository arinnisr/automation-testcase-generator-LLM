import express from 'express';
import { scrapIt } from '../utils/scraper.js'; // Assuming scraper logic is in a utility file
import fs, { link } from 'fs';
import csv from 'csv-parser';
import { getGroqChatCompletion } from '../utils/groq.js';
import multer from 'multer';
import { parse } from 'json2csv';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Route to process the scraping and test case generation
router.post('/', upload.single('file'), async (req, res) => {
    const { url } = req.body;
    const file = req.file;
    const csvData = [];

    try {
        let csvStream;

        if (file) {
            // Use the uploaded file's path
            csvStream = fs.createReadStream(file.path);
        } else {
            if (!url) {
                return res.status(400).json({ error: 'URL is required if no file is provided.' });
            }

            console.time("scraping")
            console.log(await scrapIt(url))
            
            // const initialScrap = await scrapIt(url)
            
            
            // const linkFound = initialScrap[6].value.split(",")

            // linkFound.forEach(async i => {

            //     console.log(await scrapIt(i))
            // });
            
            console.timeEnd("scraping")
        }
            
            
        csvStream = fs.createReadStream('qa_testing_data.csv');
        
        
        // Process the CSV data
        csvStream
            .pipe(csv())
            .on('data', (row) => csvData.push(row))
            .on('end', async () => {
                try {
                    // console.log(csvData);
                    
                    // Generate test cases with Groq API
                    console.time("groqResponse")
                    const groqResponse = await getGroqChatCompletion(
                        `Generate test cases that contain "Feature", "Description", "Scenario", and "Expected Results" based on the following scraped data:
                        ${JSON.stringify(csvData)}
                        Ensure that:
                        - The test cases match the style and terminology of the manual test cases.
                        - The format follows the structure of the provided manual test cases.
                        - Avoid using technical UI inspection language and focus on user interaction.
                        Once done, generate a Cypress automation script for the test cases.
                        - Separate each test case with ---TEST CASE---
                        - Separate the automation script with ---SCRIPT--- at the start and end of the script`
                    );
                    console.log(`Generate test cases that contain "Feature", "Description", "Scenario", and "Expected Results" based on the following scraped data:
                        ${JSON.stringify(csvData)}
                        Ensure that:
                        - The test cases match the style and terminology of the manual test cases.
                        - The format follows the structure of the provided manual test cases.
                        - Avoid using technical UI inspection language and focus on user interaction.
                        Once done, generate a Cypress automation script for the test cases.
                        - Separate each test case with ---TEST CASE---
                        - Separate the automation script with ---SCRIPT--- at the start and end of the script`)
                    const resultGroq = groqResponse || 'No response from the model.';
                    const cleanedResponse = cleanText(groqResponse.message);
                    const [testCaseText, testScriptText] = cleanedResponse.split('---SCRIPT---');
                    console.log(testCaseText)
                    const testCases = parseTestCases(testCaseText);
                    console.timeEnd("groqResponse")
                    
                    console.time("save testcase to CSV")
                    saveTestCasesToCSV(testCases);
                    console.timeEnd("save testcase to CSV")

                    console.time("save automation script txt")
                    saveTestScript(testScriptText);
                    console.timeEnd("save automation script txt")

                    res.render('results', { title: 'Scrape Results', data: csvData, resultGroq});
                } catch (groqError) {
                    console.error('Error communicating with Groq API:', groqError.message);
                    res.status(500).json({ error: 'Failed to process test case generation.' });
                }
            })
            .on('error', (err) => {
                console.error('Error reading the CSV file:', err.message);
                res.status(500).json({ error: 'Error reading CSV data.' });
            });
    } catch (error) {
        console.error('Error processing the request:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

function cleanText(text) {
    return text
        .replace(/&quot;/g, '"')  // Convert encoded double quotes
        .replace(/&#39;/g, "'")  // Convert encoded single quotes
        .replace(/&gt;/g, '>')   // Convert greater-than
        .replace(/&lt;/g, '<')   // Convert less-than
        .replace(/&amp;/g, '&')  // Convert ampersand
        .trim();
}

function parseTestCases(text) {
    return text.split('---TEST CASE---').map((caseText) => {
        caseText = cleanText(caseText.trim());
        if (!caseText) return null;

        try {
            // Extract JSON content safely
            const jsonMatch = caseText.match(/{[\s\S]*}/);
            if (!jsonMatch) {
                console.warn("Skipping invalid test case format:", caseText);
                return null;
            }
            let jsonStr = jsonMatch[0];

            // Fix multiline strings for proper JSON parsing
            jsonStr = jsonStr.replace(/\n\s+/g, ' '); // Convert newlines inside values to spaces

            return JSON.parse(jsonStr);
        } catch (error) {
            console.error('Error parsing test case JSON:', error.message, "\nProblematic text:", caseText);
            return null;
        }
    }).filter(tc => tc); // Remove null values
}

function saveTestCasesToCSV(testCases) {
    const csvFields = ['Feature', 'Description', 'Scenario', 'Expected Results'];
    try {
        const csvData = parse(testCases, { fields: csvFields });
        fs.writeFileSync('test-case.csv', csvData, 'utf8');
        console.log('✅ Test cases saved to test-case.csv');
    } catch (error) {
        console.error('Error saving test cases to CSV:', error.message);
    }
}


function saveTestScript(scriptText) {
  // Remove HTML tags
  const cleaned = scriptText
    .replace(/<\/?[^>]+(>|$)/g, '') // strip all HTML tags
    .trim();

  fs.writeFileSync('test-script.cy.js', cleaned, 'utf8');
  console.log('✅ Test script saved to test-script.cy.js');
}

export default router;

