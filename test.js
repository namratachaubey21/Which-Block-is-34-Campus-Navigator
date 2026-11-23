/**
 * Automated Production Test Suite for LPU Campus Navigator
 * Tests graph integrity, shortest-path computations, student profiles, and survey data
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  campusNodes,
  campusGraph,
  calculateShortestPath,
  generatePathToBlock34,
  generatePathToBlock36,
  generatePathToBlock37,
  mockUmsStudents
} = require('./app.js');

console.log('🧪 Starting LPU Campus Navigator Automated Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// 1. Campus Graph Nodes
runTest('Campus graph nodes must contain valid coordinates and types', () => {
  const nodeKeys = Object.keys(campusNodes);
  assert(nodeKeys.length >= 20, `Expected at least 20 nodes, got ${nodeKeys.length}`);
  
  nodeKeys.forEach(key => {
    const node = campusNodes[key];
    assert.strictEqual(node.id, key);
    assert(typeof node.x === 'number' && node.x >= 0 && node.x <= 1000, `Invalid X coord for ${key}`);
    assert(typeof node.y === 'number' && node.y >= 0 && node.y <= 700, `Invalid Y coord for ${key}`);
    assert(node.name && node.name.length > 0, `Missing name for ${key}`);
  });
});

// 2. Campus Graph Edges
runTest('All graph edges must connect existing nodes with positive distance', () => {
  assert(campusGraph.length > 0, 'Graph has no edges');

  campusGraph.forEach((edge, idx) => {
    assert(campusNodes[edge.u], `Edge #${idx} references unknown node u: ${edge.u}`);
    assert(campusNodes[edge.v], `Edge #${idx} references unknown node v: ${edge.v}`);
    assert(typeof edge.dist === 'number' && edge.dist > 0, `Edge #${idx} has invalid distance: ${edge.dist}`);
    assert(edge.desc && edge.desc.length > 0, `Edge #${idx} missing navigation description`);
  });
});

// 3. Compulsory Pathway 1: Block 34
runTest('Compulsory Pathway to Block 34 (Floor 5) from Gate 1 must compute accurately', () => {
  const route = generatePathToBlock34('gate1');
  assert(route !== null, 'Route to Block 34 returned null');
  assert.strictEqual(route.path[0], 'gate1');
  assert.strictEqual(route.path[route.path.length - 1], 'b34_floor5');
  assert(route.totalDist > 0, `Distance should be > 0, got ${route.totalDist}`);
  assert(route.estMinutes > 0, `Minutes should be > 0, got ${route.estMinutes}`);
  assert(route.path.includes('b34_ground'), 'Path to Floor 5 must traverse Block 34 ground hub');
  assert(route.path.includes('b34_lift'), 'Path to Floor 5 must use Lift Bank B');
});

// 4. Compulsory Pathway 2: Block 36
runTest('Compulsory Pathway to Block 36 (Lecture Theatres) must compute accurately', () => {
  const route = generatePathToBlock36('gate1');
  assert(route !== null, 'Route to Block 36 returned null');
  assert.strictEqual(route.path[0], 'gate1');
  assert.strictEqual(route.path[route.path.length - 1], 'b36_ground');
  assert(route.path.includes('b36_ground'), 'Path must terminate at Block 36 ground');
});

// 5. Compulsory Pathway 3: Block 37 (Hidden North Wing)
runTest('Compulsory Pathway to Block 37 (Hidden North Wing) must utilize the North breezeway', () => {
  const route = generatePathToBlock37('gate1');
  assert(route !== null, 'Route to Block 37 returned null');
  assert.strictEqual(route.path[0], 'gate1');
  assert.strictEqual(route.path[route.path.length - 1], 'b37_entrance');
  // Must use Block 35 north junction or Block 36 north breezeway
  const usesBreezeway = route.path.includes('b35_north_junction') || route.path.includes('b36_north_breezeway');
  assert(usesBreezeway, 'Path to Block 37 must use an indoor breezeway corridor');
});

// 6. UMS Student Accounts & Profiles
runTest('All CA2 Team Members must be present in mock UMS accounts with valid timetables', () => {
  const expectedRegs = ['12500025', '12526252', '12504556', '11218773'];
  
  expectedRegs.forEach(reg => {
    const student = mockUmsStudents[reg];
    assert(student, `Missing student account for reg: ${reg}`);
    assert(student.name && student.name.length > 0);
    assert(student.rollNo && student.rollNo.length > 0);
    assert(Array.isArray(student.timetable) && student.timetable.length >= 3, `Student ${reg} must have at least 3 classes`);
  });
});

// 7. Survey Research Data Integrity
runTest('survey_data.json must exist and contain exactly 16 verified questionnaire responses', () => {
  const filePath = path.join(__dirname, 'survey_data.json');
  assert(fs.existsSync(filePath), 'survey_data.json is missing');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  assert.strictEqual(data.responses.length, 16, `Expected 16 responses, got ${data.responses.length}`);
  assert.strictEqual(data.survey_metadata.sample_size, 16);
});

// 8. Accessibility Modes
runTest('Accessible routing mode should discourage stairways', () => {
  const normalRoute = calculateShortestPath('gate1', 'b34_floor5', 'normal');
  const accessibleRoute = calculateShortestPath('gate1', 'b34_floor5', 'accessible');
  assert(normalRoute !== null && accessibleRoute !== null);
  assert(accessibleRoute.path.includes('b34_lift'), 'Accessible route must use elevator');
});

// 9. Static Assets & Manifest
runTest('Production PWA manifest and icons must exist', () => {
  assert(fs.existsSync(path.join(__dirname, 'manifest.json')), 'manifest.json missing');
  assert(fs.existsSync(path.join(__dirname, 'sw.js')), 'sw.js missing');
  assert(fs.existsSync(path.join(__dirname, 'icon-192.svg')), 'icon-192.svg missing');
  assert(fs.existsSync(path.join(__dirname, 'icon-512.svg')), 'icon-512.svg missing');
});

console.log(`\n📊 Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests/totalTests)*100)}% Success Rate)\n`);

if (passedTests === totalTests) {
  console.log('🎉 All production verification tests passed successfully!');
  process.exit(0);
} else {
  console.error('⚠️ Some tests failed. Please inspect logs.');
  process.exit(1);
}
