/**
 * LPU Smart Campus Navigator & Pathfinder Core Engine
 * Project: P10: Which Block is 34? (Featuring Block 34, 36, and 37 Pathways)
 * Features: UMS Authentication, Personalized Timetable Manager, Step-by-Step GPS Walkthrough, E-Cart Shuttle & Security Helpdesk
 * Author: Namrata Kumari (25), Shahzadi.c (28), Abhay Jaiswal (24), Arman (19)
 */

// ==========================================
// 1. UMS STUDENT PROFILES & AUTHENTICATION
// ==========================================
const mockUmsStudents = {
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

let currentUser = null;

function initAuth() {
  const savedUserJson = localStorage.getItem('lpu_nav_user_session');
  if (savedUserJson) {
    try {
      currentUser = JSON.parse(savedUserJson);
    } catch (e) {
      currentUser = null;
    }
  }

  // If no user saved, default to Namrata Kumari (Group Leader) for demonstration, or Guest
  if (!currentUser) {
    currentUser = mockUmsStudents['12500025'];
    localStorage.setItem('lpu_nav_user_session', JSON.stringify(currentUser));
  }

  updateAuthUI();
  renderTimetable();
}

function updateAuthUI() {
  const userBadge = document.getElementById('umsUserStatusBadge');
  const userDetailsText = document.getElementById('umsUserDetailsText');
  const loginBtn = document.getElementById('umsLoginToggleBtn');

  if (currentUser) {
    if (userBadge) userBadge.className = 'px-2 py-0.5 rounded-full ums-badge text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1';
    if (userBadge) userBadge.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> UMS Logged In`;
    if (userDetailsText) userDetailsText.innerHTML = `<strong>${currentUser.name}</strong> (Reg: <span class="font-mono">${currentUser.regNo}</span> | Roll: <span class="font-mono">${currentUser.rollNo}</span>) • ${currentUser.program}`;
    if (loginBtn) loginBtn.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> Switch Account`;
  } else {
    if (userBadge) userBadge.className = 'px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1';
    if (userBadge) userBadge.innerHTML = `<i class="fa-solid fa-user"></i> Guest Access`;
    if (userDetailsText) userDetailsText.innerHTML = `Guest Visitor Mode. Sign in with Registration Number & Password to sync timetable.`;
    if (loginBtn) loginBtn.innerHTML = `<i class="fa-solid fa-key"></i> UMS Sign In`;
  }
}

function handleUmsLogin(event) {
  if (event) event.preventDefault();

  const regInput = document.getElementById('umsRegInput').value.trim();
  const passInput = document.getElementById('umsPassInput').value.trim();

  if (!regInput) {
    alert("Please enter your Registration Number.");
    return;
  }

  if (mockUmsStudents[regInput]) {
    currentUser = JSON.parse(JSON.stringify(mockUmsStudents[regInput]));
  } else {
    // Custom Student
    currentUser = {
      regNo: regInput,
      rollNo: 'Guest',
      name: `Student (${regInput})`,
      role: 'Student',
      email: `${regInput}@lpu.in`,
      program: 'LPU Enrolled Student',
      section: 'Sec-A',
      defaultHostel: 'hostels_bh',
      timetable: [
        { id: 'c1', time: '09:00 AM', course: 'CSE Lecture', blockId: 'b34_floor5', room: '34-501 (Floor 5)', type: 'Lecture', instructor: 'Faculty' },
        { id: 'c2', time: '11:30 AM', course: 'Mathematics', blockId: 'b36_ground', room: '36-201 (Floor 2)', type: 'Lecture', instructor: 'Faculty' },
        { id: 'c3', time: '02:00 PM', course: 'Studio Lab', blockId: 'b37_entrance', room: '37-302 (Floor 3)', type: 'Lab', instructor: 'Faculty' }
      ]
    };
  }

  localStorage.setItem('lpu_nav_user_session', JSON.stringify(currentUser));
  updateAuthUI();
  renderTimetable();
  toggleModal('umsLoginModal');

  // If user has a default hostel, pre-select it in start dropdown
  if (currentUser.defaultHostel && document.getElementById('startSelect')) {
    document.getElementById('startSelect').value = currentUser.defaultHostel;
  }

  alert(`Welcome, ${currentUser.name}! Your UMS timetable has been synchronized.`);
}

function quickSelectDemoUser(regNo) {
  if (mockUmsStudents[regNo]) {
    document.getElementById('umsRegInput').value = regNo;
    document.getElementById('umsPassInput').value = "********";
    handleUmsLogin();
  }
}

function resetUserSession() {
  localStorage.removeItem('lpu_nav_user_session');
  localStorage.removeItem('lpu_nav_custom_timetable');
  currentUser = mockUmsStudents['12500025'];
  localStorage.setItem('lpu_nav_user_session', JSON.stringify(currentUser));
  updateAuthUI();
  renderTimetable();
  alert("Session reset to default student profile (Namrata Kumari, Roll 25).");
}

// ==========================================
// 2. TIMETABLE MANAGER & AUTO-ROUTING
// ==========================================
function renderTimetable() {
  const container = document.getElementById('timetableContainer');
  if (!container) return;

  const timetable = currentUser && currentUser.timetable ? currentUser.timetable : [];

  if (timetable.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-400 text-xs">
        <i class="fa-solid fa-calendar-xmark text-2xl text-slate-600 mb-2"></i>
        <p>No classes scheduled for today. Click "Add Custom Class" to create one.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  timetable.forEach(item => {
    const card = document.createElement('div');
    card.className = 'p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3';

    let blockBadge = 'bg-slate-800 text-slate-300';
    let blockHighlight = '';
    if (item.blockId === 'b34_floor5') {
      blockBadge = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      blockHighlight = '★ Compulsory Topic';
    } else if (item.blockId === 'b36_ground') {
      blockBadge = 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      blockHighlight = 'Lecture Complex';
    } else if (item.blockId === 'b37_entrance') {
      blockBadge = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      blockHighlight = 'Hidden North Wing';
    }

    card.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-center shrink-0">
          <p class="text-[10px] text-slate-400 font-mono">TIME</p>
          <p class="text-xs font-bold text-white whitespace-nowrap">${item.time}</p>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-white">${item.course}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full ${blockBadge}">${item.type}</span>
            ${blockHighlight ? `<span class="hidden md:inline text-[9px] text-slate-400 font-mono">${blockHighlight}</span>` : ''}
          </div>
          <p class="text-[11px] text-slate-400 mt-0.5">
            <i class="fa-solid fa-door-open text-emerald-400 mr-1"></i>Location: <strong class="text-slate-200">${item.room}</strong> • Faculty: ${item.instructor}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-center">
        <button 
          onclick="navigateFromTimetable('${item.blockId}', '${item.room}')" 
          class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm shadow-emerald-600/30">
          <i class="fa-solid fa-person-walking"></i>
          <span>Take Me to Class</span>
        </button>
        <button 
          onclick="deleteTimetableClass('${item.id}')" 
          class="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition" title="Delete class">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function navigateFromTimetable(blockId, roomCode) {
  // Set start to user's hostel or current selection
  const startSelect = document.getElementById('startSelect');
  if (currentUser && currentUser.defaultHostel && startSelect) {
    startSelect.value = currentUser.defaultHostel;
  }
  const endSelect = document.getElementById('endSelect');
  if (endSelect) endSelect.value = blockId;

  const startNodeId = startSelect ? startSelect.value : 'gate1';
  let route = null;

  if (blockId === 'b34_floor5') {
    route = generatePathToBlock34(startNodeId);
  } else if (blockId === 'b36_ground') {
    route = generatePathToBlock36(startNodeId);
  } else if (blockId === 'b37_entrance') {
    route = generatePathToBlock37(startNodeId);
  } else {
    route = calculateShortestPath(startNodeId, blockId);
  }

  if (route) {
    route.customTitle = `Classroom Route: ${roomCode}`;
    displayRouteDetails(route);
    document.getElementById('routeResultCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleAddCustomClass(event) {
  if (event) event.preventDefault();

  const time = document.getElementById('customClassTime').value.trim();
  const course = document.getElementById('customCourseName').value.trim();
  const blockId = document.getElementById('customClassBlock').value;
  const room = document.getElementById('customClassRoom').value.trim();
  const faculty = document.getElementById('customClassFaculty').value.trim() || 'Faculty';

  if (!time || !course || !room) {
    alert("Please fill out the class time, course name, and room number.");
    return;
  }

  const newClass = {
    id: 'c_' + Date.now(),
    time,
    course,
    blockId,
    room,
    type: 'Custom',
    instructor: faculty
  };

  if (!currentUser.timetable) currentUser.timetable = [];
  currentUser.timetable.push(newClass);
  localStorage.setItem('lpu_nav_user_session', JSON.stringify(currentUser));

  renderTimetable();
  toggleModal('addClassModal');
  alert(`Added ${course} (${room}) to your timetable!`);
}

function deleteTimetableClass(classId) {
  if (!confirm("Are you sure you want to remove this class from your timetable?")) return;

  currentUser.timetable = currentUser.timetable.filter(c => c.id !== classId);
  localStorage.setItem('lpu_nav_user_session', JSON.stringify(currentUser));
  renderTimetable();
}

// ==========================================
// 3. CAMPUS GRAPH & NODE COORDINATE DATABASE
// ==========================================
const campusNodes = {
  // Entrances & External Landmarks
  'gate1': { id: 'gate1', name: 'Main Gate 1 (GT Road)', x: 120, y: 640, type: 'gate', desc: 'Main public entrance, bus drop-off, e-cart terminus' },
  'gate2': { id: 'gate2', name: 'Gate 2 (Admissions & Visitors)', x: 260, y: 640, type: 'gate', desc: 'Direct access to Admission Block & Visitor Lounge' },
  'gate4': { id: 'gate4', name: 'Gate 4 (Sports Complex / West)', x: 60, y: 360, type: 'gate', desc: 'West gate near football stadium and Block 55' },
  
  // Central Hubs
  'boulevard_south': { id: 'boulevard_south', name: 'Central Academic Boulevard', x: 380, y: 560, type: 'path', desc: 'Wide paved pedestrian avenue lined with trees' },
  'unipolis': { id: 'unipolis', name: 'Baldev Raj Mittal Unipolis', x: 420, y: 470, type: 'hub', desc: 'Central open-air amphitheatre and student event stage' },
  'unimall': { id: 'unimall', name: 'Uni Mall & Central Library', x: 250, y: 440, type: 'hub', desc: 'Multi-story shopping, dining, food court, and central library' },
  'hospital': { id: 'hospital', name: 'Uni-Hospital & Medical Hub', x: 160, y: 480, type: 'hub', desc: '24/7 university medical clinic and pharmacy' },
  'law_block': { id: 'law_block', name: 'School of Law (Law Block)', x: 170, y: 320, type: 'block', desc: 'Moot courts, law lecture theatres, legal aid clinic' },
  'b55_cluster': { id: 'b55_cluster', name: 'Block 55–57 Academic Cluster', x: 90, y: 220, type: 'block', desc: 'Engineering & polytechnic workshops in western sector' },

  // Residential Hostels
  'hostels_bh': { id: 'hostels_bh', name: 'Boys Hostels Complex (BH 1–8)', x: 880, y: 160, type: 'hostel', desc: 'Residential towers for male students, mess halls' },
  'hostels_gh': { id: 'hostels_gh', name: 'Girls Hostels Complex (GH 1–6)', x: 300, y: 140, type: 'hostel', desc: 'Residential towers for female students, green lawns' },

  // The Merged 30s Academic Spine (Blocks 33 - 38)
  'b33_entrance': { id: 'b33_entrance', name: 'Block 33 Ground Entrance', x: 420, y: 380, type: 'entrance', desc: 'Main glass portal, security check, general helpdesk' },
  'b33_atrium': { id: 'b33_atrium', name: 'Block 33 Central Atrium', x: 440, y: 340, type: 'atrium', desc: 'Multi-level student services foyer, orientation desk' },
  
  // BLOCK 34 (Compulsory Primary Target)
  'b34_ground': { id: 'b34_ground', name: 'Block 34 Ground Foyer (Target Hub)', x: 520, y: 340, type: 'target', desc: 'Computer Science Department foyer, Lift Bank B, staircase' },
  'b34_lift': { id: 'b34_lift', name: 'Block 34 Central Lift Bank B', x: 535, y: 325, type: 'lift', desc: 'High-speed lifts servicing Floors 1 through 6' },
  'b34_floor5': { id: 'b34_floor5', name: 'Block 34 - 5th Floor (CSE & AI Labs)', x: 520, y: 310, type: 'target_room', desc: 'Rooms 34-501 to 34-512, Advanced AI Lab, Dean CSE Office' },

  // BLOCK 35 (The Inter-connecting Bridge)
  'b35_ground': { id: 'b35_ground', name: 'Block 35 Ground Lobby', x: 610, y: 340, type: 'block', desc: 'Electronics & Mechanical Labs, Central Corridor' },
  'b35_north_junction': { id: 'b35_north_junction', name: 'Block 35 North Junction Corridor', x: 610, y: 270, type: 'junction', desc: 'Crucial turning point: Left hallway leads to hidden Block 37' },

  // BLOCK 36 (Compulsory Target #2 - Lecture Theatres)
  'b36_ground': { id: 'b36_ground', name: 'Block 36 Ground Foyer (Lecture Theatres)', x: 710, y: 340, type: 'target_36', desc: 'Massive tiered lecture halls (36-101 to 36-108), seminar foyers' },
  'b36_floor2': { id: 'b36_floor2', name: 'Block 36 - 2nd Floor (Auditorium & Classrooms)', x: 710, y: 320, type: 'target_36', desc: 'Lecture halls 36-201 to 36-212, central mathematics department' },
  'b36_north_breezeway': { id: 'b36_north_breezeway', name: 'Block 36 North Breezeway', x: 690, y: 250, type: 'junction', desc: 'Alternate covered walkway connecting Block 36 to Block 37' },

  // BLOCK 37 (Compulsory Target #3 - The "Hard to Find" North Wing)
  'b37_entrance': { id: 'b37_entrance', name: 'Block 37 Main Foyer (The North Wing)', x: 630, y: 200, type: 'target_37', desc: 'Perpendicular north building: Multimedia labs, Mac lab, animation studios' },
  'b37_floor3': { id: 'b37_floor3', name: 'Block 37 - 3rd Floor (Design & High-Tech Computing)', x: 630, y: 170, type: 'target_37', desc: 'Advanced GPU Cluster Lab 37-302, Virtual Reality & UX Research' },

  // BLOCK 38 (East Academic Terminal)
  'b38_ground': { id: 'b38_ground', name: 'Block 38 Ground Foyer (Exam Complex)', x: 800, y: 340, type: 'block', desc: 'University Examination Center, evaluation halls, silent study zone' },
  'b38_east_link': { id: 'b38_east_link', name: 'Block 38 East Walkway', x: 860, y: 340, type: 'path', desc: 'Perimeter pathway leading towards residential sector' }
};

// Campus Graph Edges
const campusGraph = [
  // External roads
  { u: 'gate1', v: 'gate2', dist: 140, type: 'outdoor', desc: 'Walk along the outer boulevard sidewalk' },
  { u: 'gate1', v: 'hospital', dist: 170, type: 'outdoor', desc: 'Head North-West along medical access avenue' },
  { u: 'gate1', v: 'boulevard_south', dist: 190, type: 'outdoor', desc: 'Follow the palm-lined main avenue North' },
  { u: 'gate2', v: 'boulevard_south', dist: 130, type: 'outdoor', desc: 'Cross pedestrian plaza towards academic spine' },
  { u: 'hospital', v: 'unimall', dist: 110, type: 'outdoor', desc: 'Walk North past the health dispensary towards mall' },
  { u: 'gate4', v: 'law_block', dist: 130, type: 'outdoor', desc: 'Enter west avenue beside sports grounds' },
  { u: 'gate4', v: 'b55_cluster', dist: 140, type: 'outdoor', desc: 'Head North along sports perimeter to Block 55' },
  { u: 'law_block', v: 'unimall', dist: 120, type: 'outdoor', desc: 'Walk East past university bookstore to Uni Mall' },
  { u: 'law_block', v: 'b55_cluster', dist: 130, type: 'outdoor', desc: 'West pathway linking Law to Engineering workshops' },
  { u: 'unimall', v: 'unipolis', dist: 140, type: 'outdoor', desc: 'Wide paved promenade past food stalls to Unipolis' },
  { u: 'boulevard_south', v: 'unipolis', dist: 95, type: 'outdoor', desc: 'Walk through central fountain court to Unipolis' },
  { u: 'unipolis', v: 'b33_entrance', dist: 75, type: 'outdoor', desc: 'Cross amphitheatre plaza to Block 33 main entrance' },

  // Hostels Links
  { u: 'hostels_gh', v: 'unimall', dist: 280, type: 'outdoor', desc: 'Walk South from Girls Hostels down the lighted garden avenue' },
  { u: 'hostels_gh', v: 'b37_entrance', dist: 310, type: 'outdoor', desc: 'South-East path from GH directly towards Block 37 North Gate' },
  { u: 'hostels_bh', v: 'b38_east_link', dist: 210, type: 'outdoor', desc: 'South-West pedestrian route from Boys Hostels to Block 38' },
  { u: 'hostels_bh', v: 'b37_entrance', dist: 260, type: 'outdoor', desc: 'West walkway from BH mess halls across north lawn to Block 37' },

  // Inside the Merged 30s Spine
  { u: 'b33_entrance', v: 'b33_atrium', dist: 35, type: 'indoor', desc: 'Enter through glass doors into Block 33 high-ceiling atrium' },
  { u: 'b33_atrium', v: 'b34_ground', dist: 65, type: 'covered_bridge', desc: 'Pass the Helpdesk and cross the 33-34 enclosed ground skybridge' },
  
  // Block 34 specifics
  { u: 'b34_ground', v: 'b34_lift', dist: 20, type: 'indoor', desc: 'Walk 20 paces to the left to reach Elevator Bank B' },
  { u: 'b34_lift', v: 'b34_floor5', dist: 30, type: 'lift', desc: 'Take Lift B up to the 5th Floor (or use Stairwell C)' },
  { u: 'b34_ground', v: 'b35_ground', dist: 70, type: 'indoor_corridor', desc: 'Continue straight through the wide connecting corridor to Block 35' },

  // Block 35 & Transition to Block 36 & 37
  { u: 'b35_ground', v: 'b35_north_junction', dist: 55, type: 'indoor_corridor', desc: 'Look for "Wing E / Block 37" ceiling sign opposite the cafeteria; turn North down the hallway' },
  { u: 'b35_ground', v: 'b36_ground', dist: 75, type: 'covered_bridge', desc: 'Walk East past the electronics labs across the bridge into Block 36' },
  
  // Block 36 specifics
  { u: 'b36_ground', v: 'b36_floor2', dist: 25, type: 'indoor', desc: 'Take wide central double-staircase up to 2nd Floor lecture halls' },
  { u: 'b36_ground', v: 'b36_north_breezeway', dist: 60, type: 'covered_corridor', desc: 'Exit ground rear corridor behind lecture hall 36-104 towards North Breezeway' },
  { u: 'b36_ground', v: 'b38_ground', dist: 75, type: 'covered_bridge', desc: 'Walk East through connecting glass skybridge into Block 38' },

  // THE HARD-TO-FIND BLOCK 37 PATHWAYS
  { u: 'b35_north_junction', v: 'b37_entrance', dist: 65, type: 'special_breezeway', desc: '★ KEY TURN: Walk straight through the enclosed glass-paneled breezeway directly into Block 37 Foyer!' },
  { u: 'b36_north_breezeway', v: 'b37_entrance', dist: 50, type: 'special_breezeway', desc: 'Turn left along the covered garden portico into Block 37 entrance' },
  { u: 'b37_entrance', v: 'b37_floor3', dist: 30, type: 'lift', desc: 'Take the North Wing elevator or central stairs to Floor 3 (Multimedia & Mac Labs)' },

  // Block 38 specifics
  { u: 'b38_ground', v: 'b38_east_link', dist: 50, type: 'indoor_to_outdoor', desc: 'Pass through the east glass revolving doors onto the campus promenade' }
];

// Bidirectional Graph Builder
const adjacencyList = {};
Object.keys(campusNodes).forEach(id => {
  adjacencyList[id] = [];
});

campusGraph.forEach(edge => {
  adjacencyList[edge.u].push({ node: edge.v, dist: edge.dist, type: edge.type, desc: edge.desc });
  adjacencyList[edge.v].push({ node: edge.u, dist: edge.dist, type: edge.type, desc: `Reverse: Return along ${edge.desc.toLowerCase()}` });
});

// ==========================================
// 4. DIJKSTRA SHORTEST PATH ALGORITHM
// ==========================================
function calculateShortestPath(startId, endId, accessibilityPreference = 'normal') {
  if (!campusNodes[startId] || !campusNodes[endId]) return null;

  const distances = {};
  const previous = {};
  const edgeDetails = {};
  const unvisited = new Set(Object.keys(campusNodes));

  Object.keys(campusNodes).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
    edgeDetails[node] = null;
  });

  distances[startId] = 0;

  while (unvisited.size > 0) {
    let closestNode = null;
    let shortestDistance = Infinity;

    unvisited.forEach(node => {
      if (distances[node] < shortestDistance) {
        shortestDistance = distances[node];
        closestNode = node;
      }
    });

    if (closestNode === null || distances[closestNode] === Infinity) break;
    if (closestNode === endId) break;

    unvisited.delete(closestNode);

    const neighbors = adjacencyList[closestNode] || [];
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.node)) continue;

      let weight = neighbor.dist;
      // Accessibility adjustments
      if (accessibilityPreference === 'accessible' && neighbor.type === 'indoor' && neighbor.desc.includes('stair')) {
        weight += 250;
      }
      if (accessibilityPreference === 'covered' && neighbor.type === 'outdoor') {
        weight += 120;
      }

      const candidateDistance = distances[closestNode] + weight;
      if (candidateDistance < distances[neighbor.node]) {
        distances[neighbor.node] = candidateDistance;
        previous[neighbor.node] = closestNode;
        edgeDetails[neighbor.node] = neighbor;
      }
    }
  }

  if (distances[endId] === Infinity) return null;

  const path = [];
  const steps = [];
  let curr = endId;

  while (curr !== null) {
    path.unshift(curr);
    if (previous[curr] !== null) {
      steps.unshift({
        from: previous[curr],
        to: curr,
        dist: edgeDetails[curr].dist,
        type: edgeDetails[curr].type,
        instruction: edgeDetails[curr].desc
      });
    }
    curr = previous[curr];
  }

  const totalDist = steps.reduce((sum, s) => sum + s.dist, 0);
  const estMinutes = Math.ceil(totalDist / 75);
  const stepsCount = Math.round(totalDist * 1.35);
  const caloriesBurned = Math.round(totalDist * 0.045);

  return {
    path,
    steps,
    totalDist,
    estMinutes,
    stepsCount,
    caloriesBurned,
    startNode: campusNodes[startId],
    endNode: campusNodes[endId]
  };
}

// Dedicated Compulsory Pathways
function generatePathToBlock34(fromNodeId = 'gate1') {
  const result = calculateShortestPath(fromNodeId, 'b34_floor5');
  if (result) {
    result.customTitle = "★ Official Pathway: Block 34 (CSE Labs, 5th Floor)";
    result.customTag = "Compulsory Project Target P10";
    result.specialTip = "PRO TIP: Block 34 is directly connected to Block 33. Walk past the Block 33 helpdesk, cross the enclosed skybridge, and take Lift B to Floor 5 for rooms 34-501 to 34-512!";
  }
  return result;
}

function generatePathToBlock36(fromNodeId = 'gate1') {
  const result = calculateShortestPath(fromNodeId, 'b36_ground');
  if (result) {
    result.customTitle = "★ Official Pathway: Block 36 (Tiered Lecture Theatres)";
    result.customTag = "High-Traffic Academic Zone";
    result.specialTip = "PRO TIP: Remain indoors! Walk through Block 34 and 35 inside the continuous covered spine; cross the 35–36 glass bridge straight into Block 36.";
  }
  return result;
}

function generatePathToBlock37(fromNodeId = 'gate1') {
  const result = calculateShortestPath(fromNodeId, 'b37_entrance');
  if (result) {
    result.customTitle = "★ Official Pathway: Block 37 (The Hidden North Wing / Multimedia)";
    result.customTag = "Hardest to Find on Campus (Survey Pain Point #1)";
    result.specialTip = "CRITICAL SECRET: Block 37 is perpendicular to Block 35 on the North side! Do NOT walk outside along the main road. Enter Block 35, look for the cafeteria, and turn down the North corridor into the glass-paneled breezeway!";
  }
  return result;
}

// ==========================================
// 5. STEP-BY-STEP GPS WALKTHROUGH CONTROLLER
// ==========================================
let currentActiveRoute = null;
let currentWalkthroughIndex = 0;
let audioContext = null;

function playChime(freq = 523.25, type = 'sine', duration = 0.15) {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    // Audio context silent fallback
  }
}

function startWalkthrough() {
  if (!currentActiveRoute || !currentActiveRoute.steps.length) return;
  currentWalkthroughIndex = 0;
  playChime(659.25, 'triangle', 0.2);
  renderActiveWalkthroughStep();
  document.getElementById('gpsWalkthroughCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function nextWalkthroughStep() {
  if (!currentActiveRoute) return;
  if (currentWalkthroughIndex < currentActiveRoute.steps.length - 1) {
    currentWalkthroughIndex++;
    playChime(587.33, 'sine', 0.15);
    renderActiveWalkthroughStep();
  } else {
    // Arrived
    playChime(783.99, 'triangle', 0.3);
    alert("🎉 You have arrived at your destination!");
  }
}

function prevWalkthroughStep() {
  if (!currentActiveRoute) return;
  if (currentWalkthroughIndex > 0) {
    currentWalkthroughIndex--;
    playChime(440, 'sine', 0.12);
    renderActiveWalkthroughStep();
  }
}

function renderActiveWalkthroughStep() {
  const card = document.getElementById('gpsWalkthroughCard');
  if (!card || !currentActiveRoute) return;

  card.classList.remove('hidden');

  const step = currentActiveRoute.steps[currentWalkthroughIndex];
  const targetNode = campusNodes[step.to];
  const total = currentActiveRoute.steps.length;

  document.getElementById('gpsStepCounter').textContent = `Step ${currentWalkthroughIndex + 1} of ${total}`;
  document.getElementById('gpsTargetTitle').textContent = targetNode ? targetNode.name : 'Next Waypoint';
  document.getElementById('gpsInstructionText').textContent = step.instruction;
  document.getElementById('gpsDistanceBadge').textContent = `${step.dist} meters`;

  // Progress Bar
  const pct = Math.round(((currentWalkthroughIndex + 1) / total) * 100);
  document.getElementById('gpsProgressBar').style.width = `${pct}%`;

  // Update directional icon
  const iconEl = document.getElementById('gpsDirectionIcon');
  if (step.type.includes('lift')) {
    iconEl.className = 'fa-solid fa-elevator text-2xl text-emerald-400';
  } else if (step.type.includes('bridge') || step.type.includes('special')) {
    iconEl.className = 'fa-solid fa-bridge text-2xl text-cyan-400';
  } else if (step.instruction.toLowerCase().includes('left')) {
    iconEl.className = 'fa-solid fa-arrow-turn-left text-2xl text-amber-400';
  } else if (step.instruction.toLowerCase().includes('right')) {
    iconEl.className = 'fa-solid fa-arrow-turn-right text-2xl text-amber-400';
  } else {
    iconEl.className = 'fa-solid fa-arrow-up text-2xl text-emerald-400';
  }

  // Draw active beacon on SVG map
  updateSvgActiveBeacon(step.to);
}

function updateSvgActiveBeacon(nodeId) {
  const node = campusNodes[nodeId];
  const beaconGroup = document.getElementById('activeBeaconGroup');
  if (!beaconGroup || !node) return;

  beaconGroup.innerHTML = '';
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', node.x);
  circle.setAttribute('cy', node.y);
  circle.setAttribute('r', '14');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', '#38bdf8');
  circle.setAttribute('stroke-width', '4');
  circle.setAttribute('class', 'active-step-beacon');
  beaconGroup.appendChild(circle);
}

// ==========================================
// 6. SVG MAP RENDERER & INTERACTIVE ROUTING
// ==========================================
function renderSVGMap() {
  const svg = document.getElementById('campusSvgMap');
  if (!svg) return;

  svg.innerHTML = '';

  // Background Grid
  const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gridGroup.setAttribute('opacity', '0.07');
  for (let x = 0; x <= 1000; x += 50) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', x);
    line.setAttribute('y2', 700);
    line.setAttribute('stroke', '#10b981');
    gridGroup.appendChild(line);
  }
  for (let y = 0; y <= 700; y += 50) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', y);
    line.setAttribute('x2', 1000);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', '#10b981');
    gridGroup.appendChild(line);
  }
  svg.appendChild(gridGroup);

  // Group for Corridor Roads & Links
  const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  edgesGroup.setAttribute('id', 'mapEdgesGroup');

  campusGraph.forEach(edge => {
    const u = campusNodes[edge.u];
    const v = campusNodes[edge.v];
    if (!u || !v) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', u.x);
    line.setAttribute('y1', u.y);
    line.setAttribute('x2', v.x);
    line.setAttribute('y2', v.y);
    line.setAttribute('stroke', edge.type.includes('indoor') || edge.type.includes('bridge') ? '#38bdf8' : '#334155');
    line.setAttribute('stroke-width', edge.type.includes('indoor') || edge.type.includes('bridge') ? '4' : '2.5');
    line.setAttribute('stroke-opacity', '0.5');
    if (edge.type.includes('bridge')) {
      line.setAttribute('stroke-dasharray', '4 4');
    }
    edgesGroup.appendChild(line);
  });
  svg.appendChild(edgesGroup);

  // Merged 33-38 Structural Box
  const spineBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  spineBox.setAttribute('x', '390');
  spineBox.setAttribute('y', '150');
  spineBox.setAttribute('width', '450');
  spineBox.setAttribute('height', '230');
  spineBox.setAttribute('rx', '24');
  spineBox.setAttribute('fill', '#1e1b4b');
  spineBox.setAttribute('fill-opacity', '0.35');
  spineBox.setAttribute('stroke', '#6366f1');
  spineBox.setAttribute('stroke-width', '1.5');
  spineBox.setAttribute('stroke-dasharray', '6 6');
  svg.appendChild(spineBox);

  // Label
  const spineLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  spineLabel.setAttribute('x', '410');
  spineLabel.setAttribute('y', '180');
  spineLabel.setAttribute('fill', '#a5b4fc');
  spineLabel.setAttribute('font-size', '12');
  spineLabel.setAttribute('font-weight', 'bold');
  spineLabel.setAttribute('letter-spacing', '1px');
  spineLabel.textContent = 'THE 33–38 MERGED ACADEMIC SPINE (INTERCONNECTED CORRIDORS)';
  svg.appendChild(spineLabel);

  // Active Route Group
  const activeRouteGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  activeRouteGroup.setAttribute('id', 'activeRouteGroup');
  svg.appendChild(activeRouteGroup);

  // Active Step Beacon Group
  const activeBeaconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  activeBeaconGroup.setAttribute('id', 'activeBeaconGroup');
  svg.appendChild(activeBeaconGroup);

  // Node Markers Group
  const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  nodesGroup.setAttribute('id', 'mapNodesGroup');

  Object.values(campusNodes).forEach(node => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'map-node');
    g.setAttribute('onclick', `handleMapNodeClick('${node.id}')`);

    const isBlock34 = node.id === 'b34_ground' || node.id === 'b34_floor5';
    const isBlock36 = node.id === 'b36_ground' || node.id === 'b36_floor2';
    const isBlock37 = node.id === 'b37_entrance' || node.id === 'b37_floor3';
    const isTarget = isBlock34 || isBlock36 || isBlock37;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', isTarget ? '13' : '8');

    let fillColor = '#64748b';
    if (isBlock34) fillColor = '#10b981';
    else if (isBlock36) fillColor = '#a855f7';
    else if (isBlock37) fillColor = '#f59e0b';
    else if (node.type === 'gate') fillColor = '#ef4444';
    else if (node.type === 'hub') fillColor = '#06b6d4';
    else if (node.type === 'hostel') fillColor = '#ec4899';
    else if (node.type === 'entrance' || node.type === 'atrium') fillColor = '#3b82f6';

    circle.setAttribute('fill', fillColor);
    circle.setAttribute('stroke', '#0f172a');
    circle.setAttribute('stroke-width', '2.5');

    if (isBlock34) circle.setAttribute('class', 'block-highlight-34');
    if (isBlock36) circle.setAttribute('class', 'block-highlight-36');
    if (isBlock37) circle.setAttribute('class', 'block-highlight-37');

    g.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.y + (isTarget ? 22 : 16));
    text.setAttribute('fill', isTarget ? '#ffffff' : '#cbd5e1');
    text.setAttribute('font-size', isTarget ? '11' : '9');
    text.setAttribute('font-weight', isTarget ? 'bold' : 'normal');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = node.name.split('(')[0].trim();

    g.appendChild(text);
    nodesGroup.appendChild(g);
  });

  svg.appendChild(nodesGroup);
}

