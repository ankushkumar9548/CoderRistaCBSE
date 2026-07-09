// Application Logic for CodeRishta Educational Portal

// State Management
const STATE = {
  currentCategory: "HOME",
  currentTab: "dashboard", // 'dashboard', 'browse', 'generators'
  searchQuery: "",
  typeFilter: "all",
  bookmarks: JSON.parse(localStorage.getItem("edu_bookmarks") || "[]"),
  darkMode: localStorage.getItem("edu_dark_mode") === "true",
  generatorType: "test" // 'test', 'worksheet', 'solutions', 'lesson_plan', 'homework'
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSidebar();
  initEventListeners();
  renderDashboard();
  renderResources();
  updateBookmarksCount();
  setupGeneratorSubjects();
});

// Theme Management
function initTheme() {
  const icon = document.querySelector("#theme-toggle-btn i");
  if (STATE.darkMode) {
    document.body.classList.add("dark-mode");
    if (icon) icon.className = "fas fa-sun";
  } else {
    document.body.classList.remove("dark-mode");
    if (icon) icon.className = "fas fa-moon";
  }
}

function toggleTheme() {
  STATE.darkMode = !STATE.darkMode;
  localStorage.setItem("edu_dark_mode", STATE.darkMode);
  initTheme();
  const icon = document.querySelector("#theme-toggle-btn i");
  if (icon) {
    icon.className = STATE.darkMode ? "fas fa-sun" : "fas fa-moon";
  }
}

// Sidebar Navigation Initialization
function initSidebar() {
  // Sidebar items are grouped in categories. We'll map page names to sidebar lists.
  const categories = {
    sec: ["BIOLOGY ( XI - XII )", "PHYSICS ( XI - XII )", "CHEMISTRY ( XI - XII )", "POLITICAL SCIENCE ( XI - XII )", "GEOGRAPHY ( XI - XII )", "HISTORY ( XI - XII )", "PHYSICAL EDUCATION ( XI - XII )", "BUSINESS STUDIES ( XI - XII )", "ACCOUNTANCY ( XI - XII )", "CS & IP ( XI - XII )", "ECONOMICS ( XI - XII )"],
    mid: ["MATHS ( VI - XII )", "HINDI ( VI - XII )", "ENGLISH ( VI - XII )", "SCIENCE ( VI - X )", "SOCIAL SCIENCE ( VI - X )", "SANSKRIT ( VI - X )", "CLASS XII", "CLASS XI", "CLASS X", "CLASS IX", "CLASS VI"],
    pri: ["PRIMARY CLASSES ( I - V )"],
    spec: ["NOTES", "USEFUL SOFTWARE", "POWERPOINT PRESENTATIONS", "COMPETENCY BASED EDUCATION & QUESTION BANK"],
    prep: ["STUDY MATERIAL ( PPL / VP / HM / PGT / TGT / PRT )", "STUDY MATERIAL & QUESTION BANK ( DSSSB / KVS / NVS / EMRS )", "DSSSB PRT / ASSISTANT TEACHER"]
  };

  // Helper to add links
  const createLinkHtml = (name) => {
    const data = EDUCATIONAL_DATA[name];
    if (!data) return '';
    const count = data.resources ? data.resources.length : 0;
    return `
      <a href="#" class="sidebar-link" data-category="${name}">
        <span>${name.split(" (")[0]}</span>
        <span class="badge-count">${count}</span>
      </a>
    `;
  };

  // Inject into correct lists
  document.getElementById("nav-senior-sec").innerHTML = categories.sec.map(createLinkHtml).join('');
  document.getElementById("nav-middle").innerHTML = categories.mid.map(createLinkHtml).join('');
  document.getElementById("nav-primary").innerHTML = categories.pri.map(createLinkHtml).join('');
  document.getElementById("nav-special").innerHTML = categories.spec.map(createLinkHtml).join('');
  document.getElementById("nav-exam-prep").innerHTML = categories.prep.map(createLinkHtml).join('');
  
  // Set home count dynamically
  if (document.getElementById("badge-home-count") && EDUCATIONAL_DATA["HOME"]) {
    document.getElementById("badge-home-count").innerText = EDUCATIONAL_DATA["HOME"].resources.length;
  }
}

