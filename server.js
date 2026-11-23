/**
 * LPU Campus Navigator Production Server
 * REST API Backend & Static Frontend Host
 * Dual Mode: Express.js (High Performance) + Native Node.js HTTP Fallback
 */

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// In-memory student datastore (synced with app.js)
let studentsData = {
  '12500025': {
    regNo: '12500025',
    rollNo: '25',
    name: 'Namrata Kumari',
    role: 'Group Leader',
    email: 'namratakumari2211@gmail.com',
    program: 'B.Tech Computer Science & Engineering',
    section: 'K23DT',
    defaultHostel: 'hostels_gh',
    timetable: [
      { id: 'c1', time: '09:00 AM', course: 'CSE326: Computer Networks Lab', blockId: 'b34_floor5', room: '34-502 (Floor 5)', type: 'Lab', instructor: 'Dr. Sharma' },
      { id: 'c2', time: '11:30 AM', course: 'INT213: Design Thinking & Algorithms', blockId: 'b36_ground', room: '36-204 (Audi)', type: 'Lecture', instructor: 'Prof. J. Singh' },
      { id: 'c3', time: '02:00 PM', course: 'CAP412: Multimedia & UI/UX Studio', blockId: 'b37_entrance', room: '37-302 (North Wing)', type: 'Studio', instructor: 'Prof. Ananya' }
    ]
  },
  '12526252': {
    regNo: '12526252',
    rollNo: '28',
    name: 'Shahzadi.c',
    role: 'Team Member',
    email: 'shahzadi@lpu.in',
    program: 'B.Tech Computer Science & Engineering',
    section: 'K23DT',
    defaultHostel: 'hostels_gh',
    timetable: [
      { id: 'c1', time: '09:00 AM', course: 'CSE326: Computer Networks Lab', blockId: 'b34_floor5', room: '34-508 (Floor 5)', type: 'Lab', instructor: 'Dr. Sharma' },
      { id: 'c2', time: '11:30 AM', course: 'INT213: Design Thinking', blockId: 'b36_ground', room: '36-102 (Floor 1)', type: 'Lecture', instructor: 'Prof. J. Singh' },
      { id: 'c3', time: '02:00 PM', course: 'CAP412: Creative Media', blockId: 'b37_entrance', room: '37-201 (North Wing)', type: 'Lab', instructor: 'Prof. Ananya' }
    ]
  },
  '12504556': {
    regNo: '12504556',
    rollNo: '24',
    name: 'Abhay Jaiswal',
    role: 'Team Member',
    email: 'abhay@lpu.in',
    program: 'B.Tech Computer Science & Engineering',
    section: 'K23DT',
    defaultHostel: 'hostels_bh',
    timetable: [
      { id: 'c1', time: '10:00 AM', course: 'CSE316: Operating Systems', blockId: 'b34_floor5', room: '34-501 (Floor 5)', type: 'Lecture', instructor: 'Dr. Verma' },
      { id: 'c2', time: '01:00 PM', course: 'MTH401: Numerical Methods', blockId: 'b36_ground', room: '36-305 (Floor 3)', type: 'Lecture', instructor: 'Dr. Gupta' },
      { id: 'c3', time: '03:30 PM', course: 'CSE408: AI & Robotics Lab', blockId: 'b37_entrance', room: '37-302 (North Wing)', type: 'Lab', instructor: 'Prof. Roy' }
    ]
  },
  '11218773': {
    regNo: '11218773',
    rollNo: '19',
    name: 'Arman',
    role: 'Team Member',
    email: 'arman@lpu.in',
    program: 'B.Tech Computer Science & Engineering',
    section: 'K23DT',
    defaultHostel: 'hostels_bh',
    timetable: [
      { id: 'c1', time: '09:00 AM', course: 'CSE326: Networks & Security', blockId: 'b34_floor5', room: '34-505 (Floor 5)', type: 'Lab', instructor: 'Dr. Sharma' },
      { id: 'c2', time: '11:00 AM', course: 'CSE202: Object Oriented Tech', blockId: 'b36_ground', room: '36-202 (Floor 2)', type: 'Lecture', instructor: 'Dr. K. Patel' },
      { id: 'c3', time: '02:00 PM', course: 'CAP412: High-Performance GPU', blockId: 'b37_entrance', room: '37-305 (North Wing)', type: 'Studio', instructor: 'Prof. Ananya' }
    ]
  }
};

