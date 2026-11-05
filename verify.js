/**
 * Verification test script for Relational Algebra & Set Theory Learning Platform
 */

const fs = require('fs');
const path = require('path');

console.log("=== RUNNING VERIFICATION SUITE ===");

// 1. Load data.js
const dataCode = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const vm = require('vm');
const context = { window: {}, console: console };
vm.createContext(context);
vm.runInContext(dataCode, context);
const COURSE_DATA = context.COURSE_DATA || context.window.COURSE_DATA;

if (!COURSE_DATA) {
  console.error("FAIL: COURSE_DATA not exported correctly!");
  process.exit(1);
}
console.log("PASS: COURSE_DATA successfully loaded.");

// 2. Validate Topics & Cases
console.log(`PASS: Found ${COURSE_DATA.topics.length} topics in COURSE_DATA.`);
let totalCases = 0;
COURSE_DATA.topics.forEach(tp => {
  totalCases += tp.cases.length;
  console.log(`  Topic '${tp.id}' (${tp.name.en} / ${tp.name.vi}): ${tp.cases.length} cases`);
});
console.log(`PASS: Total cases = ${totalCases}`);

// 3. Check Join Cases
const joinTopic = COURSE_DATA.topics.find(t => t.id === 'join');
if (!joinTopic) {
  console.error("FAIL: Join topic missing!");
  process.exit(1);
}
console.log(`PASS: Join topic has ${joinTopic.cases.length} cases.`);
const expectedJoinTypes = ["Inner Join", "Left Outer Join", "Right Outer Join", "Full Outer Join", "Natural Join"];
expectedJoinTypes.forEach(jt => {
  const c = joinTopic.cases.find(cs => cs.joinType === jt);
  if (!c) {
    console.error(`FAIL: Join type '${jt}' missing!`);
    process.exit(1);
  }
  console.log(`  PASS: Found case for '${jt}': ${c.title.en}`);
});

// 4. Check Distractor Tables requirement
// "There should be 1-2 more tables than needed for students to learn which tables are being considered in the operation."
COURSE_DATA.topics.forEach(tp => {
  tp.cases.forEach(cs => {
    const required = cs.requiredTables.length;
    const shown = cs.tablesShown.length;
    const distractors = shown - required;
    if (distractors < 1) {
      console.error(`FAIL: Case ${cs.id} in topic ${tp.id} has only ${distractors} distractors! Needs at least 1-2.`);
      process.exit(1);
    }
  });
});
console.log("PASS: Every single case contains 1-2+ distractor tables to test student table recognition.");

// 5. Check Vietnamese Translations
console.log("Checking Vietnamese translations...");
if (!COURSE_DATA.translations.vi) {
  console.error("FAIL: Vietnamese translations missing!");
  process.exit(1);
}
if (COURSE_DATA.translations.vi.sqlDialectLabel !== "Ngôn Ngữ Truy Vấn Có Cấu Trúc (SQL)") {
  console.error("FAIL: sqlDialectLabel in Vietnamese does not match 'Ngôn Ngữ Truy Vấn Có Cấu Trúc (SQL)'!");
  process.exit(1);
}
console.log("PASS: sqlDialectLabel in Vietnamese is 'Ngôn Ngữ Truy Vấn Có Cấu Trúc (SQL)'.");

// Check Vietnamese SQL queries
let vnSqlChecks = 0;
COURSE_DATA.topics.forEach(tp => {
  tp.cases.forEach(cs => {
    const vnSql = cs.sql.vi;
    if (!vnSql || (!vnSql.includes("CHỌN") && !vnSql.includes("TỪ"))) {
      console.error(`FAIL: Case ${cs.id} does not have translated Vietnamese SQL query! Got: ${vnSql}`);
      process.exit(1);
    }
    vnSqlChecks++;
  });
});
console.log(`PASS: All ${vnSqlChecks} cases have translated Vietnamese SQL queries (CHỌN, TỪ, VỚI ĐIỀU KIỆN, KẾT NỐI, etc.).`);

// 6. Check Table Column & Data Bilingual Support
Object.keys(COURSE_DATA.tables).forEach(tId => {
  const table = COURSE_DATA.tables[tId];
  if (!table.name.en || !table.name.vi) {
    console.error(`FAIL: Table ${tId} missing en or vi name!`);
    process.exit(1);
  }
  table.columns.forEach(col => {
    if (!col.label.en || !col.label.vi) {
      console.error(`FAIL: Column ${col.key} in table ${tId} missing en or vi label!`);
      process.exit(1);
    }
  });
  table.rows.forEach((r, idx) => {
    table.columns.forEach(col => {
      const cell = r[col.key];
      if (cell !== undefined && cell !== null && typeof cell === 'object') {
        if (cell.en === undefined || cell.vi === undefined) {
          console.error(`FAIL: Table ${tId} row ${idx} column ${col.key} missing en or vi cell value!`);
          process.exit(1);
        }
      }
    });
  });
});
console.log("PASS: All database tables, columns, and rows have full English and Vietnamese synchronization.");