// Event Listeners setup
function initEventListeners() {
  // Sidebar clicks
  document.querySelectorAll(".sidebar-link, .brand-container, .nav-home-btn").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = el.getAttribute("data-category") || "HOME";
      selectCategory(cat);
      // Automatically switch to browse view if not already
      switchTab("browse");
    });
  });

  // Tab switching
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");
      switchTab(tabName);
    });
  });

  // Mobile bottom nav clicks
  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab");
      switchTab(tabName);
    });
  });

  // Search input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    STATE.searchQuery = e.target.value.toLowerCase();
    renderResources();
  });

  // Filter tag clicks
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      STATE.typeFilter = btn.getAttribute("data-filter");
      renderResources();
    });
  });

  // Theme Toggle Button
  document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);

  // Generator Type Selector
  document.querySelectorAll(".gen-type-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".gen-type-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      STATE.generatorType = card.getAttribute("data-type");
      updateGeneratorFields();
    });
  });

  // Generate Button Click
  document.getElementById("generate-btn").addEventListener("click", handleGenerate);

  // Print Generated Doc
  document.getElementById("print-gen-btn").addEventListener("click", () => {
    window.print();
  });

  // Copy Generated Text
  const copyBtn = document.getElementById("copy-gen-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", handleCopyGeneratedDoc);
  }
}

