// Interactive Educational Document Generator
const GENERATORS = {
  // Database of realistic sample questions by subject
  questionsDb: {
    "science": {
      "light": {
        "mcqs": [
          { q: "Which of the following is a natural source of light?", o: ["LED Bulb", "Sun", "Candle", "Torch"], a: 1 },
          { q: "Virtual images formed by a plane mirror are always:", o: ["Erect", "Inverted", "Magnified", "Diminished"], a: 0 },
          { q: "The bending of light when it passes from one medium to another is called:", o: ["Reflection", "Refraction", "Dispersion", "Scattering"], a: 1 }
        ],
        "short": [
          "State the laws of reflection of light with a neat diagram.",
          "Distinguish between a real image and a virtual image.",
          "Define power of a lens and state its SI unit."
        ],
        "long": [
          "Explain the formation of image by a concave mirror when the object is placed between focus (F) and pole (P). Support your answer with a ray diagram.",
          "What is refractive index? How is it related to the speed of light in different media? Solve: Light enters from air to a glass plate having refractive index 1.50. What is the speed of light in the glass?"
        ]
      },
      "electricity": {
        "mcqs": [
          { q: "What is the SI unit of electric current?", o: ["Volt", "Ohm", "Ampere", "Watt"], a: 2 },
          { q: "The resistance of a conductor is inversely proportional to its:", o: ["Length", "Area of cross-section", "Temperature", "Resistivity"], a: 1 },
          { q: "Ohm's law states the relationship between:", o: ["Current and Voltage", "Resistance and Power", "Charge and Time", "Voltage and Charge"], a: 0 }
        ],
        "short": [
          "What is electric power? Derive its formula in terms of current and resistance.",
          "Why are copper and aluminum wires usually employed for electricity transmission?",
          "Define 1 Ohm resistance."
        ],
        "long": [
          "Derive the formula for the equivalent resistance of three resistors connected in parallel. Draw the circuit diagram.",
          "State Joule's law of heating. An electric iron of resistance 20 ohms takes a current of 5 A. Calculate the heat developed in 30 seconds."
        ]
      },
      "life processes": {
        "mcqs": [
          { q: "Which of the following is the site of photosynthesis?", o: ["Mitochondria", "Chloroplast", "Ribosome", "Lysosome"], a: 1 },
          { q: "The mode of nutrition in amoeba is:", o: ["Saprophytic", "Holozoic", "Parasitic", "Autotrophic"], a: 1 },
          { q: "Which blood vessel carries oxygenated blood from lungs to the heart?", o: ["Pulmonary Artery", "Pulmonary Vein", "Aorta", "Vena Cava"], a: 1 }
        ],
        "short": [
          "Explain the role of acid in our stomach.",
          "What are the differences between aerobic and anaerobic respiration?",
          "How is oxygen and carbon dioxide transported in human beings?"
        ],
        "long": [
          "Draw a neat labeled diagram of the human excretory system and explain the structure and functioning of a nephron.",
          "Describe the process of double circulation in human beings. Why is it necessary?"
        ]
      }
    },
    "maths": {
      "algebra": {
        "mcqs": [
          { q: "The roots of the quadratic equation x² - 5x + 6 = 0 are:", o: ["2 and 3", "-2 and -3", "1 and 5", "-1 and -5"], a: 0 },
          { q: "If the common difference of an AP is 5, then what is a₁₈ - a₁₃?", o: ["5", "20", "25", "30"], a: 2 },
          { q: "The discriminant of quadratic equation ax² + bx + c = 0 is given by:", o: ["b² + 4ax", "b² - 4ac", "b - 4ac", "4ac - b²"], a: 1 }
        ],
        "short": [
          "Find the sum of the first 20 terms of the AP: 2, 7, 12, 17, ...",
          "Solve for x and y: 2x + 3y = 11 and 2x - 4y = -24.",
          "Find the roots of 2x² - 7x + 3 = 0 using the quadratic formula."
        ],
        "long": [
          "A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.",
          "The sum of the 4th and 8th terms of an AP is 24 and the sum of the 6th and 10th terms is 44. Find the first three terms of the AP."
        ]
      },
      "geometry": {
        "mcqs": [
          { q: "The sum of all interior angles of a triangle is:", o: ["90°", "180°", "270°", "360°"], a: 1 },
          { q: "Tangents drawn from an external point to a circle are:", o: ["Perpendicular", "Parallel", "Equal in length", "Unequal"], a: 2 },
          { q: "The area of a circle of radius r is:", o: ["2πr", "πr²", "2πr²", "πd"], a: 1 }
        ],
        "short": [
          "Prove that the tangents drawn from an external point to a circle are equal.",
          "State Basic Proportionality Theorem (Thales Theorem).",
          "Find the area of a sector of a circle of radius 6 cm if angle of the sector is 60°."
        ],
        "long": [
          "State and prove Pythagoras Theorem.",
          "In a triangle, if the square of one side is equal to the sum of the squares of the other two sides, then prove that the angle opposite the first side is a right angle."
        ]
      }
    }
  },

  // Fallback procedural generators (generates matching questions dynamically if topic is custom)
  proceduralDb: {
    generateMcq(topic, index) {
      const templates = [
        {
          q: `Which of the following best defines the core concept of ${topic}?`,
          o: [`A fundamental theory of ${topic}`, `A secondary aspect of ${topic}`, `An unrelated application of ${topic}`, `A historical footnote of ${topic}`],
          a: 0
        },
        {
          q: `What is the primary objective of studying ${topic} in modern education?`,
          o: ["To memorize dates and timelines", "To understand biological structures", `To analyze the principles and practical applications of ${topic}`, "To write software scripts"],
          a: 2
        },
        {
          q: `Identify the main factor that influences the efficiency or state of ${topic}:`,
          o: ["Ambient temperature only", "The geographical location of the laboratory", `The structural parameters related to ${topic}`, "None of the above"],
          a: 2
        }
      ];
      return templates[index % templates.length];
    },
    generateShort(topic, index) {
      const questions = [
        `Explain the fundamental principles of ${topic} with a suitable example.`,
        `What are the major advantages and limitations of ${topic} in real-world scenarios?`,
        `Describe the key processes or components involved in ${topic}.`,
        `Draw a neat block diagram or flowchart representing the concept of ${topic}.`
      ];
      return questions[index % questions.length];
    },
    generateLong(topic, index) {
      const questions = [
        `Discuss in detail the industrial, scientific, or social significance of ${topic}. What improvements or updates are current researchers suggesting in this field?`,
        `Critically analyze the system of ${topic}. How does it interact with environmental, physical, or logical parameters? Support your analysis with proper mathematical or experimental evidence.`,
        `Write a comprehensive essay describing the historical development, working mechanism, and future scope of ${topic} in secondary education.`
      ];
      return questions[index % questions.length];
    }
  },

  // Get resources for a specific topic
  getTopicQuestions(subject, chapter) {
    if (!subject || !chapter) return null;
    const subKey = subject.toLowerCase();
    const chapKey = chapter.toLowerCase().trim();
    
    // Check if we have exact match in our DB
    if (this.questionsDb[subKey]) {
      // Try to find matching chapter
      for (const [key, val] of Object.entries(this.questionsDb[subKey])) {
        if (chapKey.includes(key) || key.includes(chapKey)) {
          return val;
        }
      }
    }
    
    // Return empty placeholders to trigger procedural generator
    return null;
  },

  // 1. Chapter Test Generator
  generateTest(options) {
    const { classVal, subject, chapter, difficulty, marks } = options;
    const numQ = Math.round(marks / 3) || 10;
    
    // Retrieve questions
    let data = this.getTopicQuestions(subject, chapter);
    
    let mcqs = [];
    let short = [];
    let long = [];
    
    if (data) {
      mcqs = [...data.mcqs];
      short = [...data.short];
      long = [...data.long];
    } else {
      // Procedurally generate
      for (let i = 0; i < 5; i++) {
        mcqs.push(this.proceduralDb.generateMcq(chapter, i));
      }
      for (let i = 0; i < 5; i++) {
        short.push(this.proceduralDb.generateShort(chapter, i));
      }
      for (let i = 0; i < 3; i++) {
        long.push(this.proceduralDb.generateLong(chapter, i));
      }
    }
    
    // Distribute questions based on marks
    const testMcqs = mcqs.slice(0, Math.min(mcqs.length, Math.ceil(marks * 0.2)));
    const testShort = short.slice(0, Math.min(short.length, Math.ceil(marks * 0.4 / 2)));
    const testLong = long.slice(0, Math.min(long.length, Math.ceil(marks * 0.4 / 5)));
    
    let html = `
      <div class="print-document">
        <div class="doc-header text-center">
          <div class="doc-logo-container" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
              <path d="M 32 30 C 26 35, 14 45, 14 50 C 14 55, 26 65, 32 70" stroke="#FF6B4A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 68 30 C 74 35, 86 45, 86 50 C 86 55, 74 65, 68 70" stroke="#E8B339" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 32 46 C 42 46, 45 42, 50 47 C 52 49, 48 54, 46 54 C 40 54, 30 50, 24 50" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" fill="none" />
              <path d="M 68 54 C 58 54, 55 58, 50 53 C 48 51, 52 46, 54 46 C 60 46, 70 50, 76 50" stroke="#E8B339" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px; color: #1B1F3B;">Code<span style="color: #FF6B4A;">Rishta</span></span>
          </div>
          <h2 class="doc-school">MODEL CLASS TEST</h2>
          <div class="doc-meta-row">
            <span><strong>Class:</strong> ${classVal}</span> | 
            <span><strong>Subject:</strong> ${subject}</span> | 
            <span><strong>Topic:</strong> ${chapter}</span>
          </div>
          <div class="doc-meta-row">
            <span><strong>Max Marks:</strong> ${marks}</span> | 
            <span><strong>Time Allowed:</strong> ${marks > 20 ? '60 Mins' : '30 Mins'}</span> | 
            <span><strong>Difficulty:</strong> ${difficulty}</span>
          </div>
        </div>
        <hr class="doc-divider"/>
        
        <div class="doc-body">
          <p class="text-muted"><strong>Instructions:</strong> Attempt all questions. Section A carries 1 mark each, Section B carries 2 marks each, and Section C carries 5 marks each.</p>
          
          <h4 class="section-title">SECTION A (Multiple Choice Questions)</h4>
          <ol class="question-list">
    `;
    
    testMcqs.forEach((item, idx) => {
      html += `
        <li class="question-item">
          <div class="question-text">${item.q} <span class="marks-badge">[1 Mark]</span></div>
          <div class="options-grid">
            ${item.o.map((opt, oIdx) => `<div class="option-item">(${String.fromCharCode(97 + oIdx)}) ${opt}</div>`).join('')}
          </div>
        </li>
      `;
    });
    
    html += `
          </ol>
          
          <h4 class="section-title">SECTION B (Short Answer Questions)</h4>
          <ol class="question-list" start="${testMcqs.length + 1}">
    `;
    
    testShort.forEach((item, idx) => {
      html += `
        <li class="question-item">
          <div class="question-text">${item} <span class="marks-badge">[2 Marks]</span></div>
          <div class="writing-lines"></div>
        </li>
      `;
    });
    
    html += `
          </ol>
          
          <h4 class="section-title">SECTION C (Long Answer Questions)</h4>
          <ol class="question-list" start="${testMcqs.length + testShort.length + 1}">
    `;
    
    testLong.forEach((item, idx) => {
      html += `
        <li class="question-item">
          <div class="question-text">${item} <span class="marks-badge">[5 Marks]</span></div>
          <div class="writing-lines-large"></div>
        </li>
      `;
    });
    
    html += `
          </ol>
        </div>
        
        <div class="doc-footer text-center">
          <p>--- End of Test Paper. Best of Luck! ---</p>
          <p class="signature-line">Teacher's Signature: _____________________</p>
        </div>
      </div>
    `;
    
    return html;
  },

  // 2. Class Worksheet Generator
  generateWorksheet(options) {
    const { classVal, subject, chapter } = options;
    
    let data = this.getTopicQuestions(subject, chapter);
    let activities = [];
    if (data) {
      activities = [
        `Identify and write the 5 key definitions associated with the chapter <strong>${chapter}</strong>.`,
        `Fill in the blank: The main component of ${chapter} functions due to __________ which was first discovered by scientists.`,
        `Create a mind-map showing different branches, types, or applications of <strong>${chapter}</strong>.`,
        `Write a 3-sentence summary of the diagram or model of ${chapter} that you saw in your class textbook.`
      ];
    } else {
      activities = [
        `Define <strong>${chapter}</strong> in your own words and explain how it relates to day-to-day activities.`,
        `List three key terms used in the study of <strong>${chapter}</strong> and describe their meanings.`,
        `True or False: The study of ${chapter} has direct application in modern physics and chemical technologies. Explain why.`,
        `Create a diagram showing the workflow, structure, or function of the key element of ${chapter}.`
      ];
    }
    
    let html = `
      <div class="print-document">
        <div class="doc-header text-center">
          <div class="doc-logo-container" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
              <path d="M 32 30 C 26 35, 14 45, 14 50 C 14 55, 26 65, 32 70" stroke="#FF6B4A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 68 30 C 74 35, 86 45, 86 50 C 86 55, 74 65, 68 70" stroke="#E8B339" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 32 46 C 42 46, 45 42, 50 47 C 52 49, 48 54, 46 54 C 40 54, 30 50, 24 50" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" fill="none" />
              <path d="M 68 54 C 58 54, 55 58, 50 53 C 48 51, 52 46, 54 46 C 60 46, 70 50, 76 50" stroke="#E8B339" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px; color: #1B1F3B;">Code<span style="color: #FF6B4A;">Rishta</span></span>
          </div>
          <h2 class="doc-school">STUDENT ACTIVITY WORKSHEET</h2>
          <div class="doc-meta-row">
            <span><strong>Name:</strong> _______________________</span> | 
            <span><strong>Roll No:</strong> __________</span> | 
            <span><strong>Date:</strong> _________</span>
          </div>
          <div class="doc-meta-row">
            <span><strong>Class:</strong> ${classVal}</span> | 
            <span><strong>Subject:</strong> ${subject}</span> | 
            <span><strong>Topic:</strong> ${chapter}</span>
          </div>
        </div>
        <hr class="doc-divider"/>
        
        <div class="doc-body">
          <p class="text-muted"><strong>Activity Objective:</strong> This worksheet is designed to enhance concept understanding and self-reflection on the topic: <em>${chapter}</em>.</p>
          
          <h4 class="section-title">Task 1: Concept Definitions & Core Elements</h4>
          <p>${activities[0]}</p>
          <div class="writing-lines-large"></div>
          
          <h4 class="section-title">Task 2: Critical Thinking & Fill-ups</h4>
          <p>${activities[1]}</p>
          <div class="writing-lines"></div>
          
          <h4 class="section-title">Task 3: Analysis & Applications</h4>
          <p>${activities[2]}</p>
          <div class="writing-lines-large"></div>
          
          <h4 class="section-title">Task 4: Diagram / Creative Section</h4>
          <p>${activities[3]}</p>
          <div class="drawing-box">
            <span class="text-muted">Draw your diagram or sketch here</span>
          </div>
        </div>
        
        <div class="doc-footer text-center">
          <p>Submission Deadline: _____________________ | Parent's Sign: _____________________</p>
        </div>
      </div>
    `;
    
    return html;
  },

  // 3. NCERT Solutions Generator
  generateSolutions(options) {
    const { classVal, subject, chapter } = options;
    
    let qa = [];
    let data = this.getTopicQuestions(subject, chapter);
    
    if (data) {
      // Generate actual questions
      data.mcqs.forEach((item, idx) => {
        qa.push({
          q: `Q${idx+1}: ${item.q}`,
          a: `<strong>Answer:</strong> Correct Option is <strong>(${String.fromCharCode(97 + item.a)}) ${item.o[item.a]}</strong>. <br/><em>Explanation:</em> The concept is based on ${chapter} parameters where option (${String.fromCharCode(97 + item.a)}) aligns perfectly with the standard NCERT syllabus.`
        });
      });
      data.short.forEach((item, idx) => {
        qa.push({
          q: `Q${data.mcqs.length + idx + 1}: ${item}`,
          a: `<strong>Answer:</strong> ${item.replace("State", "The details of").replace("Define", "Definition:")} is essential because in ${subject}, this represents a core learning pathway. Teachers advise students to draw the standard diagram, label the parts correctly (e.g. inputs, outputs, processes), and write the answer in bullet points to score maximum marks.`
        });
      });
    } else {
      qa = [
        {
          q: `Q1: Explain the primary definition of ${chapter} as outlined in Class ${classVal} syllabus.`,
          a: `<strong>Answer:</strong> ${chapter} is defined as the scientific study, analysis, or framework of this specific topic. In standard NCERT publications, it is characterized by its rules of interaction, structural properties, and physical significance in our day-to-day life.`
        },
        {
          q: `Q2: What is the main utility of ${chapter} in secondary school laboratory experiments?`,
          a: `<strong>Answer:</strong> In the laboratory, students use the principles of ${chapter} to perform quantitative measurements, qualitative observations, and verify physical or theoretical laws. Standard precaution guidelines must be followed (e.g. clean dry apparatus, proper readings, avoiding parallax errors).`
        },
        {
          q: `Q3: Differentiate between the qualitative and quantitative features of ${chapter}.`,
          a: `<strong>Answer:</strong> 
            <ul>
              <li><strong>Qualitative features:</strong> Refers to structural behaviors, properties, colors, shapes, and general outcomes.</li>
              <li><strong>Quantitative features:</strong> Refers to mathematical expressions, formulas, values, units (like SI units), and numerical results.</li>
            </ul>`
        }
      ];
    }
    
    let html = `
      <div class="print-document">
        <div class="doc-header text-center">
          <div class="doc-logo-container" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
              <path d="M 32 30 C 26 35, 14 45, 14 50 C 14 55, 26 65, 32 70" stroke="#FF6B4A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 68 30 C 74 35, 86 45, 86 50 C 86 55, 74 65, 68 70" stroke="#E8B339" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 32 46 C 42 46, 45 42, 50 47 C 52 49, 48 54, 46 54 C 40 54, 30 50, 24 50" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" fill="none" />
              <path d="M 68 54 C 58 54, 55 58, 50 53 C 48 51, 52 46, 54 46 C 60 46, 70 50, 76 50" stroke="#E8B339" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px; color: #1B1F3B;">Code<span style="color: #FF6B4A;">Rishta</span></span>
          </div>
          <h2 class="doc-school">NCERT EXERCISE SOLUTIONS</h2>
          <div class="doc-meta-row">
            <span><strong>Class:</strong> ${classVal}</span> | 
            <span><strong>Subject:</strong> ${subject}</span> | 
            <span><strong>Chapter:</strong> ${chapter}</span>
          </div>
          <p class="badge badge-success text-center" style="display:inline-block; margin-top:5px; background-color:#198754; color:#fff; padding:3px 8px; border-radius:3px; font-size:12px;">NCERT Reference Guide</p>
        </div>
        <hr class="doc-divider"/>
        
        <div class="doc-body">
          <p class="text-muted"><strong>Overview:</strong> Below are standard step-by-step solutions to textbook exercises for the chapter: <em>${chapter}</em>. Created for revision and homework assistance.</p>
          
          ${qa.map(item => `
            <div class="qa-item" style="margin-bottom:20px; padding-bottom:15px; border-bottom:1px dashed #eee;">
              <p class="qa-question" style="color:#0f5132; font-weight:bold;">${item.q}</p>
              <div class="qa-answer" style="background:#f8f9fa; padding:10px 15px; border-left:4px solid #198754; border-radius:4px; font-size:15px; line-height:1.6; color:#2c3e50;">${item.a}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="doc-footer text-center">
          <p>Recommended by CodeRishta for Exam Revision</p>
        </div>
      </div>
    `;
    
    return html;
  },

  // 4. Lesson Plan Creator
  generateLessonPlan(options) {
    const { classVal, subject, chapter } = options;
    
    let html = `
      <div class="print-document">
        <div class="doc-header text-center">
          <div class="doc-logo-container" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
              <path d="M 32 30 C 26 35, 14 45, 14 50 C 14 55, 26 65, 32 70" stroke="#FF6B4A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 68 30 C 74 35, 86 45, 86 50 C 86 55, 74 65, 68 70" stroke="#E8B339" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 32 46 C 42 46, 45 42, 50 47 C 52 49, 48 54, 46 54 C 40 54, 30 50, 24 50" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" fill="none" />
              <path d="M 68 54 C 58 54, 55 58, 50 53 C 48 51, 52 46, 54 46 C 60 46, 70 50, 76 50" stroke="#E8B339" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px; color: #1B1F3B;">Code<span style="color: #FF6B4A;">Rishta</span></span>
          </div>
          <h2 class="doc-school">TEACHER'S LESSON PLAN</h2>
          <div class="doc-meta-row">
            <span><strong>Subject:</strong> ${subject}</span> | 
            <span><strong>Class:</strong> ${classVal}</span> | 
            <span><strong>Topic:</strong> ${chapter}</span>
          </div>
          <div class="doc-meta-row">
            <span><strong>Duration:</strong> 40 Mins (1 Period)</span> | 
            <span><strong>Resources needed:</strong> Smartboard, Textbook, Worksheets</span>
          </div>
        </div>
        <hr class="doc-divider"/>
        
        <div class="doc-body">
          <h4 class="section-title">1. Learning Objectives (Gaining Outcomes)</h4>
          <ul>
            <li>Students will be able to recall the primary concepts of <strong>${chapter}</strong>.</li>
            <li>Students will be able to explain the working principles or theories behind ${chapter}.</li>
            <li>Students will be able to apply the knowledge of ${chapter} in solving textbook exercises and numerical problems.</li>
          </ul>
          
          <h4 class="section-title">2. Teaching-Learning Methodology</h4>
          <p><strong>A. Introduction (5 mins):</strong> Start the class with an ice-breaking question related to real-life observations of ${chapter}. (e.g. Ask: "Have you ever observed how this works in our daily routine?")</p>
          <p><strong>B. Explanation & Interactive Session (20 mins):</strong> Use the smartboard to show diagrams. Explain key equations and bullet points. Ask students to write down definitions.</p>
          <p><strong>C. Collaborative Task (10 mins):</strong> Divide the classroom into groups of four. Ask them to solve a quick worksheet question based on the topic.</p>
          <p><strong>D. Recapitulation & Homework assignment (5 mins):</strong> Summarize the main bullet points of ${chapter} and write down the NCERT exercise numbers on the blackboard.</p>
          
          <h4 class="section-title">3. Blackboard Summary Layout</h4>
          <table border="1" cellpadding="5" style="width:100%; border-collapse:collapse; text-align:left; background:#1e1e1e; color:#fff; border-color:#444;">
            <tr>
              <th style="padding:10px; width:33%; border-color:#444;">Left Board: Homework & Date</th>
              <th style="padding:10px; width:33%; text-align:center; border-color:#444;">Center Board: Topic (${chapter})</th>
              <th style="padding:10px; width:33%; text-align:right; border-color:#444;">Right Board: Key Formulas / Diagrams</th>
            </tr>
            <tr>
              <td style="padding:15px; height:100px; vertical-align:top; border-color:#444;">
                Date: ${new Date().toLocaleDateString()}<br/>
                Subject: ${subject}<br/>
                HW: Solve Q1, Q2 & Q3 from Exercise.
              </td>
              <td style="padding:15px; height:100px; text-align:center; vertical-align:top; border-color:#444;">
                <strong>CORE CONCEPT</strong><br/>
                1. Definition of ${chapter}<br/>
                2. Standard Formula / Laws<br/>
                3. Flow diagram
              </td>
              <td style="padding:15px; height:100px; text-align:right; vertical-align:top; border-color:#444;">
                [Draw Diagram Here]<br/>
                Units: SI standard<br/>
                Errors to avoid.
              </td>
            </tr>
          </table>
          
          <h4 class="section-title">4. Evaluation / Assessment Criteria</h4>
          <ul>
            <li>Continuous evaluation based on active participation in the group task.</li>
            <li>Submission of the homework worksheet in the next lecture.</li>
          </ul>
        </div>
        
        <div class="doc-footer text-center">
          <p>Approved By Coordinator: ____________________ | Prepared By: ____________________</p>
        </div>
      </div>
    `;
    
    return html;
  },

  // 5. Holiday Homework Generator
  generateHomework(options) {
    const { classVal, subject, chapter } = options;
    
    let html = `
      <div class="print-document">
        <div class="doc-header text-center">
          <div class="doc-logo-container" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
              <path d="M 32 30 C 26 35, 14 45, 14 50 C 14 55, 26 65, 32 70" stroke="#FF6B4A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 68 30 C 74 35, 86 45, 86 50 C 86 55, 74 65, 68 70" stroke="#E8B339" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 32 46 C 42 46, 45 42, 50 47 C 52 49, 48 54, 46 54 C 40 54, 30 50, 24 50" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" fill="none" />
              <path d="M 68 54 C 58 54, 55 58, 50 53 C 48 51, 52 46, 54 46 C 60 46, 70 50, 76 50" stroke="#E8B339" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px; color: #1B1F3B;">Code<span style="color: #FF6B4A;">Rishta</span></span>
          </div>
          <h2 class="doc-school">CREATIVE HOLIDAY HOMEWORK</h2>
          <div class="doc-meta-row">
            <span><strong>Class:</strong> ${classVal}</span> | 
            <span><strong>Subject:</strong> ${subject}</span> | 
            <span><strong>Topic Areas:</strong> ${chapter}</span>
          </div>
          <p class="badge badge-warning text-center" style="display:inline-block; margin-top:5px; background-color:#ffc107; color:#3c1f00; padding:3px 8px; border-radius:3px; font-size:12px; font-weight:bold;">Holiday Homework Module</p>
        </div>
        <hr class="doc-divider"/>
        
        <div class="doc-body">
          <p class="text-muted"><strong>Guidelines for Students:</strong> Homework should be done neatly. Use recycling materials for model-making tasks. Be creative!</p>
          
          <h4 class="section-title">Task A: Research & Survey Project</h4>
          <p>Investigate and research the applications of <strong>${chapter}</strong> in current technological advancements. Speak to your parents or search the internet to collect 3 interesting facts that are not given in your school textbook. Write a detailed 2-page report on a colored chart paper.</p>
          
          <h4 class="section-title">Task B: Creative Model / Diagram Designing</h4>
          <p>Design a 3D model or a beautiful 2D sketch illustrating the key mechanism of <strong>${chapter}</strong>. Label every part clearly. Write a short index card explaining what materials you used (e.g. cardboard, clay, colors) and how your model works.</p>
          
          <h4 class="section-title">Task C: Exercise & Problem Solving</h4>
          <p>Solve the first 5 descriptive questions and all numerical exercises from the NCERT book for the chapter: <em>${chapter}</em>. Write all solutions in your class notebook with date and page numbers.</p>
          
          <h4 class="section-title">Task D: Submission & Presentation Guidelines</h4>
          <ul>
            <li><strong>Submission Date:</strong> First Monday after school reopens.</li>
            <li><strong>Marks Weightage:</strong> This work carries 10 marks and will be added to your Internal Assessment grades.</li>
            <li><strong>Parental Guidance:</strong> Parents are requested to guide and monitor the student, but let them do the research and model-making work themselves.</li>
          </ul>
        </div>
        
        <div class="doc-footer text-center">
          <p>Wish you a very happy and productive summer vacation! Enjoy learning!</p>
        </div>
      </div>
    `;
    
    return html;
  },

  // 6. MCQ and Short Answer Question Paper Generator
  generateMcqShortTest(options) {
    const { classVal, subject, chapter, difficulty, marks } = options;
    
    // Retrieve questions
    let data = this.getTopicQuestions(subject, chapter);
    
    let mcqs = [];
    let short = [];
    
    if (data) {
      mcqs = [...data.mcqs];
      short = [...data.short];
    } else {
      // Procedurally generate
      for (let i = 0; i < 6; i++) {
        mcqs.push(this.proceduralDb.generateMcq(chapter, i));
      }
      for (let i = 0; i < 5; i++) {
        short.push(this.proceduralDb.generateShort(chapter, i));
      }
    }
    
    // Split marks: 50% MCQs, 50% Short Answers
    const mcqLimit = Math.min(mcqs.length, Math.ceil(marks * 0.5));
    const shortLimit = Math.min(short.length, Math.ceil((marks - mcqLimit) / 2));
    
    const testMcqs = mcqs.slice(0, mcqLimit);
    const testShort = short.slice(0, shortLimit);
    
    let html = `
      <div class="print-document">
        <div class="doc-header text-center">
          <div class="doc-logo-container" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
              <path d="M 32 30 C 26 35, 14 45, 14 50 C 14 55, 26 65, 32 70" stroke="#FF6B4A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 68 30 C 74 35, 86 45, 86 50 C 86 55, 74 65, 68 70" stroke="#E8B339" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 32 46 C 42 46, 45 42, 50 47 C 52 49, 48 54, 46 54 C 40 54, 30 50, 24 50" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" fill="none" />
              <path d="M 68 54 C 58 54, 55 58, 50 53 C 48 51, 52 46, 54 46 C 60 46, 70 50, 76 50" stroke="#E8B339" stroke-width="5" stroke-linecap="round" fill="none" />
            </svg>
            <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 20px; color: #1B1F3B;">Code<span style="color: #FF6B4A;">Rishta</span></span>
          </div>
          <h2 class="doc-school">MCQ & SHORT ANSWER TEST</h2>
          <div class="doc-meta-row">
            <span><strong>Class:</strong> ${classVal}</span> | 
            <span><strong>Subject:</strong> ${subject}</span> | 
            <span><strong>Topic:</strong> ${chapter}</span>
          </div>
          <div class="doc-meta-row">
            <span><strong>Max Marks:</strong> ${testMcqs.length + (testShort.length * 2)}</span> | 
            <span><strong>Time Allowed:</strong> 40 Mins</span> | 
            <span><strong>Difficulty:</strong> ${difficulty}</span>
          </div>
        </div>
        <hr class="doc-divider"/>
        
        <div class="doc-body">
          <p class="text-muted"><strong>Instructions:</strong> All questions are compulsory. Section A contains Multiple Choice Questions (1 mark each). Section B contains Short Answer Questions (2 marks each).</p>
          
          <h4 class="section-title">SECTION A (Multiple Choice Questions)</h4>
          <ol class="question-list">
    `;
    
    testMcqs.forEach((item, idx) => {
      html += `
        <li class="question-item">
          <div class="question-text">${item.q} <span class="marks-badge">[1 Mark]</span></div>
          <div class="options-grid">
            ${item.o.map((opt, oIdx) => `<div class="option-item">(${String.fromCharCode(97 + oIdx)}) ${opt}</div>`).join('')}
          </div>
        </li>
      `;
    });
    
    html += `
          </ol>
          
          <h4 class="section-title">SECTION B (Short Answer Questions)</h4>
          <ol class="question-list" start="${testMcqs.length + 1}">
    `;
    
    testShort.forEach((item, idx) => {
      html += `
        <li class="question-item">
          <div class="question-text">${item} <span class="marks-badge">[2 Marks]</span></div>
          <div class="writing-lines-large"></div>
        </li>
      `;
    });
    
    html += `
          </ol>
        </div>
        
        <div class="doc-footer text-center">
          <p>Recommended by CodeRishta for Revision & Practice</p>
        </div>
      </div>
    `;
    
    return html;
  }
};
