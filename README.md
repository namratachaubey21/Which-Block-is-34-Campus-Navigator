# P10: Which Block is 34? — LPU Smart Campus Navigator & Pathfinder
## Working Prototype & CA2 Design Thinking Project

**Course / Assessment:** Design Thinking — Continuous Assessment 2 (CA2)  
**Project Code & Title:** P10: Which Block is 34? — Campus Navigation for New Students & Visitors  
**Target Institution:** Lovely Professional University (LPU), Punjab  
**Project Google Drive Link:** [https://drive.google.com/drive/folders/1kaoEALkLw2l0SB1W9PndeJpRoxTz10Ll?usp=drive_link](https://drive.google.com/drive/folders/1kaoEALkLw2l0SB1W9PndeJpRoxTz10Ll?usp=drive_link)

---

### Project Team Roster
- **Group Leader:** Namrata Kumari (Roll No: **25** | Reg No: **12500025** | Email: [namratakumari2211@gmail.com](mailto:namratakumari2211@gmail.com))
- **Team Member 1:** Shahzadi.c (Reg No: **12526252** | Roll No: **28**)
- **Team Member 2:** Abhay Jaiswal (Reg No: **12504556** | Roll No: **24**)
- **Team Member 3:** Arman (Reg No: **11218773** | Roll No: **19**)
- **Total Team Members:** 4

---

### Key Capabilities of the Prototype

Double-click **`index.html`** in any web browser to run the live application.

#### 1. UMS (University Management System) Authentication & Timetable Sync
* **Hybrid Login:** Allows instant visitor/guest browsing while providing Registration Number & UMS Password authentication for enrolled students.
* **Pre-configured Team Accounts:** One-click demo chips for Namrata Kumari, Shahzadi.c, Abhay Jaiswal, and Arman.
* **Personalized Daily Schedule:** Displays daily lectures and labs in Block 34, Block 36, and Block 37 with a one-click **"Take Me to Class"** auto-routing button.
* **Interactive Timetable Manager:** Students can add custom classes, room numbers, and faculty details. Data persists in `localStorage` with a reset option.

#### 2. Compulsory Core Pathways Implemented
1. **Compulsory Topic: Pathway to Block 34 ("Which Block is 34?")**
   - Direct step-by-step route to Block 34 (Computer Science & Engineering).
   - Highlights the 33–34 covered skybridge and Lift Bank B up to the 5th floor (Rooms 34-501 to 34-512, AI Lab, Dean's Office).
   - Resolves Survey #12 (Venkat: *"34-block - 5th floor"*).
2. **Compulsory Pathway: Block 36 (Lecture Theatres)**
   - Continuous indoor corridor routing connecting Block 34 $\rightarrow$ Block 35 $\rightarrow$ Block 36.
   - Guides freshers to large tiered lecture theatres 36-101 to 36-608 without stepping outdoors into extreme weather.
3. **Compulsory Pathway: Block 37 (The "Hidden" North Wing)**
   - Specifically engineered to solve the #1 pain point cited across 5 independent student surveys (Surveys #3, #4, #7, #14, #15).
   - Reveals the secret indoor breezeway: Enter Block 35, locate the cafeteria junction, and turn North into the glass-paneled breezeway leading directly into Block 37 Multimedia & Mac Labs.

#### 3. Simulated Turn-by-Turn GPS Walkthrough
* Interactive walkthrough with **"Next Step"** / **"Prev Step"** controls.
* Audio chimes using the Web Audio API on step transitions.
* Active step pulse beacon on the interactive SVG campus map.
* Progress bar and distance/bearing indicator.

#### 4. Multi-Modal Transport Switcher & Campus Safety
* **Pedestrian Walking Route:** Shortest walking path, weatherproof covered corridor path, and accessible elevator/ramp-only path.
* **Campus Shuttle E-Cart:** Free student shuttle guide with boarding stops, departure intervals, and transit times.
* **Security & Emergency Helpdesk:** Quick directory for Gate 1 Security (Ext. 2021), Block 34 Helpdesk (Ext. 3401), and Uni-Hospital Ambulance (Ext. 108).

#### 5. Full CA2 Academic Documentation
* `CA2_PROJECT_SUBMISSION_FORM.md`: Form-ready submission sheet.
* `DESIGN_THINKING_PROJECT_REPORT.md`: Comprehensive 5-stage Stanford Design Thinking report.
* `CA2_PRESENTATION_SLIDES.md`: 10-slide viva presentation deck.
* `survey_data.json`: Structured database of all 16 student survey sheets.