// Select a category
function selectCategory(catName) {
  STATE.currentCategory = catName;
  
  // Update sidebar active class
  document.querySelectorAll(".sidebar-link").forEach(link => {
    if (link.getAttribute("data-category") === catName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update Breadcrumbs & Category Title
  document.getElementById("current-category-title").innerText = catName;
  document.getElementById("breadcrumb-category").innerText = catName;
  
  // Close sidebar drawer on mobile
  const sidebar = document.getElementById("app-sidebar");
  if (sidebar && window.innerWidth <= 1024) {
    sidebar.classList.remove("active");
  }
  
  // Re-render
  renderResources();
}

// Switch tabs
function switchTab(tabName) {
  STATE.currentTab = tabName;
  
  // Toggle UI active classes
  document.querySelectorAll(".nav-tab").forEach(tab => {
    if (tab.getAttribute("data-tab") === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Toggle mobile bottom nav active classes
  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Hide all sections, show active
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(`view-${tabName}`).classList.add("active");
  
  if (tabName === "dashboard") {
    renderDashboard();
  }
}

// Render Dashboard Statistics & Cards
function renderDashboard() {
  // Aggregate Stats
  let totalLinks = 0;
  let fileCount = 0;
  let videoCount = 0;
  let quizCount = 0;
  
  Object.values(EDUCATIONAL_DATA).forEach(cat => {
    cat.resources.forEach(res => {
      totalLinks++;
      if (res.type.includes("File") || res.type.includes("Folder")) fileCount++;
      else if (res.type.includes("Video")) videoCount++;
      else if (res.type.includes("Quiz") || res.type.includes("MyGov")) quizCount++;
    });
  });

  document.getElementById("stat-total").innerText = totalLinks;
  document.getElementById("stat-files").innerText = fileCount;
  document.getElementById("stat-videos").innerText = videoCount;
  document.getElementById("stat-quizzes").innerText = quizCount;
  
  // Render Recent Cards (extract a few interesting links from HOME page)
  const recentGrid = document.getElementById("recent-resources-grid");
  const homeData = EDUCATIONAL_DATA["HOME"];
  
  if (homeData && homeData.resources) {
    const list = homeData.resources.slice(0, 6);
    recentGrid.innerHTML = list.map(item => createCardHtml(item, "HOME")).join('');
  } else {
    recentGrid.innerHTML = `<p class="text-muted">No recent items available.</p>`;
  }
}

// Helper to determine Card Icon
function getResourceIcon(type) {
  if (type.includes("PDF") || type.includes("File")) return "far fa-file-pdf text-danger";
  if (type.includes("Folder")) return "far fa-folder text-warning";
  if (type.includes("Video")) return "fab fa-youtube text-danger";
  if (type.includes("Quiz") || type.includes("Activity")) return "fas fa-question-circle text-success";
  if (type.includes("AI") || type.includes("Gemini")) return "fas fa-robot text-primary";
  if (type.includes("WhatsApp")) return "fab fa-whatsapp text-success";
  return "fas fa-external-link-alt text-info";
}

// Card HTML Template Creator
function createCardHtml(resource, categoryName) {
  const isBookmarked = STATE.bookmarks.some(b => b.url === resource.url);
  const bookmarkIcon = isBookmarked ? "fas fa-bookmark" : "far fa-bookmark";
  const bookmarkClass = isBookmarked ? "bookmarked" : "";
  const iconClass = getResourceIcon(resource.type);
  
  // Format title
  let cleanTitle = resource.title;
  if (cleanTitle.length > 85) cleanTitle = cleanTitle.substring(0, 85) + "...";
  
  return `
    <div class="resource-card animate-fade-in">
      <div class="card-header">
        <i class="${iconClass} card-type-icon"></i>
        <button class="bookmark-btn ${bookmarkClass}" onclick="toggleBookmark(event, '${escapeHtml(resource.title)}', '${escapeHtml(resource.url)}', '${escapeHtml(resource.type)}', '${escapeHtml(categoryName)}')">
          <i class="${bookmarkIcon}"></i>
        </button>
      </div>
      <div class="card-body">
        <h4 class="card-title">${cleanTitle}</h4>
        <span class="resource-tag tag-${resource.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${resource.type}</span>
        <span class="resource-cat-tag">${categoryName}</span>
      </div>
      <div class="card-footer">
        <a href="${resource.url}" target="_blank" class="btn btn-primary btn-sm btn-open">
          <i class="fas fa-external-link-alt"></i> Open Link
        </a>
        <button class="btn btn-secondary btn-sm btn-copy" onclick="copyLink(event, '${escapeHtml(resource.url)}')">
          <i class="far fa-copy"></i> Copy
        </button>
      </div>
    </div>
  `;
}

// Render Resources
function renderResources() {
  const grid = document.getElementById("resources-grid");
  const data = EDUCATIONAL_DATA[STATE.currentCategory];
  
  if (!data) {
    grid.innerHTML = `<p class="no-results">No category selected or found.</p>`;
    return;
  }
  
  // Filter resources
  let resources = data.resources || [];
  
  // If we are looking at Bookmarks, switch data
  if (STATE.currentCategory === "FAVORITES") {
    resources = STATE.bookmarks;
  }
  
  // Apply Search
  if (STATE.searchQuery) {
    resources = resources.filter(res => 
      res.title.toLowerCase().includes(STATE.searchQuery) ||
      res.type.toLowerCase().includes(STATE.searchQuery)
    );
  }
  
  // Apply Type Filter
  if (STATE.typeFilter !== "all") {
    resources = resources.filter(res => {
      const type = res.type.toLowerCase();
      if (STATE.typeFilter === "pdf") return type.includes("pdf") || type.includes("file");
      if (STATE.typeFilter === "video") return type.includes("video") || type.includes("youtube");
      if (STATE.typeFilter === "quiz") return type.includes("quiz") || type.includes("mygov") || type.includes("activity");
      if (STATE.typeFilter === "software") return type.includes("software") || type.includes("tool") || type.includes("gemini");
      return true;
    });
  }
  
  if (resources.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search-minus"></i>
        <p>No resources found matching the criteria.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = resources.map(res => createCardHtml(res, STATE.currentCategory)).join('');
}

// Handle bookmark toggle
window.toggleBookmark = function(event, title, url, type, category) {
  event.stopPropagation();
  const idx = STATE.bookmarks.findIndex(b => b.url === url);
  if (idx === -1) {
    // Add bookmark
    STATE.bookmarks.push({ title, url, type, category });
    showToast("Added to Favorites!");
  } else {
    // Remove bookmark
    STATE.bookmarks.splice(idx, 1);
    showToast("Removed from Favorites");
  }
  
  localStorage.setItem("edu_bookmarks", JSON.stringify(STATE.bookmarks));
  updateBookmarksCount();
  
  // Re-render resources to reflect changes (especially if in Favorites view)
  renderResources();
  renderDashboard();
};

function updateBookmarksCount() {
  const count = STATE.bookmarks.length;
  document.getElementById("fav-count-badge").innerText = count;
  if (count > 0) {
    document.getElementById("fav-count-badge").style.display = "inline-block";
    const mobBadge = document.getElementById("mobile-fav-badge");
    if (mobBadge) mobBadge.style.display = "block";
  } else {
    document.getElementById("fav-count-badge").style.display = "none";
    const mobBadge = document.getElementById("mobile-fav-badge");
    if (mobBadge) mobBadge.style.display = "none";
  }
}

// Open Favorites
window.openFavorites = function(e) {
  e.preventDefault();
  selectCategory("FAVORITES");
  document.getElementById("current-category-title").innerText = "MY FAVORITE LINKS";
  document.getElementById("breadcrumb-category").innerText = "Favorites";
  switchTab("browse");
};

// Copy link function
window.copyLink = function(event, url) {
  event.stopPropagation();
  navigator.clipboard.writeText(url).then(() => {
    showToast("Link copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy link.");
  });
};

// Toast notification helper
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast-message animate-fade-in";
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Generators Field Update Logic
function updateGeneratorFields() {
  const marksField = document.getElementById("gen-field-marks");
  const diffField = document.getElementById("gen-field-difficulty");
  
  if (STATE.generatorType === "test" || STATE.generatorType === "mcq_short") {
    marksField.style.display = "block";
    diffField.style.display = "block";
  } else {
    marksField.style.display = "none";
    diffField.style.display = "none";
  }
  
  // Update header text in generator
  const titles = {
    test: "Chapter Test Generator",
    worksheet: "Student Worksheet Generator",
    solutions: "NCERT Textbook Solutions",
    lesson_plan: "Teacher's Lesson Plan Creator",
    homework: "Summer Holiday Homework Generator",
    mcq_short: "MCQ & Short Answer Practice Paper"
  };
  document.getElementById("generator-title-text").innerText = titles[STATE.generatorType];
}

// Setup Generator Dropdowns
function setupGeneratorSubjects() {
  const subjectSelect = document.getElementById("gen-subject");
  const classes = ["Science", "Maths", "English", "Hindi", "History", "Geography", "Physics", "Chemistry", "Biology", "Business Studies", "Accountancy", "Economics"];
  subjectSelect.innerHTML = classes.map(c => `<option value="${c}">${c}</option>`).join('');
}

// Handle Dynamic Generation
function handleGenerate() {
  const classVal = document.getElementById("gen-class").value;
  const subject = document.getElementById("gen-subject").value;
  const chapter = document.getElementById("gen-chapter").value.trim();
  const difficulty = document.getElementById("gen-difficulty").value;
  const marks = parseInt(document.getElementById("gen-marks").value) || 20;
  
  if (!chapter) {
    alert("Please enter a chapter name or topic!");
    return;
  }
  
  let docHtml = "";
  const options = { classVal, subject, chapter, difficulty, marks };
  
  if (STATE.generatorType === "test") {
    docHtml = GENERATORS.generateTest(options);
  } else if (STATE.generatorType === "worksheet") {
    docHtml = GENERATORS.generateWorksheet(options);
  } else if (STATE.generatorType === "solutions") {
    docHtml = GENERATORS.generateSolutions(options);
  } else if (STATE.generatorType === "lesson_plan") {
    docHtml = GENERATORS.generateLessonPlan(options);
  } else if (STATE.generatorType === "homework") {
    docHtml = GENERATORS.generateHomework(options);
  } else if (STATE.generatorType === "mcq_short") {
    docHtml = GENERATORS.generateMcqShortTest(options);
  }
  
  const container = document.getElementById("generated-doc-container");
  container.innerHTML = docHtml;
  
  // Show print actions
  document.getElementById("generator-actions").style.display = "flex";
  
  // Scroll to output
  document.getElementById("generated-doc-wrapper").scrollIntoView({ behavior: "smooth" });
}

// Copy Generated Document as rich HTML/text
function handleCopyGeneratedDoc() {
  const doc = document.getElementById("generated-doc-container");
  if (!doc) return;
  
  // Copy as Text
  const text = doc.innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Document copied as plain text!");
  }).catch(() => {
    showToast("Copy failed.");
  });
}

// Escaping helper
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
