/**
 * Relational Algebra & Set Theory Interactive Website
 * Main Application Logic
 */

(function () {
  "use strict";

  // Application State
  const state = {
    language: localStorage.getItem("rat_lang") || "en",
    theme: localStorage.getItem("rat_theme") || "light",
    sidebarCollapsed: false,
    currentTopicId: "selection",
    currentCaseId: "sel-1",
    completedCases: new Set(JSON.parse(localStorage.getItem("rat_completed") || "[]")),
    // Interactive Student Table Data
    studentColumns: [],
    studentRows: [],
    // Open table accordions (set of table IDs)
    openTables: new Set(),
    // Active Cell Dropdown tracker
    activeDropdownCell: null,
    // Search query in sidebar
    searchQuery: ""
  };

  // Fallback map of math symbols for sidebar badges
  const SYMBOL_MAP = {
    selection: "σ",
    projection: "π",
    cartesian: "×",
    union: "∪",
    intersection: "∩",
    difference: "−",
    rename: "ρ",
    join: "⋈"
  };

  // Helper: Get active translation strings
  function t(key, params = {}) {
    const lang = state.language;
    let str = (COURSE_DATA.translations[lang] && COURSE_DATA.translations[lang][key]) ||
              (COURSE_DATA.translations.en && COURSE_DATA.translations.en[key]) || key;
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, v);
    }
    return str;
  }

  // Helper: Find current case and topic objects
  function getCurrentCase() {
    for (const topic of COURSE_DATA.topics) {
      const found = topic.cases.find(c => c.id === state.currentCaseId);
      if (found) return { topic, caseItem: found };
    }
    return { topic: COURSE_DATA.topics[0], caseItem: COURSE_DATA.topics[0].cases[0] };
  }

  // Helper: Get all available columns for the current case across all shown tables
  function getAllAvailableColumns() {
    const { caseItem } = getCurrentCase();
    const lang = state.language;
    const colList = [];
    const seen = new Set();

    caseItem.tablesShown.forEach(tableId => {
      const table = COURSE_DATA.tables[tableId];
      if (table && table.columns) {
        table.columns.forEach(col => {
          const colKey = col.key;
          const label = col.label[lang] || col.label.en;
          if (!seen.has(label)) {
            seen.add(label);
            colList.push({
              key: colKey,
              label: label,
              tableName: table.name[lang] || table.name.en,
              tableId: tableId
            });
          }
        });
      }
    });

    // Also include any renamed columns if present in expected result
    if (caseItem.expectedResult && caseItem.expectedResult.columns) {
      caseItem.expectedResult.columns.forEach(colKey => {
        // Check if already in list
        const exists = colList.some(c => c.key === colKey || c.label === colKey);
        if (!exists) {
          colList.push({
            key: colKey,
            label: colKey,
            tableName: "Result",
            tableId: "result"
          });
        }
      });
    }

    return colList;
  }

  // Helper: Get all unique cell values that appear in a column across shown tables
  function getColumnDistinctValues(selectedColKeyOrLabel) {
    if (!selectedColKeyOrLabel) return ["NULL"];
    const { caseItem } = getCurrentCase();
    const lang = state.language;
    const values = new Set(["NULL"]);

    caseItem.tablesShown.forEach(tableId => {
      const table = COURSE_DATA.tables[tableId];
      if (table && table.rows && table.columns) {
        // Find matching column by key or label
        const colDef = table.columns.find(c => c.key === selectedColKeyOrLabel || c.label[lang] === selectedColKeyOrLabel || c.label.en === selectedColKeyOrLabel);
        if (colDef) {
          table.rows.forEach(row => {
            const valObj = row[colDef.key];
            if (valObj) {
              const val = valObj[lang] || valObj.en || valObj;
              if (val !== undefined && val !== null) {
                values.add(String(val));
              }
            }
          });
        }
      }
    });

    return Array.from(values);
  }

  // Initialize or Reset Student Table for Current Case
  function initStudentTable() {
    const { caseItem } = getCurrentCase();
    const lang = state.language;
    const expectedCols = caseItem.expectedResult.columns;

    // By default, initialize with the right number of empty or pre-selectable columns
    state.studentColumns = expectedCols.map(() => "");
    // Initialize with 2 empty rows
    state.studentRows = [
      expectedCols.map(() => ""),
      expectedCols.map(() => "")
    ];

    // Reset solution drawer and feedback banner
    const feedbackBanner = document.getElementById("feedback-banner");
    if (feedbackBanner) feedbackBanner.className = "feedback-banner";

    const solutionContainer = document.getElementById("solution-container");
    if (solutionContainer) {
      solutionContainer.className = "solution-container";
      solutionContainer.innerHTML = "";
    }

    const nextBtn = document.getElementById("next-case-btn");
    if (nextBtn) {
      nextBtn.style.display = state.completedCases.has(caseItem.id) ? "inline-flex" : "none";
    }
  }

  // Switch Theme
  function setTheme(theme) {
    state.theme = theme;
    localStorage.setItem("rat_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    renderThemeToggle();
  }

  // Switch Language
  function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem("rat_lang", lang);
    renderAll();
  }

  // Switch Active Case
  function setCase(caseId) {
    state.currentCaseId = caseId;
    const { topic, caseItem } = getCurrentCase();
    state.currentTopicId = topic.id;

    // Reset table accordion open state to show required tables open by default
    state.openTables = new Set(caseItem.requiredTables);

    initStudentTable();
    renderAll();

    // Scroll to top of main workspace
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Total count of cases
  function getTotalCasesCount() {
    return COURSE_DATA.topics.reduce((acc, topic) => acc + topic.cases.length, 0);
  }

  // =========================================================================
  // RENDER FUNCTIONS
  // =========================================================================

  function renderAll() {
    renderHeader();
    renderSidebar();
    renderCaseDetails();
    renderSourceTables();
    renderInteractiveTable();
    renderProgressBar();
  }

  // Render Title Bar / Header
  function renderHeader() {
    const { topic, caseItem } = getCurrentCase();
    const lang = state.language;

    // Site Title
    const siteTitleEl = document.getElementById("site-title-text");
    if (siteTitleEl) {
      siteTitleEl.textContent = t("siteTitle");
    }

    // Topic Breadcrumb
    const breadcrumbEl = document.getElementById("topic-breadcrumb-text");
    if (breadcrumbEl) {
      const topicName = topic.name[lang] || topic.name.en;
      const caseTitle = caseItem.title[lang] || caseItem.title.en;
      breadcrumbEl.textContent = `${topicName} • ${caseTitle}`;
    }

    // Language Dropdown
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
      langSelect.value = state.language;
    }

    // Theme Switch
    renderThemeToggle();
  }

  // Render Theme Toggle (Matching User Image 2)
  function renderThemeToggle() {
    const toggleBtn = document.getElementById("theme-switch-btn");
    if (!toggleBtn) return;
    toggleBtn.setAttribute("title", t("themeToggle"));
    toggleBtn.setAttribute("aria-label", t("themeToggle"));
  }

  // Render Learning Progress (Matching User Image 1)
  function renderProgressBar() {
    const totalCases = getTotalCasesCount();
    const completedCount = state.completedCases.size;
    const percentage = Math.round((completedCount / totalCases) * 100);

    const labelEl = document.getElementById("progress-label");
    if (labelEl) labelEl.textContent = t("learningProgress");

    const pctEl = document.getElementById("progress-percentage");
    if (pctEl) pctEl.textContent = `${percentage}%`;

    const bottomEl = document.getElementById("progress-bottom-text");
    if (bottomEl) {
      const inProgressCount = 1;
      bottomEl.textContent = `${completedCount} / ${totalCases} ${t("complete")}  ·  ${inProgressCount} ${t("inProgress")}`;
    }

    // Render Segment Blocks
    const trackEl = document.getElementById("progress-segments-track");
    if (trackEl) {
      trackEl.innerHTML = "";
      // Collect all case IDs in order
      const allCases = [];
      COURSE_DATA.topics.forEach(tp => {
        tp.cases.forEach(cs => allCases.push(cs.id));
      });

      allCases.forEach(caseId => {
        const seg = document.createElement("div");
        seg.className = "progress-segment";

        if (state.completedCases.has(caseId)) {
          seg.classList.add("completed");
        } else if (caseId === state.currentCaseId) {
          seg.classList.add("in-progress");
        }
        trackEl.appendChild(seg);
      });
    }
  }

  // Render Sidebar
  function renderSidebar() {
    const sidebarEl = document.getElementById("sidebar");
    const container = document.getElementById("sidebar-content");
    if (!container) return;

    if (state.sidebarCollapsed) {
      sidebarEl.classList.add("collapsed");
    } else {
      sidebarEl.classList.remove("collapsed");
    }

    const lang = state.language;
    const query = state.searchQuery.toLowerCase().trim();

    container.innerHTML = "";

    COURSE_DATA.topics.forEach(topic => {
      const topicName = topic.name[lang] || topic.name.en;
      const filteredCases = topic.cases.filter(cs => {
        if (!query) return true;
        const title = (cs.title[lang] || cs.title.en).toLowerCase();
        const instr = (cs.instruction[lang] || cs.instruction.en).toLowerCase();
        return title.includes(query) || instr.includes(query);
      });

      if (filteredCases.length === 0) return;

      const groupEl = document.createElement("div");
      groupEl.className = "topic-group";
      // Open topic if it contains the active case or if searching
      if (topic.id === state.currentTopicId || query.length > 0) {
        groupEl.classList.add("open");
      }

      // Topic Header Button
      const headerBtn = document.createElement("button");
      headerBtn.className = "topic-header-btn";
      const symbolChar = topic.unicode || SYMBOL_MAP[topic.id] || "•";
      headerBtn.innerHTML = `
        <div class="topic-title-area">
          <span class="topic-symbol-badge">${symbolChar}</span>
          <span class="topic-name-text">${topicName}</span>
        </div>
        <svg class="topic-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      `;
      headerBtn.addEventListener("click", () => {
        groupEl.classList.toggle("open");
      });
      groupEl.appendChild(headerBtn);

      // Case List
      const caseList = document.createElement("div");
      caseList.className = "case-list";

      filteredCases.forEach(cs => {
        const caseBtn = document.createElement("button");
        caseBtn.className = "case-item-btn";
        if (cs.id === state.currentCaseId) {
          caseBtn.classList.add("active");
        }

        const isCompleted = state.completedCases.has(cs.id);
        const isInProgress = cs.id === state.currentCaseId && !isCompleted;
        const statusClass = isCompleted ? "completed" : (isInProgress ? "in-progress" : "");

        const caseTitle = cs.title[lang] || cs.title.en;
        caseBtn.setAttribute("title", caseTitle);

        caseBtn.innerHTML = `
          <div class="case-title-left">
            <span class="case-status-icon ${statusClass}">
              ${isCompleted ? '✓' : ''}
            </span>
            <span class="case-name-text">${caseTitle}</span>
          </div>
          ${cs.joinType ? `<span class="case-badge">${cs.joinType}</span>` : `<span class="case-badge">${cs.difficulty}</span>`}
        `;

        caseBtn.addEventListener("click", () => {
          setCase(cs.id);
        });

        caseList.appendChild(caseBtn);
      });

      groupEl.appendChild(caseList);
      container.appendChild(groupEl);
    });

    // Update Reset button text
    const resetBtn = document.getElementById("reset-progress-btn");
    if (resetBtn) {
      resetBtn.textContent = t("resetProgress");
    }
  }

  // Render Operation & SQL Details (Left Card)
  function renderCaseDetails() {
    const { topic, caseItem } = getCurrentCase();
    const lang = state.language;

    // Category and Main Title
    const catTag = document.getElementById("case-category-tag");
    if (catTag) catTag.textContent = topic.name[lang] || topic.name.en;

    const mainTitle = document.getElementById("case-main-title");
    if (mainTitle) mainTitle.textContent = caseItem.title[lang] || caseItem.title.en;

    // Instruction Text
    const instrText = document.getElementById("case-instruction-text");
    if (instrText) instrText.textContent = caseItem.instruction[lang] || caseItem.instruction.en;

    // KaTeX Formula Box
    const mathBox = document.getElementById("math-formula-box");
    if (mathBox) {
      const formula = (lang === "vi" && caseItem.relationalAlgebraVi)
        ? caseItem.relationalAlgebraVi
        : caseItem.relationalAlgebra;

      try {
        if (typeof katex !== "undefined") {
          katex.render(formula, mathBox, {
            throwOnError: false,
            displayMode: true
          });
        } else {
          mathBox.textContent = formula;
        }
      } catch (err) {
        mathBox.textContent = formula;
      }
    }

    // SQL Dialect Badge & Query Box
    const sqlDialectBadge = document.getElementById("sql-dialect-badge");
    if (sqlDialectBadge) {
      sqlDialectBadge.textContent = t("sqlDialectLabel");
    }

    const sqlCodeBlock = document.getElementById("sql-code-block");
    if (sqlCodeBlock) {
      const sqlQuery = caseItem.sql[lang] || caseItem.sql.en;
      sqlCodeBlock.textContent = sqlQuery;
    }

    // Theory Button
    const theoryBtn = document.getElementById("info-theory-btn");
    if (theoryBtn) {
      theoryBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span>${t("readMoreInfo")}</span>
      `;
    }

    // Copy SQL Button
    const copySqlBtn = document.getElementById("copy-sql-btn");
    if (copySqlBtn) {
      copySqlBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>${t("copySql")}</span>
      `;
    }

    // Result section labels
    const resTitle = document.getElementById("result-title-text");
    if (resTitle) resTitle.textContent = t("resultTableHeader");

    const resHelp = document.getElementById("result-help-text");
    if (resHelp) resHelp.textContent = t("resultTableHelp");

    const addColBtn = document.getElementById("add-col-btn");
    if (addColBtn) addColBtn.textContent = t("addColumn");

    const remColBtn = document.getElementById("rem-col-btn");
    if (remColBtn) remColBtn.textContent = t("removeColumn");

    const addRowBtn = document.getElementById("add-row-btn");
    if (addRowBtn) addRowBtn.textContent = t("addRow");

    const clearTableBtn = document.getElementById("clear-table-btn");
    if (clearTableBtn) clearTableBtn.textContent = t("clearTable");

    const checkBtn = document.getElementById("check-answer-btn");
    if (checkBtn) checkBtn.textContent = t("checkAnswer");

    const showSolBtn = document.getElementById("show-solution-btn");
    if (showSolBtn) showSolBtn.textContent = t("showSolution");

    const hintBtn = document.getElementById("show-hint-btn");
    if (hintBtn) hintBtn.textContent = t("showHint");

    const nextBtn = document.getElementById("next-case-btn");
    if (nextBtn) nextBtn.textContent = t("nextCase");
  }

  // Render Right Column: Database Source Tables (Accordion Cards)
  function renderSourceTables() {
    const { caseItem } = getCurrentCase();
    const container = document.getElementById("tables-accordion-container");
    if (!container) return;

    const lang = state.language;
    container.innerHTML = "";

    // Set distractor notice text
    const distNotice = document.getElementById("distractor-alert-notice");
    if (distNotice) distNotice.textContent = t("distractorNotice");

    const tablesTitle = document.getElementById("tables-main-title");
    if (tablesTitle) {
      tablesTitle.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
        <span>${t("availableTablesTitle")}</span>
      `;
    }

    const expAllBtn = document.getElementById("expand-all-tables-btn");
    if (expAllBtn) expAllBtn.textContent = t("expandAll");

    const colAllBtn = document.getElementById("collapse-all-tables-btn");
    if (colAllBtn) colAllBtn.textContent = t("collapseAll");

    // Render each table card
    caseItem.tablesShown.forEach(tableId => {
      const table = COURSE_DATA.tables[tableId];
      if (!table) return;

      const isOpen = state.openTables.has(tableId);
      const tableName = table.name[lang] || table.name.en;
      const tableDesc = table.description[lang] || table.description.en;
      const rowsCount = table.rows.length;
      const colsCount = table.columns.length;

      const card = document.createElement("div");
      card.className = `table-accordion-card ${isOpen ? "open" : ""}`;
      card.id = `table-card-${tableId}`;

      // Card Header
      const header = document.createElement("div");
      header.className = "table-card-header";
      header.innerHTML = `
        <div class="table-header-title-group">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>
          <span class="table-name-badge">${tableName}</span>
          <span class="table-meta-badge">${rowsCount} ${t("rowsCount")} • ${colsCount} ${t("colsCount")}</span>
        </div>
        <svg class="table-toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      `;

      header.addEventListener("click", () => {
        if (state.openTables.has(tableId)) {
          state.openTables.delete(tableId);
          card.classList.remove("open");
        } else {
          state.openTables.add(tableId);
          card.classList.add("open");
        }
      });
      card.appendChild(header);

      // Card Body
      const body = document.createElement("div");
      body.className = "table-card-body";

      const descP = document.createElement("p");
      descP.className = "table-desc-text";
      descP.textContent = tableDesc;
      body.appendChild(descP);

      // Horizontally scrollable table wrapper
      const tableWrapper = document.createElement("div");
      tableWrapper.className = "data-table-scroll-wrapper";

      const dbTable = document.createElement("table");
      dbTable.className = "db-data-table";

      // Thead
      const thead = document.createElement("thead");
      const trHead = document.createElement("tr");
      table.columns.forEach(col => {
        const th = document.createElement("th");
        const colLabel = col.label[lang] || col.label.en;
        th.innerHTML = `${colLabel}<span class="type-subtext">${col.type}</span>`;
        trHead.appendChild(th);
      });
      thead.appendChild(trHead);
      dbTable.appendChild(thead);

      // Tbody
      const tbody = document.createElement("tbody");
      table.rows.forEach(row => {
        const tr = document.createElement("tr");
        table.columns.forEach(col => {
          const td = document.createElement("td");
          const valObj = row[col.key];
          const valStr = valObj ? (valObj[lang] || valObj.en || valObj) : "NULL";
          td.textContent = valStr;
          if (valStr === "NULL") td.classList.add("null-value");
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      dbTable.appendChild(tbody);

      tableWrapper.appendChild(dbTable);
      body.appendChild(tableWrapper);
      card.appendChild(body);

      container.appendChild(card);
    });
  }

  // Render Interactive Student Result Table
  function renderInteractiveTable() {
    const tableEl = document.getElementById("interactive-table");
    if (!tableEl) return;

    const availableCols = getAllAvailableColumns();
    const lang = state.language;

    tableEl.innerHTML = "";

    // Thead
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    state.studentColumns.forEach((selectedColKey, colIndex) => {
      const th = document.createElement("th");

      const select = document.createElement("select");
      select.className = "col-select-dropdown";
      select.innerHTML = `<option value="">${t("selectColumnPlaceholder")}</option>`;

      availableCols.forEach(ac => {
        const opt = document.createElement("option");
        opt.value = ac.key;
        opt.textContent = `${ac.label} (${ac.tableName})`;
        // Check if selected by key or label
        if (selectedColKey === ac.key || selectedColKey === ac.label) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });

      select.addEventListener("change", (e) => {
        state.studentColumns[colIndex] = e.target.value;
        // Re-render table cells to update dropdown values
        renderInteractiveTable();
      });

      th.appendChild(select);
      trHead.appendChild(th);
    });

    // Action column header (Delete row)
    const actionTh = document.createElement("th");
    actionTh.className = "action-th";
    actionTh.innerHTML = `<span title="Actions">✕</span>`;
    trHead.appendChild(actionTh);

    thead.appendChild(trHead);
    tableEl.appendChild(thead);

    // Tbody
    const tbody = document.createElement("tbody");

    state.studentRows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      tr.id = `student-row-${rowIndex}`;

      state.studentColumns.forEach((colKey, colIndex) => {
        const td = document.createElement("td");
        const cellVal = row[colIndex] || "";

        // Cell Combobox Wrapper
        const comboWrapper = document.createElement("div");
        comboWrapper.className = "cell-combobox-wrapper";

        // Input
        const input = document.createElement("input");
        input.type = "text";
        input.className = "cell-input";
        input.placeholder = t("selectValuePlaceholder");
        input.value = cellVal;

        input.addEventListener("input", (e) => {
          state.studentRows[rowIndex][colIndex] = e.target.value;
        });

        // Trigger Button
        const triggerBtn = document.createElement("button");
        triggerBtn.type = "button";
        triggerBtn.className = "cell-select-trigger";
        triggerBtn.title = t("pickFromList");
        triggerBtn.innerHTML = `▾`;

        // Dropdown Menu Popover
        const menu = document.createElement("div");
        menu.className = "cell-dropdown-menu";

        const distinctVals = getColumnDistinctValues(colKey);
        distinctVals.forEach(val => {
          const opt = document.createElement("div");
          opt.className = "cell-dropdown-option";
          opt.textContent = val;
          opt.addEventListener("click", () => {
            input.value = val;
            state.studentRows[rowIndex][colIndex] = val;
            menu.classList.remove("show");
            state.activeDropdownCell = null;
          });
          menu.appendChild(opt);
        });

        triggerBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          // Close any other open dropdown
          document.querySelectorAll(".cell-dropdown-menu.show").forEach(m => {
            if (m !== menu) m.classList.remove("show");
          });

          menu.classList.toggle("show");
          state.activeDropdownCell = menu.classList.contains("show") ? menu : null;
        });

        comboWrapper.appendChild(input);
        comboWrapper.appendChild(triggerBtn);
        comboWrapper.appendChild(menu);
        td.appendChild(comboWrapper);
        tr.appendChild(td);
      });

      // Delete Row Button
      const actionTd = document.createElement("td");
      actionTd.className = "action-td";
      const delBtn = document.createElement("button");
      delBtn.className = "delete-row-btn";
      delBtn.title = "Delete Row";
      delBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
      delBtn.addEventListener("click", () => {
        state.studentRows.splice(rowIndex, 1);
        renderInteractiveTable();
      });
      actionTd.appendChild(delBtn);
      tr.appendChild(actionTd);

      tbody.appendChild(tr);
    });

    tableEl.appendChild(tbody);
  }

  // =========================================================================
  // RESULT CHECKING ALGORITHM
  // =========================================================================
  function checkAnswer() {
    const { caseItem } = getCurrentCase();
    const lang = state.language;
    const expected = caseItem.expectedResult;
    const feedbackBanner = document.getElementById("feedback-banner");
    const solutionContainer = document.getElementById("solution-container");

    // Clear previous row classes
    document.querySelectorAll(".interactive-table tr").forEach(tr => {
      tr.classList.remove("row-correct", "row-incorrect");
    });

    // 1. Validate Columns
    // Normalize student columns to lowercase keys
    const studentCols = state.studentColumns.map(c => (c || "").trim());

    // Check for empty column selection
    if (studentCols.some(c => !c)) {
      showFeedback("incorrect", t("incorrectFeedback") + " " + t("selectColumnPlaceholder"));
      return;
    }

    // Check for duplicates in column selection
    const colSet = new Set(studentCols);
    if (colSet.size !== studentCols.length) {
      showFeedback("incorrect", t("duplicateColumns"));
      return;
    }

    // Expected column keys
    const expectedCols = expected.columns;

    // Map column labels or keys
    const studentColKeys = studentCols.map(c => {
      // Find matching column in shown tables or expected result
      for (const tId of caseItem.tablesShown) {
        const table = COURSE_DATA.tables[tId];
        if (table) {
          const col = table.columns.find(col => col.key === c || col.label[lang] === c || col.label.en === c);
          if (col) return col.key;
        }
      }
      return c;
    });

    // Check missing columns
    const missing = expectedCols.filter(ec => !studentColKeys.includes(ec));
    const extra = studentColKeys.filter(sc => !expectedCols.includes(sc));

    if (missing.length > 0 || extra.length > 0) {
      let msg = t("incorrectFeedback") + "<br/>";
      if (missing.length > 0) msg += `<strong>${t("missingColumns")}</strong> ${missing.join(", ")}<br/>`;
      if (extra.length > 0) msg += `<strong>${t("extraColumns")}</strong> ${extra.join(", ")}`;
      showFeedback("incorrect", msg);
      return;
    }

    // 2. Validate Rows & Values (Set Semantics: Order Insensitive)
    const expectedRows = expected.rows;
    const studentRows = state.studentRows;

    if (studentRows.length !== expectedRows.length) {
      showFeedback("incorrect", t("rowMismatch", {
        actual: studentRows.length,
        expected: expectedRows.length
      }));
      return;
    }

    // Helper to normalize cell value for comparison
    function normalizeVal(val) {
      if (val === null || val === undefined) return "null";
      const s = String(val).trim().toLowerCase();
      // Handle numeric equivalences like 3.8 vs 3.80
      const num = parseFloat(s);
      if (!isNaN(num) && String(num) === s) return String(num);
      return s;
    }

    // Format expected row as map: colKey -> normalized value (both en and vi accepted)
    const expectedTuples = expectedRows.map(rowObj => {
      const tuple = {};
      expectedCols.forEach(colKey => {
        const valObj = rowObj[colKey];
        if (valObj) {
          tuple[colKey] = [
            normalizeVal(valObj.en),
            normalizeVal(valObj.vi),
            normalizeVal(valObj)
          ];
        } else {
          tuple[colKey] = ["null"];
        }
      });
      return tuple;
    });

    // Format student rows as map: colKey -> normalized value
    const studentTuples = studentRows.map((rowArr, rowIndex) => {
      const tuple = {};
      studentColKeys.forEach((colKey, colIdx) => {
        tuple[colKey] = normalizeVal(rowArr[colIdx]);
      });
      return { rowIndex, tuple };
    });

    // Try matching student tuples with expected tuples (1-to-1 matching)
    const matchedExpectedIndices = new Set();
    const matchedStudentRows = new Set();

    studentTuples.forEach(({ rowIndex, tuple }) => {
      for (let i = 0; i < expectedTuples.length; i++) {
        if (matchedExpectedIndices.has(i)) continue;

        const expTuple = expectedTuples[i];
        let allMatch = true;

        for (const colKey of expectedCols) {
          const studentVal = tuple[colKey];
          const validAcceptableVals = expTuple[colKey];
          if (!validAcceptableVals.includes(studentVal)) {
            allMatch = false;
            break;
          }
        }

        if (allMatch) {
          matchedExpectedIndices.add(i);
          matchedStudentRows.add(rowIndex);
          break;
        }
      }
    });

    // Highlight rows
    studentRows.forEach((_, rowIndex) => {
      const tr = document.getElementById(`student-row-${rowIndex}`);
      if (tr) {
        if (matchedStudentRows.has(rowIndex)) {
          tr.classList.add("row-correct");
        } else {
          tr.classList.add("row-incorrect");
        }
      }
    });

    // Check if 100% matched
    if (matchedStudentRows.size === expectedRows.length && matchedExpectedIndices.size === expectedRows.length) {
      // SUCCESS!
      showFeedback("correct", t("correctCongratulations"));

      // Trigger celebratory confetti
      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Mark case as completed
      state.completedCases.add(caseItem.id);
      localStorage.setItem("rat_completed", JSON.stringify(Array.from(state.completedCases)));

      // Update progress and sidebar
      renderProgressBar();
      renderSidebar();

      // Show next button
      const nextBtn = document.getElementById("next-case-btn");
      if (nextBtn) nextBtn.style.display = "inline-flex";
    } else {
      const unmatchedCount = expectedRows.length - matchedStudentRows.size;
      showFeedback("incorrect", t("incorrectFeedback") + ` ${unmatchedCount} row(s) do not match expected tuple values.`);
    }
  }

  // Display feedback banner
  function showFeedback(type, htmlContent) {
    const banner = document.getElementById("feedback-banner");
    if (!banner) return;
    banner.className = `feedback-banner show ${type}`;
    banner.innerHTML = htmlContent;
    banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Show Hint
  function showHint() {
    const { caseItem } = getCurrentCase();
    const lang = state.language;
    const tips = caseItem.theory.tips[lang] || caseItem.theory.tips.en;
    const expectedRowCount = caseItem.expectedResult.rows.length;
    const expectedColCount = caseItem.expectedResult.columns.length;

    const hintMsg = `
      <strong>💡 Hint:</strong> ${tips}<br/>
      <small>Target schema has <strong>${expectedColCount}</strong> columns and produces exactly <strong>${expectedRowCount}</strong> tuples.</small>
    `;
    showFeedback("hint", hintMsg);
  }

  // Show or Hide Solution Table
  function toggleSolution() {
    const container = document.getElementById("solution-container");
    const btn = document.getElementById("show-solution-btn");
    if (!container || !btn) return;

    if (container.classList.contains("show")) {
      container.classList.remove("show");
      container.innerHTML = "";
      btn.textContent = t("showSolution");
    } else {
      const { caseItem } = getCurrentCase();
      const lang = state.language;
      const expected = caseItem.expectedResult;

      let tableHtml = `
        <div class="solution-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>
          <span>Expected Solution Schema & Data</span>
        </div>
        <div class="data-table-scroll-wrapper">
          <table class="db-data-table">
            <thead>
              <tr>
                ${expected.columns.map(col => `<th>${col}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${expected.rows.map(row => `
                <tr>
                  ${expected.columns.map(col => {
                    const val = row[col];
                    const valStr = val ? (val[lang] || val.en || val) : "NULL";
                    return `<td class="${valStr === "NULL" ? "null-value" : ""}">${valStr}</td>`;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;

      container.innerHTML = tableHtml;
      container.classList.add("show");
      btn.textContent = t("hideSolution");
    }
  }

  // Go to Next Case
  function nextCase() {
    let nextCaseId = null;
    let foundCurrent = false;

    for (const topic of COURSE_DATA.topics) {
      for (const cs of topic.cases) {
        if (foundCurrent) {
          nextCaseId = cs.id;
          break;
        }
        if (cs.id === state.currentCaseId) {
          foundCurrent = true;
        }
      }
      if (nextCaseId) break;
    }

    if (nextCaseId) {
      setCase(nextCaseId);
    } else {
      // Loop back to first case or show celebration
      alert(t("correctCongratulations"));
    }
  }

  // Open Theory Information Modal
  function openTheoryModal() {
    const { topic, caseItem } = getCurrentCase();
    const lang = state.language;
    const modal = document.getElementById("theory-modal");
    if (!modal) return;

    document.getElementById("modal-title-text").textContent = `${topic.name[lang] || topic.name.en} - ${t("theoryModalTitle")}`;
    document.getElementById("theory-concept-label").textContent = t("theoryConcept");
    document.getElementById("theory-concept-content").textContent = caseItem.theory.concept[lang] || caseItem.theory.concept.en;

    document.getElementById("theory-formal-label").textContent = t("theoryFormal");
    const formalBox = document.getElementById("theory-formal-content");
    const formalFormula = caseItem.theory.formal[lang] || caseItem.theory.formal.en;
    if (typeof katex !== "undefined") {
      katex.render(formalFormula, formalBox, { throwOnError: false, displayMode: true });
    } else {
      formalBox.textContent = formalFormula;
    }

    document.getElementById("theory-sql-label").textContent = t("theorySqlMapping");
    document.getElementById("theory-sql-content").textContent = caseItem.theory.sqlMapping[lang] || caseItem.theory.sqlMapping.en;

    document.getElementById("theory-tips-label").textContent = t("theoryTips");
    document.getElementById("theory-tips-content").textContent = caseItem.theory.tips[lang] || caseItem.theory.tips.en;

    document.getElementById("modal-close-btn-text").textContent = t("closeModal");

    modal.classList.add("show");
  }

  function closeTheoryModal() {
    const modal = document.getElementById("theory-modal");
    if (modal) modal.classList.remove("show");
  }

  // Reset all progress
  function resetAllProgress() {
    if (confirm(t("resetProgressConfirm"))) {
      state.completedCases.clear();
      localStorage.removeItem("rat_completed");
      renderProgressBar();
      renderSidebar();
      const nextBtn = document.getElementById("next-case-btn");
      if (nextBtn) nextBtn.style.display = "none";
    }
  }

  // =========================================================================
  // SETUP EVENT LISTENERS
  // =========================================================================
  function setupEventListeners() {
    // Sidebar toggle button
    const toggleSidebarBtn = document.getElementById("toggle-sidebar-btn");
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener("click", () => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        renderSidebar();
      });
    }

    // Sidebar search input
    const searchInput = document.getElementById("sidebar-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderSidebar();
      });
    }

    // Theme toggle switch
    const themeBtn = document.getElementById("theme-switch-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const nextTheme = state.theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
      });
    }

    // Language dropdown
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        setLanguage(e.target.value);
      });
    }

    // Theory modal triggers
    const infoBtn = document.getElementById("info-theory-btn");
    if (infoBtn) {
      infoBtn.addEventListener("click", openTheoryModal);
    }

    const modalCloseX = document.getElementById("modal-close-x");
    if (modalCloseX) modalCloseX.addEventListener("click", closeTheoryModal);

    const modalCloseBtn = document.getElementById("modal-close-btn");
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeTheoryModal);

    const modalOverlay = document.getElementById("theory-modal");
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeTheoryModal();
      });
    }

    // Copy SQL Button
    const copySqlBtn = document.getElementById("copy-sql-btn");
    if (copySqlBtn) {
      copySqlBtn.addEventListener("click", () => {
        const sqlText = document.getElementById("sql-code-block").textContent;
        navigator.clipboard.writeText(sqlText).then(() => {
          const originalText = copySqlBtn.innerHTML;
          copySqlBtn.innerHTML = `✓ ${t("sqlCopied")}`;
          setTimeout(() => {
            copySqlBtn.innerHTML = originalText;
          }, 2000);
        });
      });
    }

    // Expand All / Collapse All tables
    const expAll = document.getElementById("expand-all-tables-btn");
    if (expAll) {
      expAll.addEventListener("click", () => {
        const { caseItem } = getCurrentCase();
        state.openTables = new Set(caseItem.tablesShown);
        renderSourceTables();
      });
    }

    const colAll = document.getElementById("collapse-all-tables-btn");
    if (colAll) {
      colAll.addEventListener("click", () => {
        state.openTables.clear();
        renderSourceTables();
      });
    }

    // Interactive Table Column & Row Controls
    const addColBtn = document.getElementById("add-col-btn");
    if (addColBtn) {
      addColBtn.addEventListener("click", () => {
        state.studentColumns.push("");
        state.studentRows.forEach(r => r.push(""));
        renderInteractiveTable();
      });
    }

    const remColBtn = document.getElementById("rem-col-btn");
    if (remColBtn) {
      remColBtn.addEventListener("click", () => {
        if (state.studentColumns.length > 1) {
          state.studentColumns.pop();
          state.studentRows.forEach(r => r.pop());
          renderInteractiveTable();
        }
      });
    }

    const addRowBtn = document.getElementById("add-row-btn");
    if (addRowBtn) {
      addRowBtn.addEventListener("click", () => {
        state.studentRows.push(state.studentColumns.map(() => ""));
        renderInteractiveTable();
      });
    }

    const clearTableBtn = document.getElementById("clear-table-btn");
    if (clearTableBtn) {
      clearTableBtn.addEventListener("click", () => {
        state.studentRows = [state.studentColumns.map(() => "")];
        renderInteractiveTable();
      });
    }

    // Check Answer
    const checkBtn = document.getElementById("check-answer-btn");
    if (checkBtn) {
      checkBtn.addEventListener("click", checkAnswer);
    }

    // Hint
    const hintBtn = document.getElementById("show-hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", showHint);
    }

    // Solution
    const solBtn = document.getElementById("show-solution-btn");
    if (solBtn) {
      solBtn.addEventListener("click", toggleSolution);
    }

    // Next case
    const nextBtn = document.getElementById("next-case-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", nextCase);
    }

    // Reset Progress
    const resetBtn = document.getElementById("reset-progress-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", resetAllProgress);
    }

    // Close any cell dropdown menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".cell-combobox-wrapper")) {
        document.querySelectorAll(".cell-dropdown-menu.show").forEach(m => m.classList.remove("show"));
        state.activeDropdownCell = null;
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeTheoryModal();
        document.querySelectorAll(".cell-dropdown-menu.show").forEach(m => m.classList.remove("show"));
      }
    });
  }

  // App Initialization
  function init() {
    document.documentElement.setAttribute("data-theme", state.theme);
    initStudentTable();
    setupEventListeners();
    renderAll();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
