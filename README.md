# Relational Algebra & Set Theory Interactive Learning Platform
**CSN305 - Database Systems Interactive Laboratory**

An interactive educational website designed for university students to practice and master **Relational Algebra**, **Set Theory**, and **SQL equivalence** in relational database systems.

---

## 🌟 Key Features

### 1. Collapsible Sidebar & Comprehensive Topic Coverage
- **Collapsible Sidebar**: Easily toggled to expand screen space on laptops and projectors.
- **8 Core Operations** with **21 realistic cases**:
  1. **Selection ($\sigma$)**:
     - Case 1: Numeric Comparison ($Age \ge 21$)
     - Case 2: Exact Categorical Match ($Department = \text{'CS'}$)
     - Case 3: Compound Boolean Condition ($GPA \ge 3.5 \land Age \le 20$)
  2. **Projection ($\pi$)**:
     - Case 1: Column Subsetting ($StudentID, FullName$)
     - Case 2: Distinct Projection with Duplicate Elimination ($Department$)
     - Case 3: Course ID and Credits ($CourseID, Credits$)
  3. **Cartesian Product ($\times$)**:
     - Case 1: Cross Product of Relations ($Semesters \times Clubs$)
     - Case 2: Cross Product after Projections ($Clubs \times Classrooms$)
  4. **Set Union ($\cup$)**:
     - Case 1: Union-Compatible Honors ($CS\_Honor \cup DeanList$)
     - Case 2: Projected Union of Club Rosters ($MathClub \cup RoboticsClub$)
  5. **Set Intersection ($\cap$)**:
     - Case 1: Dual Club Members ($MathClub \cap RoboticsClub$)
     - Case 2: Dual Honor Students ($CS\_Honor \cap DeanList$)
  6. **Set Difference ($-$)**:
     - Case 1: Missing Project Submissions ($EnrolledProject - SubmittedProject$)
     - Case 2: Non-overlapping Members ($MathClub - RoboticsClub$)
  7. **Rename ($\rho$)**:
     - Case 1: Renaming Relation and Attributes ($\rho_{S(ID, Name)}$)
     - Case 2: Attribute Aliasing for Subject Summary ($\rho_{Subject(Code, Title)}$)
  8. **Join Operations ($\bowtie$)** — Dedicated case for each major join type:
     - Case 1: **Inner Join** ($Students \bowtie Enrollments$)
     - Case 2: **Left Outer Join** ($Students \leftouterjoin Enrollments$) — Preserves students with `NULL` course entries
     - Case 3: **Right Outer Join** ($Students \rightouterjoin Enrollments$) — Preserves enrollments with `NULL` student profiles
     - Case 4: **Full Outer Join** ($Students \fullouterjoin Enrollments$) — Preserves all records with bidirectional `NULL` padding
     - Case 5: **Natural Join** ($Courses * Prerequisites$) — Automatic equijoin on common key without duplicate columns

### 2. Right-Side Data Tables with Distractors
- **Collapsible Vertical Cards**: Each table can be minimized or expanded individually, plus global "Expand All" / "Collapse All" controls.
- **Horizontal Scrolling**: Wide tables scroll smoothly with sleek custom scrollbars.
- **Distractor Tables**: Every exercise provides 1 to 2 extra unrelated/contextual tables (e.g., `Professors`, `Departments`, `Classrooms`) so students learn schema reasoning and table identification.

### 3. Left-Side Mathematical & SQL Equivalence
- **KaTeX Formula Rendering**: Mathematical symbols ($\sigma$, $\pi$, $\times$, $\cup$, $\cap$, $-$, $\rho$, $\bowtie$, $\leftouterjoin$, $\rightouterjoin$, $\fullouterjoin$) rendered with LaTeX precision.
- **SQL Equivalence Box**: Clean syntax-highlighted SQL with a one-click copy button.
- **Theory Modal (ⓘ)**: Clickable reference explaining concepts, formal mathematical definitions, SQL mapping, and exam tips.

### 4. Interactive Result Table Practice
- **5.1 Dynamic Column Selection**: Dropdown in each table header listing all available columns from all displayed tables (including distractor tables). Supports adding and removing columns.
- **5.2 Hybrid Cell Entry**: Students can either type values directly or click the dropdown trigger (`▾`) to pick from existing values in that column (including `NULL`).
- **5.3 Row Management**: Add rows, delete individual rows, or clear rows.
- **5.4 Automated Feedback**: Order-insensitive set validation, diagnostic messages for missing/extra columns and row counts, celebratory confetti animation upon completion, and on-demand solution inspection.

### 5. Header Title Bar
- **Course Title & Breadcrumb**: Shows the current operation and case.
- **Segmented Progress Bar** *(styled after uploaded design)*:
  - Header: `LEARNING PROGRESS` with percentage (e.g. `20%`).
  - Segmented blocks for all 21 exercises with active pulse and completion states.
  - Counter: `X / 21 COMPLETE · 1 IN PROGRESS`.
- **Full Bilingual Translation (EN / VI)**:
  - Dropdown to switch between English and Tiếng Việt.
  - Translates **everything**:
    - "Structured Query Language" -> "Ngôn Ngữ Truy Vấn Có Cấu Trúc".
    - SQL dialect: translated Vietnamese SQL keywords (`CHỌN`, `TỪ`, `VỚI ĐIỀU KIỆN`, `KẾT NỐI TRONG`, `KẾT NỐI NGOÀI TRÁI`, `KẾT NỐI NGOÀI PHẢI`, `KẾT NỐI NGOÀI ĐẦY ĐỦ`, `KẾT NỐI TỰ NHIÊN`, `KẾT NỐI CHÉO`, `HỢP`, `GIAO`, `TRỪ`, etc.).
    - Table names (`SinhVien`, `MonHoc`, `DangKy`, `GiangVien`, `Khoa`, `PhongHoc`, etc.).
    - Column names (`MaSV`, `HoTen`, `Tuoi`, `DiemTB`, `MaMH`, `TenMonHoc`, etc.).
    - Data rows and values (Vietnamese names, departments, terms).
- **Split Light / Dark Mode Toggle** *(styled after uploaded design)*:
  - Dual-segment switch: Sun half (blue background with white sun icon) and Moon half (white background with blue outline crescent moon).
  - Toggles between crisp light mode and high-contrast dark mode.
  - Persisted in browser `localStorage`.

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser (Edge, Chrome, Firefox, Safari). No compilation or complex setup required!

Alternatively, start a local server:
```bash
# Using Python
python -m http.server 8000

# Or using Node
npx serve .
```
Then visit `http://localhost:8000`.