function drawActiveRouteOnSVG(pathNodes) {
  const group = document.getElementById('activeRouteGroup');
  if (!group || !pathNodes || pathNodes.length < 2) return;

  group.innerHTML = '';

  let d = '';
  pathNodes.forEach((nodeId, idx) => {
    const node = campusNodes[nodeId];
    if (!node) return;
    d += (idx === 0 ? `M ${node.x} ${node.y}` : ` L ${node.x} ${node.y}`);
  });

  const glowLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  glowLine.setAttribute('d', d);
  glowLine.setAttribute('fill', 'none');
  glowLine.setAttribute('stroke', '#10b981');
  glowLine.setAttribute('stroke-width', '10');
  glowLine.setAttribute('stroke-opacity', '0.25');
  glowLine.setAttribute('stroke-linecap', 'round');
  glowLine.setAttribute('stroke-linejoin', 'round');
  group.appendChild(glowLine);

  const activeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  activeLine.setAttribute('d', d);
  activeLine.setAttribute('fill', 'none');
  activeLine.setAttribute('stroke', '#34d399');
  activeLine.setAttribute('stroke-width', '4');
  activeLine.setAttribute('stroke-linecap', 'round');
  activeLine.setAttribute('stroke-linejoin', 'round');
  activeLine.setAttribute('class', 'route-active-line');
  group.appendChild(activeLine);

  // Pulse Start Pin
  const startNode = campusNodes[pathNodes[0]];
  if (startNode) {
    const startPin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    startPin.setAttribute('cx', startNode.x);
    startPin.setAttribute('cy', startNode.y);
    startPin.setAttribute('r', '15');
    startPin.setAttribute('fill', 'none');
    startPin.setAttribute('stroke', '#10b981');
    startPin.setAttribute('stroke-width', '3');
    startPin.setAttribute('stroke-dasharray', '3 3');
    group.appendChild(startPin);
  }

  // Pulse End Pin
  const endNode = campusNodes[pathNodes[pathNodes.length - 1]];
  if (endNode) {
    const endPin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    endPin.setAttribute('cx', endNode.x);
    endPin.setAttribute('cy', endNode.y);
    endPin.setAttribute('r', '18');
    endPin.setAttribute('fill', 'none');
    endPin.setAttribute('stroke', '#f59e0b');
    endPin.setAttribute('stroke-width', '3.5');
    endPin.setAttribute('stroke-dasharray', '4 4');
    group.appendChild(endPin);
  }
}