function getSurveyData() {
  const filePath = path.join(__dirname, 'survey_data.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

let express;
let helmet;
let compression;
let cors;

try {
  express = require('express');
  helmet = require('helmet');
  compression = require('compression');
  cors = require('cors');
} catch (e) {
  // Dependencies not installed; will use native HTTP mode
}

if (express) {
  // ==========================================
  // MODE 1: EXPRESS.JS PRODUCTION SERVER
  // ==========================================
  const app = express();

  if (cors) {
    app.use(cors({ origin: '*' }));
  }

  if (compression) {
    app.use(compression());
  }

  app.use(express.json());

  // 1. Healthcheck Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      server: 'Express.js (Production)',
      service: 'lpu-campus-navigator-api',
      project: 'P10: Which Block is 34?',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // 2. Full Survey Dataset API
  app.get(['/api/survey-data', '/api/survey-stats'], (req, res) => {
    try {
      const data = getSurveyData();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read survey data: ' + err.message });
    }
  });

  // 3. Students / UMS API
  app.get('/api/students', (req, res) => {
    res.json(studentsData);
  });

  // 4. UMS Login Endpoint
  app.post('/api/auth/login', (req, res) => {
    const { regNo, password } = req.body || {};
    if (!regNo) {
      return res.status(400).json({ success: false, error: 'Registration number required' });
    }

    if (studentsData[regNo]) {
      return res.json({ success: true, student: studentsData[regNo], source: 'backend-database' });
    }

    // Dynamic new student
    const newStudent = {
      regNo: regNo,
      rollNo: 'Guest',
      name: `Student (${regNo})`,
      role: 'Student',
      email: `${regNo}@lpu.in`,
      program: 'LPU Enrolled Student',
      section: 'Sec-A',
      defaultHostel: 'hostels_bh',
      timetable: [
        { id: 'c1', time: '09:00 AM', course: 'CSE Lecture', blockId: 'b34_floor5', room: '34-501 (Floor 5)', type: 'Lecture', instructor: 'Faculty' },
        { id: 'c2', time: '11:30 AM', course: 'Mathematics', blockId: 'b36_ground', room: '36-201 (Floor 2)', type: 'Lecture', instructor: 'Faculty' },
        { id: 'c3', time: '02:00 PM', course: 'Studio Lab', blockId: 'b37_entrance', room: '37-302 (Floor 3)', type: 'Lab', instructor: 'Faculty' }
      ]
    };
    studentsData[regNo] = newStudent;
    return res.json({ success: true, student: newStudent, source: 'backend-database' });
  });

  // 5. Add Custom Class to Student Timetable
  app.post('/api/timetable/add', (req, res) => {
    const { regNo, classItem } = req.body || {};
    if (!regNo || !classItem) {
      return res.status(400).json({ success: false, error: 'Missing parameters' });
    }
    if (!studentsData[regNo]) {
      studentsData[regNo] = { regNo, timetable: [] };
    }
    if (!studentsData[regNo].timetable) studentsData[regNo].timetable = [];
    studentsData[regNo].timetable.push(classItem);
    res.json({ success: true, timetable: studentsData[regNo].timetable });
  });

  // Static Assets Serving
  app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: true
  }));

  // SPA Fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(PORT, HOST, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 [Production Express] LPU Campus Navigator Active!`);
    console.log(`🔗 Local URL:  http://localhost:${PORT}`);
    console.log(`🔗 Network URL: http://${HOST}:${PORT}`);
    console.log(`📊 API Health:  http://localhost:${PORT}/api/health`);
    console.log(`📊 Survey API:  http://localhost:${PORT}/api/survey-data`);
    console.log(`======================================================\n`);
  });

} else {
  // ==========================================
  // MODE 2: NATIVE NODE.JS HTTP SERVER
  // ==========================================
  const http = require('http');

  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const server = http.createServer((req, res) => {
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // API 1: Healthcheck
    if (pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'healthy',
        server: 'Native Node.js (Zero-Dependency)',
        service: 'lpu-campus-navigator-api',
        project: 'P10: Which Block is 34?',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      }));
      return;
    }

    // API 2: Survey Data
    if (pathname === '/api/survey-data' || pathname === '/api/survey-stats') {
      try {
        const data = fs.readFileSync(path.join(__dirname, 'survey_data.json'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // API 3: Students Datastore
    if (pathname === '/api/students') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(studentsData));
      return;
    }

    // API 4: UMS Login POST
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { regNo } = JSON.parse(body || '{}');
          if (!regNo) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Registration number required' }));
            return;
          }
          if (studentsData[regNo]) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, student: studentsData[regNo], source: 'backend-database' }));
            return;
          }
          const newStudent = {
            regNo: regNo,
            rollNo: 'Guest',
            name: `Student (${regNo})`,
            role: 'Student',
            email: `${regNo}@lpu.in`,
            program: 'LPU Enrolled Student',
            section: 'Sec-A',
            defaultHostel: 'hostels_bh',
            timetable: [
              { id: 'c1', time: '09:00 AM', course: 'CSE Lecture', blockId: 'b34_floor5', room: '34-501 (Floor 5)', type: 'Lecture', instructor: 'Faculty' },
              { id: 'c2', time: '11:30 AM', course: 'Mathematics', blockId: 'b36_ground', room: '36-201 (Floor 2)', type: 'Lecture', instructor: 'Faculty' },
              { id: 'c3', time: '02:00 PM', course: 'Studio Lab', blockId: 'b37_entrance', room: '37-302 (Floor 3)', type: 'Lab', instructor: 'Faculty' }
            ]
          };
          studentsData[regNo] = newStudent;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, student: newStudent, source: 'backend-database' }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
        }
      });
      return;
    }

    // Static Asset Serving
    let safePath = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // SPA Fallback
        fs.readFile(path.join(__dirname, 'index.html'), (err2, content) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
          }
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err2, content) => {
        if (err2) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Server Error');
        } else {
          res.writeHead(200, {
            'Content-Type': contentType,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
          });
          res.end(content);
        }
      });
    });
  });

  server.listen(PORT, HOST, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 [Native Node.js Server] LPU Campus Navigator Active!`);
    console.log(`🔗 Local URL:  http://localhost:${PORT}`);
    console.log(`🔗 Network URL: http://${HOST}:${PORT}`);
    console.log(`📊 API Health:  http://localhost:${PORT}/api/health`);
    console.log(`📊 Survey API:  http://localhost:${PORT}/api/survey-data`);
    console.log(`======================================================\n`);
  });
}