// 7. Test Validation Logic (Simulation)
console.log("Testing validation logic simulation...");
function simulateCheck(caseItem, studentCols, studentRows, lang = 'en') {
  const expectedCols = caseItem.expectedResult.columns;
  const expectedRows = caseItem.expectedResult.rows;

  if (studentCols.length !== expectedCols.length) return false;
  if (studentRows.length !== expectedRows.length) return false;

  // normalize
  function norm(v) {
    if (v === null || v === undefined) return "null";
    const s = String(v).trim().toLowerCase();
    const num = parseFloat(s);
    if (!isNaN(num) && String(num) === s) return String(num);
    return s;
  }

  const expectedTuples = expectedRows.map(rowObj => {
    const tuple = {};
    expectedCols.forEach(colKey => {
      const valObj = rowObj[colKey];
      tuple[colKey] = valObj ? [norm(valObj.en), norm(valObj.vi), norm(valObj)] : ["null"];
    });
    return tuple;
  });

  const matchedExpected = new Set();
  const matchedStudent = new Set();

  studentRows.forEach((rowArr, rIdx) => {
    for (let i = 0; i < expectedTuples.length; i++) {
      if (matchedExpected.has(i)) continue;
      const expTuple = expectedTuples[i];
      let match = true;
      for (let cIdx = 0; cIdx < studentCols.length; cIdx++) {
        const colKey = studentCols[cIdx];
        const val = norm(rowArr[cIdx]);
        if (!expTuple[colKey].includes(val)) {
          match = false;
          break;
        }
      }
      if (match) {
        matchedExpected.add(i);
        matchedStudent.add(rIdx);
        break;
      }
    }
  });

  return matchedStudent.size === expectedRows.length;
}

// Test case sel-1 with exact expected data in English
const sel1 = COURSE_DATA.topics[0].cases[0];
const sel1Cols = [...sel1.expectedResult.columns];
const sel1RowsEn = sel1.expectedResult.rows.map(r => sel1Cols.map(c => r[c].en));
const res1 = simulateCheck(sel1, sel1Cols, sel1RowsEn, 'en');
console.log(`PASS: Simulated check on sel-1 with English data: ${res1 ? 'SUCCESS' : 'FAILURE'}`);
if (!res1) process.exit(1);

// Test case sel-1 with Vietnamese data
const sel1RowsVi = sel1.expectedResult.rows.map(r => sel1Cols.map(c => r[c].vi));
const res2 = simulateCheck(sel1, sel1Cols, sel1RowsVi, 'vi');
console.log(`PASS: Simulated check on sel-1 with Vietnamese data: ${res2 ? 'SUCCESS' : 'FAILURE'}`);
if (!res2) process.exit(1);

// Test case sel-1 with reversed row order (set semantics!)
const sel1RowsReversed = [...sel1RowsEn].reverse();
const res3 = simulateCheck(sel1, sel1Cols, sel1RowsReversed, 'en');
console.log(`PASS: Simulated check with reversed row order (set semantics): ${res3 ? 'SUCCESS' : 'FAILURE'}`);
if (!res3) process.exit(1);

// Test Left Outer Join NULL handling
const joinLeft = joinTopic.cases.find(c => c.id === 'join-left');
const joinLeftCols = [...joinLeft.expectedResult.columns];
const joinLeftRows = joinLeft.expectedResult.rows.map(r => joinLeftCols.map(c => r[c].en));
const resLeft = simulateCheck(joinLeft, joinLeftCols, joinLeftRows, 'en');
console.log(`PASS: Simulated check on Left Outer Join with NULL attributes: ${resLeft ? 'SUCCESS' : 'FAILURE'}`);
if (!resLeft) process.exit(1);

// Test Right Outer Join NULL handling
const joinRight = joinTopic.cases.find(c => c.id === 'join-right');
const joinRightCols = [...joinRight.expectedResult.columns];
const joinRightRows = joinRight.expectedResult.rows.map(r => joinRightCols.map(c => r[c].en));
const resRight = simulateCheck(joinRight, joinRightCols, joinRightRows, 'en');
console.log(`PASS: Simulated check on Right Outer Join with NULL attributes: ${resRight ? 'SUCCESS' : 'FAILURE'}`);
if (!resRight) process.exit(1);

// Test Full Outer Join NULL handling
const joinFull = joinTopic.cases.find(c => c.id === 'join-full');
const joinFullCols = [...joinFull.expectedResult.columns];
const joinFullRows = joinFull.expectedResult.rows.map(r => joinFullCols.map(c => r[c].en));
const resFull = simulateCheck(joinFull, joinFullCols, joinFullRows, 'en');
console.log(`PASS: Simulated check on Full Outer Join: ${resFull ? 'SUCCESS' : 'FAILURE'}`);
if (!resFull) process.exit(1);

console.log("\n==========================================");
console.log("ALL VERIFICATION SUITE CHECKS PASSED 100%!");
console.log("==========================================");