// ==========================================
// 7. ROUTE DISPLAY & TRIGGER ACTIONS
// ==========================================
function populateDropdowns() {
  const startSelect = document.getElementById('startSelect');
  const endSelect = document.getElementById('endSelect');
  if (!startSelect || !endSelect) return;

  startSelect.innerHTML = '';
  endSelect.innerHTML = '';

  const groups = {
    'Major Campus Gates': ['gate1', 'gate2', 'gate4'],
    'Central Campus Landmarks': ['unipolis', 'unimall', 'hospital', 'boulevard_south', 'law_block', 'b55_cluster'],
    'Merged 30s Academic Spine (Blocks 33–38)': ['b33_entrance', 'b33_atrium', 'b34_ground', 'b34_floor5', 'b35_ground', 'b36_ground', 'b37_entrance', 'b38_ground'],
    'Hostel Complexes': ['hostels_bh', 'hostels_gh']
  };

  Object.entries(groups).forEach(([groupName, nodeIds]) => {
    const optGroupStart = document.createElement('optgroup');
    optGroupStart.label = groupName;
    const optGroupEnd = document.createElement('optgroup');
    optGroupEnd.label = groupName;

    nodeIds.forEach(id => {
      const node = campusNodes[id];
      if (node) {
        const optStart = new Option(node.name, node.id);
        const optEnd = new Option(node.name, node.id);
        optGroupStart.appendChild(optStart);
        optGroupEnd.appendChild(optEnd);
      }
    });

    startSelect.appendChild(optGroupStart);
    endSelect.appendChild(optGroupEnd);
  });

  startSelect.value = currentUser && currentUser.defaultHostel ? currentUser.defaultHostel : 'gate1';
  endSelect.value = 'b34_floor5';
}

