const pgQuery = require('pg-query-emscripten');
const fs = require('fs');

const sql = fs.readFileSync('master_schema.sql', 'utf8');

const result = pgQuery.parse(sql);
if (result.error) {
    console.log("Parse Error:", result.error);
} else {
    console.log("No syntax errors found by parser.");
}