function handleCalculateRoute() {
  const startId = document.getElementById('startSelect').value;
  const endId = document.getElementById('endSelect').value;
  const pref = document.getElementById('prefSelect') ? document.getElementById('prefSelect').value : 'normal';

  const route = calculateShortestPath(startId, endId, pref);
  if (!route) {
    alert("No route found between the selected points.");
    return;
  }

  displayRouteDetails(route);
}

function triggerBlock34Pathway() {
  const startId = document.getElementById('startSelect') ? document.getElementById('startSelect').value : 'gate1';
  const route = generatePathToBlock34(startId);
  if (document.getElementById('endSelect')) document.getElementById('endSelect').value = 'b34_floor5';
  displayRouteDetails(route);
}

function triggerBlock36Pathway() {
  const startId = document.getElementById('startSelect') ? document.getElementById('startSelect').value : 'gate1';
  const route = generatePathToBlock36(startId);
  if (document.getElementById('endSelect')) document.getElementById('endSelect').value = 'b36_ground';
  displayRouteDetails(route);
}

function triggerBlock37Pathway() {
  const startId = document.getElementById('startSelect') ? document.getElementById('startSelect').value : 'gate1';
  const route = generatePathToBlock37(startId);
  if (document.getElementById('endSelect')) document.getElementById('endSelect').value = 'b37_entrance';
  displayRouteDetails(route);
}

function displayRouteDetails(route) {
  currentActiveRoute = route;
  drawActiveRouteOnSVG(route.path);

  const container = document.getElementById('routeResultCard');
  if (!container) return;

  const titleEl = document.getElementById('routeTitle');
  const tagEl = document.getElementById('routeTag');
  const tipBox = document.getElementById('routeSpecialTip');
  const metricsEl = document.getElementById('routeMetrics');
  const stepsContainer = document.getElementById('routeStepsList');

  titleEl.textContent = route.customTitle || `${route.startNode.name} ➔ ${route.endNode.name}`;
  tagEl.textContent = route.customTag || "Calculated Easiest Route";

  if (route.specialTip) {
    tipBox.classList.remove('hidden');
    tipBox.innerHTML = `<i class="fa-solid fa-lightbulb text-amber-400 mr-2 text-base"></i>${route.specialTip}`;
  } else {
    tipBox.classList.add('hidden');
  }

  metricsEl.innerHTML = `
    <div class="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
      <i class="fa-solid fa-person-walking text-emerald-400"></i>
      <span class="font-bold text-white">${route.totalDist} m</span>
      <span class="text-slate-400 text-xs">Total Distance</span>
    </div>
    <div class="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
      <i class="fa-solid fa-clock text-cyan-400"></i>
      <span class="font-bold text-white">~${route.estMinutes} mins</span>
      <span class="text-slate-400 text-xs">Walking Time</span>
    </div>
    <div class="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
      <i class="fa-solid fa-shoe-prints text-indigo-400"></i>
      <span class="font-bold text-white">${route.stepsCount}</span>
      <span class="text-slate-400 text-xs">Steps</span>
    </div>
    <div class="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
      <i class="fa-solid fa-fire text-rose-400"></i>
      <span class="font-bold text-white">${route.caloriesBurned} kcal</span>
      <span class="text-slate-400 text-xs">Calories</span>
    </div>
  `;

  stepsContainer.innerHTML = '';
  route.steps.forEach((step, index) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition';

    let icon = 'fa-arrow-right';
    let badgeColor = 'bg-slate-800 text-slate-300';
    if (step.type.includes('lift')) {
      icon = 'fa-elevator';
      badgeColor = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    } else if (step.type.includes('bridge')) {
      icon = 'fa-bridge';
      badgeColor = 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
    } else if (step.type.includes('special')) {
      icon = 'fa-star';
      badgeColor = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    } else if (step.type.includes('indoor')) {
      icon = 'fa-building-user';
      badgeColor = 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    }

    stepEl.innerHTML = `
      <div class="w-8 h-8 rounded-xl ${badgeColor} flex items-center justify-center shrink-0 font-bold text-xs">
        ${index + 1}
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold text-white">${campusNodes[step.to].name}</p>
          <span class="text-[10px] text-slate-400 font-mono">${step.dist}m</span>
        </div>
        <p class="text-xs text-slate-300 mt-1 leading-relaxed">${step.instruction}</p>
      </div>
    `;
    stepsContainer.appendChild(stepEl);
  });

  container.classList.remove('hidden');

  // Also auto-prepare the GPS Walkthrough
  currentWalkthroughIndex = 0;
  renderActiveWalkthroughStep();
}

// ==========================================
// 8. CAMPUS SHUTTLE (E-CART) ROUTE GENERATOR
// ==========================================
let currentTransportMode = 'walking';

function setTransportMode(mode) {
  currentTransportMode = mode;
  const walkBtn = document.getElementById('transportModeWalkBtn');
  const ecartBtn = document.getElementById('transportModeEcartBtn');
  const ecartCard = document.getElementById('ecartShuttleCard');

  if (mode === 'ecart') {
    if (walkBtn) walkBtn.className = 'px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 text-xs';
    if (ecartBtn) ecartBtn.className = 'px-3 py-1.5 rounded-xl bg-cyan-600 font-bold text-white shadow text-xs';
    if (ecartCard) ecartCard.classList.remove('hidden');
    renderEcartRoute();
  } else {
    if (walkBtn) walkBtn.className = 'px-3 py-1.5 rounded-xl bg-emerald-600 font-bold text-white shadow text-xs';
    if (ecartBtn) ecartBtn.className = 'px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 text-xs';
    if (ecartCard) ecartCard.classList.add('hidden');
  }
}

function renderEcartRoute() {
  const container = document.getElementById('ecartRouteContent');
  if (!container) return;

  const startId = document.getElementById('startSelect').value;
  const endId = document.getElementById('endSelect').value;

  container.innerHTML = `
    <div class="space-y-3 text-xs">
      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
        <div class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
          1
        </div>
        <div>
          <p class="font-bold text-white">Board E-Cart at Nearest Shuttle Stop</p>
          <p class="text-slate-400 text-[11px] mt-0.5">Shuttle Frequency: Every 3–5 minutes • Fare: Free for Students with LPU ID</p>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
          2
        </div>
        <div>
          <p class="font-bold text-white">Ride to Academic Central Stop (Opposite Block 33/34)</p>
          <p class="text-slate-400 text-[11px] mt-0.5">Travel time: 2–4 mins from Gate 1 / Hostels directly to Block 34 drop point.</p>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
        <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
          3
        </div>
        <div>
          <p class="font-bold text-white">Final Indoor Walking Leg</p>
          <p class="text-slate-400 text-[11px] mt-0.5">Disembark and walk 40m through Block 33 glass entrance directly to Lift Bank B for Block 34 (Floor 5) or East corridor for Block 36 & 37.</p>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 9. VOICE GUIDANCE (SPEECH SYNTHESIS)
// ==========================================
let isSpeaking = false;
let currentVoiceUtterance = null;

function toggleVoiceGuidance() {
  if (!('speechSynthesis' in window)) {
    alert("Speech synthesis is not supported on this browser.");
    return;
  }

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    updateVoiceButton(false);
    return;
  }

  if (!currentActiveRoute || !currentActiveRoute.steps.length) {
    alert("Please calculate a route first.");
    return;
  }

  const script = `${currentActiveRoute.customTitle || 'Starting campus navigation'}. Total distance is ${currentActiveRoute.totalDist} meters, estimated walking time is ${currentActiveRoute.estMinutes} minutes. ` +
    currentActiveRoute.steps.map((s, idx) => `Step ${idx + 1}: ${s.instruction}`).join('. ') +
    ". You have arrived safely at your destination.";

  currentVoiceUtterance = new SpeechSynthesisUtterance(script);
  currentVoiceUtterance.rate = 0.95;
  currentVoiceUtterance.pitch = 1.0;

  currentVoiceUtterance.onend = () => {
    isSpeaking = false;
    updateVoiceButton(false);
  };
  currentVoiceUtterance.onerror = () => {
    isSpeaking = false;
    updateVoiceButton(false);
  };

  window.speechSynthesis.speak(currentVoiceUtterance);
  isSpeaking = true;
  updateVoiceButton(true);
}

function updateVoiceButton(speaking) {
  const btn = document.getElementById('voiceGuidanceBtn');
  if (!btn) return;

  if (speaking) {
    btn.innerHTML = `<i class="fa-solid fa-stop text-rose-400 animate-pulse"></i><span>Stop Voice</span>`;
    btn.classList.add('bg-rose-950/80', 'border-rose-500/50');
  } else {
    btn.innerHTML = `<i class="fa-solid fa-volume-high text-cyan-400"></i><span>Voice Guidance</span>`;
    btn.classList.remove('bg-rose-950/80', 'border-rose-500/50');
  }
}

// ==========================================
// 10. QR SIMULATOR & NODE CLICKS
// ==========================================
function handleMapNodeClick(nodeId) {
  const startSelect = document.getElementById('startSelect');
  const endSelect = document.getElementById('endSelect');

  if (startSelect.value === nodeId) {
    alert(`Node ${campusNodes[nodeId].name} is already set as start.`);
    return;
  }

  endSelect.value = nodeId;
  handleCalculateRoute();
}

function simulateQRScan(waypointId) {
  const node = campusNodes[waypointId];
  if (!node) return;

  document.getElementById('startSelect').value = waypointId;
  const banner = document.getElementById('qrScanAlert');
  if (banner) {
    banner.classList.remove('hidden');
    banner.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs text-cyan-200">
          <i class="fa-solid fa-qrcode text-cyan-400 text-lg"></i>
          <span><strong>QR Scanned!</strong> Location calibrated to <strong>${node.name}</strong>.</span>
        </div>
        <button onclick="this.parentElement.parentElement.classList.add('hidden')" class="text-cyan-400 hover:text-white text-xs">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
  }

  triggerBlock34Pathway();
}

function handleSearchQuery(queryText) {
  const q = queryText.toLowerCase().trim();
  if (!q) return;

  if (q.includes('34') || q.includes('cse') || q.includes('501') || q.includes('5th floor')) {
    triggerBlock34Pathway();
  } else if (q.includes('36') || q.includes('theatre') || q.includes('lecture')) {
    triggerBlock36Pathway();
  } else if (q.includes('37') || q.includes('media') || q.includes('mac') || q.includes('hidden')) {
    triggerBlock37Pathway();
  } else if (q.includes('law')) {
    document.getElementById('endSelect').value = 'law_block';
    handleCalculateRoute();
  } else if (q.includes('55') || q.includes('56') || q.includes('57')) {
    document.getElementById('endSelect').value = 'b55_cluster';
    handleCalculateRoute();
  } else if (q.includes('mall') || q.includes('library')) {
    document.getElementById('endSelect').value = 'unimall';
    handleCalculateRoute();
  } else {
    triggerBlock34Pathway();
  }
}

// ==========================================
// 11. SURVEY RESEARCH DATA EXPLORER & API SYNC
// ==========================================
const embeddedSurveyResponses = [
  { id: 1, name: "Harsh Gupta", user_type: "Student", q1_difficulty_finding: "Yes", q2_biggest_problem: "Difficulty finding classrooms", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Yes", q5_helpful_solution: "Digital campus map", q6_most_difficult_place: "55-block", q7_suggestions: "No suggestion, campus is too big fresher always face problem" },
  { id: 2, name: "M. Karthik", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Confusing campus map", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "Block - 55, 56, 57", q7_suggestions: "I don't have any suggestion." },
  { id: 3, name: "Aman Kumar Gupta", user_type: "Student", q1_difficulty_finding: "Yes", q2_biggest_problem: "Difficulty finding classrooms", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Yes", q5_helpful_solution: "Clear block numbers", q6_most_difficult_place: "Block like 35, 36, 37, 38 all are merge so that was most difficult", q7_suggestions: "There should be a proper guidance of each Block." },
  { id: 4, name: "Prakhar Maheshwari", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Lack of direction boards", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "Near block-37", q7_suggestions: "Digital campus map." },
  { id: 5, name: "Anonymous", user_type: "Student", q1_difficulty_finding: "Yes", q2_biggest_problem: "Difficulty finding classrooms", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Yes", q5_helpful_solution: "Digital campus map", q6_most_difficult_place: "Once I face diff in finding 21 block.", q7_suggestions: "Not much" },
  { id: 6, name: "Aryan", user_type: "Student", q1_difficulty_finding: "No", q2_biggest_problem: "Lack of direction boards", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "38 number building", q7_suggestions: "No suggestion" },
  { id: 7, name: "Deshraj Kumar", user_type: "Student", q1_difficulty_finding: "Yes", q2_biggest_problem: "Difficulty finding block numbers / Lack of direction boards", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Yes", q5_helpful_solution: "Digital campus map & QR code navigation", q6_most_difficult_place: "In between block 36, 37 and 38 I found difficult to locate classrooms.", q7_suggestions: "Yes, There should a QR code navigation in which users can scan the QR and locate their respective classrooms." },
  { id: 8, name: "Golu Sharma", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Lack of direction boards", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "In Block no 29-33", q7_suggestions: "Just provide ample amount of Sign board which are visible from a distance too." },
  { id: 9, name: "Anmolpreet", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Difficulty finding block numbers", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Clear block numbers", q6_most_difficult_place: "Hostels and Blocks between 30 to 40", q7_suggestions: "No" },
  { id: 10, name: "Anonymous", user_type: "Student", q1_difficulty_finding: "No", q2_biggest_problem: "Confusing campus map", q3_action_when_lost: "Follow direction boards", q4_ever_been_late: "No", q5_helpful_solution: "Clear block numbers", q6_most_difficult_place: "General Campus Area", q7_suggestions: "Everything is good" },
  { id: 11, name: "Tatipalli Akshan", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Difficulty finding classrooms", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Yes", q5_helpful_solution: "Mobile navigation system", q6_most_difficult_place: "Block number - 38", q7_suggestions: "A digitalize AI voice chatbot that can guide us to our destination" },
  { id: 12, name: "Venkat", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Difficulty finding block numbers", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "34-block - 5th floor", q7_suggestions: "NO" },
  { id: 13, name: "Anonymous", user_type: "Student", q1_difficulty_finding: "Yes", q2_biggest_problem: "Confusing campus map", q3_action_when_lost: "Ask other students / Other: I found difficulty to find LPU", q4_ever_been_late: "Yes", q5_helpful_solution: "Digital campus map", q6_most_difficult_place: "My Room / Hostels", q7_suggestions: "No Suggestion" },
  { id: 14, name: "Ananthakrishnan", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Confusing campus map & Difficulty finding block numbers", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Yes", q5_helpful_solution: "Digital campus map & Better direction boards", q6_most_difficult_place: "Block-37", q7_suggestions: "place some boards at main points which indicate the blocks and all." },
  { id: 15, name: "Anonymous", user_type: "Student", q1_difficulty_finding: "Sometimes", q2_biggest_problem: "Difficulty finding block numbers", q3_action_when_lost: "Ask other students", q4_ever_been_late: "Sometimes", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "The place I find most difficult to locate on campus is Block 37.", q7_suggestions: "Yes there may be some direction boards for the navigation." },
  { id: 16, name: "Anonymous", user_type: "Student", q1_difficulty_finding: "No", q2_biggest_problem: "Difficulty finding classrooms", q3_action_when_lost: "Ask other students", q4_ever_been_late: "No", q5_helpful_solution: "Better direction boards", q6_most_difficult_place: "law block", q7_suggestions: "Better direction boards" }
];

let allSurveyResponses = [...embeddedSurveyResponses];
let activeSurveyFilter = 'all';

async function initDataConnection() {
  const backendBadge = document.getElementById('backendStatusBadge');
  const dataSourceBadge = document.getElementById('surveyDataSourceBadge');

  try {
    const healthRes = await fetch('/api/health');
    if (healthRes.ok) {
      const healthData = await healthRes.json();
      if (backendBadge) {
        backendBadge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono flex items-center gap-1.5 shadow-sm shadow-emerald-950';
        backendBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Backend API: Connected (${healthData.server || 'Active'})`;
      }

      // Fetch live survey data from backend API
      try {
        const surveyRes = await fetch('/api/survey-data');
        if (surveyRes.ok) {
          const sData = await surveyRes.json();
          if (sData.responses && Array.isArray(sData.responses) && sData.responses.length > 0) {
            allSurveyResponses = sData.responses;
            if (dataSourceBadge) dataSourceBadge.textContent = 'Live REST API (/api/survey-data)';
          }
        }
      } catch (e) {
        if (dataSourceBadge) dataSourceBadge.textContent = 'Embedded Dataset (API Error Fallback)';
      }
    } else {
      throw new Error('API not available');
    }
  } catch (err) {
    if (backendBadge) {
      backendBadge.className = 'px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-mono flex items-center gap-1.5';
      backendBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span> Standalone Mode (Embedded DB Active)`;
    }
    if (dataSourceBadge) dataSourceBadge.textContent = 'Embedded Dataset (Direct Offline Mode)';
  }

  renderSurveyDataTable(allSurveyResponses);
}

function renderSurveyDataTable(list) {
  const tbody = document.getElementById('surveyTableBody');
  const countLabel = document.getElementById('surveyVisibleCount');
  if (countLabel) countLabel.textContent = `Showing ${list.length} of 16 Records`;
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400 text-xs italic">No matching survey responses found.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  list.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-800/60 hover:bg-slate-950/60 transition text-xs';

    const diffBadge = item.q1_difficulty_finding === 'Yes' 
      ? '<span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">Yes</span>' 
      : (item.q1_difficulty_finding === 'Sometimes' ? '<span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">Sometimes</span>' : '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">No</span>');

    const lateBadge = item.q4_ever_been_late === 'Yes' 
      ? '<span class="text-rose-400 font-bold">Yes</span>' 
      : (item.q4_ever_been_late === 'Sometimes' ? '<span class="text-amber-400 font-semibold">Sometimes</span>' : '<span class="text-slate-400">No</span>');

    const isTargetMention = item.q6_most_difficult_place.includes('34') || item.q6_most_difficult_place.includes('36') || item.q6_most_difficult_place.includes('37') || item.q6_most_difficult_place.includes('38');

    tr.innerHTML = `
      <td class="py-3 px-3 font-mono text-slate-500 text-[11px]">#${item.id}</td>
      <td class="py-3 px-3 font-bold text-white whitespace-nowrap">
        ${item.name}
        <span class="block text-[10px] font-normal text-slate-400">${item.user_type}</span>
      </td>
      <td class="py-3 px-3 whitespace-nowrap">${diffBadge}</td>
      <td class="py-3 px-3 text-slate-300 max-w-[180px]">${item.q2_biggest_problem}</td>
      <td class="py-3 px-3 whitespace-nowrap">${lateBadge}</td>
      <td class="py-3 px-3 max-w-[200px]">
        <span class="${isTargetMention ? 'text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20' : 'text-slate-300'}">
          ${item.q6_most_difficult_place}
        </span>
      </td>
      <td class="py-3 px-3 text-slate-400 italic max-w-[220px]">"${item.q7_suggestions}"</td>
    `;
    tbody.appendChild(tr);
  });
}

function filterSurveyData(type) {
  activeSurveyFilter = type;
  const buttons = document.querySelectorAll('.survey-filter-btn');
  buttons.forEach(btn => {
    btn.className = 'survey-filter-btn px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs transition';
  });

  const activeBtn = document.getElementById('filterBtn_' + type);
  if (activeBtn) {
    activeBtn.className = 'survey-filter-btn px-3 py-1.5 rounded-xl bg-emerald-600 font-bold text-white shadow text-xs transition';
  }

  let filtered = allSurveyResponses;
  if (type === 'target_blocks') {
    filtered = allSurveyResponses.filter(r => 
      r.q6_most_difficult_place.includes('34') || 
      r.q6_most_difficult_place.includes('36') || 
      r.q6_most_difficult_place.includes('37') || 
      r.q6_most_difficult_place.includes('38') ||
      r.q6_most_difficult_place.includes('merge')
    );
  } else if (type === 'late') {
    filtered = allSurveyResponses.filter(r => r.q4_ever_been_late === 'Yes' || r.q4_ever_been_late === 'Sometimes');
  } else if (type === 'high_difficulty') {
    filtered = allSurveyResponses.filter(r => r.q1_difficulty_finding === 'Yes');
  }

  const query = document.getElementById('surveySearchInput') ? document.getElementById('surveySearchInput').value.trim().toLowerCase() : '';
  if (query) {
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(query) ||
      r.q6_most_difficult_place.toLowerCase().includes(query) ||
      r.q2_biggest_problem.toLowerCase().includes(query) ||
      r.q7_suggestions.toLowerCase().includes(query)
    );
  }

  renderSurveyDataTable(filtered);
}

function searchSurveyData() {
  filterSurveyData(activeSurveyFilter);
}

// Initializer (Browser execution)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    populateDropdowns();
    renderSVGMap();
    initDataConnection();

    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSearchQuery(searchInput.value);
      });
    }

    // Auto trigger the primary pathway to Block 34
    triggerBlock34Pathway();
  });
}

// Module export for Node.js Automated Testing & Server Integration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    campusNodes,
    campusGraph,
    calculateShortestPath,
    generatePathToBlock34,
    generatePathToBlock36,
    generatePathToBlock37,
    mockUmsStudents
  };
}
