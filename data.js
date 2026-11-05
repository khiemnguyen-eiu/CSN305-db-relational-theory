/**
 * Relational Algebra & Set Theory Interactive Learning Platform
 * Bilingual Course Data (English & Vietnamese)
 * Contains Topics, Operations, Cases, Source Tables, Distractor Tables, and Expected Results.
 */

const COURSE_DATA = {
  // Global common tables pool
  tables: {
    students: {
      id: "students",
      name: { en: "Students", vi: "SinhVien" },
      description: {
        en: "Student demographic and academic records",
        vi: "Hồ sơ thông tin và học vụ của sinh viên"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" },
        { key: "Age", label: { en: "Age", vi: "Tuoi" }, type: "INT" },
        { key: "GPA", label: { en: "GPA", vi: "DiemTB" }, type: "DECIMAL(3,2)" },
        { key: "Department", label: { en: "Department", vi: "Khoa" }, type: "VARCHAR(20)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
          Age: { en: "21", vi: "21" },
          GPA: { en: "3.8", vi: "3.8" },
          Department: { en: "CS", vi: "CNTT" }
        },
        {
          StudentID: { en: "S02", vi: "SV02" },
          FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" },
          Age: { en: "20", vi: "20" },
          GPA: { en: "3.4", vi: "3.4" },
          Department: { en: "IS", vi: "HTTT" }
        },
        {
          StudentID: { en: "S03", vi: "SV03" },
          FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
          Age: { en: "22", vi: "22" },
          GPA: { en: "2.9", vi: "2.9" },
          Department: { en: "CS", vi: "CNTT" }
        },
        {
          StudentID: { en: "S04", vi: "SV04" },
          FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" },
          Age: { en: "19", vi: "19" },
          GPA: { en: "3.9", vi: "3.9" },
          Department: { en: "SE", vi: "KTPM" }
        },
        {
          StudentID: { en: "S05", vi: "SV05" },
          FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" },
          Age: { en: "23", vi: "23" },
          GPA: { en: "3.1", vi: "3.1" },
          Department: { en: "IS", vi: "HTTT" }
        }
      ]
    },

    courses: {
      id: "courses",
      name: { en: "Courses", vi: "MonHoc" },
      description: {
        en: "Catalog of academic courses offered",
        vi: "Danh mục các môn học trong chương trình đào tạo"
      },
      columns: [
        { key: "CourseID", label: { en: "CourseID", vi: "MaMH" }, type: "VARCHAR(10)" },
        { key: "CourseName", label: { en: "CourseName", vi: "TenMonHoc" }, type: "VARCHAR(50)" },
        { key: "Credits", label: { en: "Credits", vi: "SoTinChi" }, type: "INT" },
        { key: "Department", label: { en: "Department", vi: "Khoa" }, type: "VARCHAR(20)" }
      ],
      rows: [
        {
          CourseID: { en: "CS101", vi: "MH101" },
          CourseName: { en: "Database Systems", vi: "Cơ Sở Dữ Liệu" },
          Credits: { en: "3", vi: "3" },
          Department: { en: "CS", vi: "CNTT" }
        },
        {
          CourseID: { en: "CS102", vi: "MH102" },
          CourseName: { en: "Computer Networks", vi: "Mạng Máy Tính" },
          Credits: { en: "4", vi: "4" },
          Department: { en: "CS", vi: "CNTT" }
        },
        {
          CourseID: { en: "IS201", vi: "MH201" },
          CourseName: { en: "Enterprise Systems", vi: "Hệ Thống Doanh Nghiệp" },
          Credits: { en: "3", vi: "3" },
          Department: { en: "IS", vi: "HTTT" }
        },
        {
          CourseID: { en: "SE301", vi: "MH301" },
          CourseName: { en: "Software Architecture", vi: "Kiến Trúc Phần Mềm" },
          Credits: { en: "3", vi: "3" },
          Department: { en: "SE", vi: "KTPM" }
        }
      ]
    },

    enrollments: {
      id: "enrollments",
      name: { en: "Enrollments", vi: "DangKy" },
      description: {
        en: "Course registration records (Notice: S06 has no student record, S04/S05 have no enrollment)",
        vi: "Bảng ghi đăng ký môn học (Lưu ý: SV06 chưa có hồ sơ sinh viên, SV04/SV05 chưa đăng ký)"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "CourseID", label: { en: "CourseID", vi: "MaMH" }, type: "VARCHAR(10)" },
        { key: "Semester", label: { en: "Semester", vi: "HocKy" }, type: "VARCHAR(20)" },
        { key: "Grade", label: { en: "Grade", vi: "DiemChu" }, type: "VARCHAR(2)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          CourseID: { en: "CS101", vi: "MH101" },
          Semester: { en: "Fall2024", vi: "HK1_2024" },
          Grade: { en: "A", vi: "A" }
        },
        {
          StudentID: { en: "S01", vi: "SV01" },
          CourseID: { en: "CS102", vi: "MH102" },
          Semester: { en: "Fall2024", vi: "HK1_2024" },
          Grade: { en: "B+", vi: "B+" }
        },
        {
          StudentID: { en: "S02", vi: "SV02" },
          CourseID: { en: "CS101", vi: "MH101" },
          Semester: { en: "Fall2024", vi: "HK1_2024" },
          Grade: { en: "A-", vi: "A-" }
        },
        {
          StudentID: { en: "S03", vi: "SV03" },
          CourseID: { en: "IS201", vi: "MH201" },
          Semester: { en: "Fall2024", vi: "HK1_2024" },
          Grade: { en: "B", vi: "B" }
        },
        {
          StudentID: { en: "S06", vi: "SV06" },
          CourseID: { en: "CS101", vi: "MH101" },
          Semester: { en: "Fall2024", vi: "HK1_2024" },
          Grade: { en: "A", vi: "A" }
        }
      ]
    },

    professors: {
      id: "professors",
      name: { en: "Professors", vi: "GiangVien" },
      description: {
        en: "Faculty members teaching in university departments",
        vi: "Danh sách giảng viên giảng dạy tại các khoa"
      },
      columns: [
        { key: "ProfID", label: { en: "ProfID", vi: "MaGV" }, type: "VARCHAR(10)" },
        { key: "ProfName", label: { en: "ProfName", vi: "TenGV" }, type: "VARCHAR(50)" },
        { key: "Department", label: { en: "Department", vi: "Khoa" }, type: "VARCHAR(20)" },
        { key: "Salary", label: { en: "Salary", vi: "Luong" }, type: "INT" }
      ],
      rows: [
        {
          ProfID: { en: "P01", vi: "GV01" },
          ProfName: { en: "Dr. Alan Turing", vi: "TS. Hoàng Tuấn Anh" },
          Department: { en: "CS", vi: "CNTT" },
          Salary: { en: "85000", vi: "35000000" }
        },
        {
          ProfID: { en: "P02", vi: "GV02" },
          ProfName: { en: "Dr. Grace Hopper", vi: "TS. Nguyễn Mai Phương" },
          Department: { en: "SE", vi: "KTPM" },
          Salary: { en: "92000", vi: "40000000" }
        },
        {
          ProfID: { en: "P03", vi: "GV03" },
          ProfName: { en: "Dr. Edgar Codd", vi: "TS. Trần Đình Khoa" },
          Department: { en: "IS", vi: "HTTT" },
          Salary: { en: "88000", vi: "38000000" }
        }
      ]
    },

    departments: {
      id: "departments",
      name: { en: "Departments", vi: "Khoa" },
      description: {
        en: "University academic faculties and building locations",
        vi: "Các khoa học thuật và vị trí tòa nhà"
      },
      columns: [
        { key: "DeptCode", label: { en: "DeptCode", vi: "MaKhoa" }, type: "VARCHAR(10)" },
        { key: "DeptName", label: { en: "DeptName", vi: "TenKhoa" }, type: "VARCHAR(50)" },
        { key: "Building", label: { en: "Building", vi: "ToaNha" }, type: "VARCHAR(20)" }
      ],
      rows: [
        {
          DeptCode: { en: "CS", vi: "CNTT" },
          DeptName: { en: "Computer Science", vi: "Công Nghệ Thông Tin" },
          Building: { en: "Building A", vi: "Tòa Nhà A" }
        },
        {
          DeptCode: { en: "IS", vi: "HTTT" },
          DeptName: { en: "Information Systems", vi: "Hệ Thống Thông Tin" },
          Building: { en: "Building B", vi: "Tòa Nhà B" }
        },
        {
          DeptCode: { en: "SE", vi: "KTPM" },
          DeptName: { en: "Software Engineering", vi: "Kỹ Thuật Phần Mềm" },
          Building: { en: "Building A", vi: "Tòa Nhà A" }
        }
      ]
    },

    classrooms: {
      id: "classrooms",
      name: { en: "Classrooms", vi: "PhongHoc" },
      description: {
        en: "Lecture halls and lab facilities",
        vi: "Danh sách phòng học và phòng thí nghiệm"
      },
      columns: [
        { key: "RoomID", label: { en: "RoomID", vi: "MaPhong" }, type: "VARCHAR(10)" },
        { key: "Capacity", label: { en: "Capacity", vi: "SucChua" }, type: "INT" },
        { key: "Building", label: { en: "Building", vi: "ToaNha" }, type: "VARCHAR(20)" }
      ],
      rows: [
        {
          RoomID: { en: "R101", vi: "P101" },
          Capacity: { en: "60", vi: "60" },
          Building: { en: "Building A", vi: "Tòa Nhà A" }
        },
        {
          RoomID: { en: "R202", vi: "P202" },
          Capacity: { en: "45", vi: "45" },
          Building: { en: "Building B", vi: "Tòa Nhà B" }
        },
        {
          RoomID: { en: "Lab01", vi: "Lab01" },
          Capacity: { en: "30", vi: "30" },
          Building: { en: "Building A", vi: "Tòa Nhà A" }
        }
      ]
    },

    clubs: {
      id: "clubs",
      name: { en: "Clubs", vi: "CauLacBo" },
      description: {
        en: "Campus extracurricular clubs",
        vi: "Các câu lạc bộ ngoại khóa"
      },
      columns: [
        { key: "ClubID", label: { en: "ClubID", vi: "MaCLB" }, type: "VARCHAR(10)" },
        { key: "ClubName", label: { en: "ClubName", vi: "TenCLB" }, type: "VARCHAR(50)" }
      ],
      rows: [
        {
          ClubID: { en: "C01", vi: "CLB01" },
          ClubName: { en: "Robotics Club", vi: "CLB Robot" }
        },
        {
          ClubID: { en: "C02", vi: "CLB02" },
          ClubName: { en: "AI Club", vi: "CLB Trí Tuệ Nhân Tạo" }
        }
      ]
    },

    semesters: {
      id: "semesters",
      name: { en: "Semesters", vi: "HocKy" },
      description: {
        en: "Academic terms in school year",
        vi: "Các kỳ học trong năm học"
      },
      columns: [
        { key: "SemesterID", label: { en: "SemesterID", vi: "MaHocKy" }, type: "VARCHAR(10)" },
        { key: "AcademicYear", label: { en: "AcademicYear", vi: "NamHoc" }, type: "VARCHAR(20)" }
      ],
      rows: [
        {
          SemesterID: { en: "Fall", vi: "HK1" },
          AcademicYear: { en: "2024-2025", vi: "2024-2025" }
        },
        {
          SemesterID: { en: "Spring", vi: "HK2" },
          AcademicYear: { en: "2024-2025", vi: "2024-2025" }
        }
      ]
    },

    // Union / Set Compatible Relations
    cs_honor: {
      id: "cs_honor",
      name: { en: "CS_HonorStudents", vi: "SV_XuatSac_CNTT" },
      description: {
        en: "Honor students from Computer Science",
        vi: "Danh sách sinh viên xuất sắc khoa CNTT"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" },
        { key: "GPA", label: { en: "GPA", vi: "DiemTB" }, type: "DECIMAL(3,2)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
          GPA: { en: "3.8", vi: "3.8" }
        },
        {
          StudentID: { en: "S03", vi: "SV03" },
          FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
          GPA: { en: "3.6", vi: "3.6" }
        }
      ]
    },

    dean_list: {
      id: "dean_list",
      name: { en: "DeanList", vi: "DanhSachKhenThuong" },
      description: {
        en: "University-wide dean honor list (Notice: S01 is in both, S04 is unique to this table)",
        vi: "Danh sách khen thưởng toàn trường (Lưu ý: SV01 có ở cả 2 bảng, SV04 chỉ có ở bảng này)"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" },
        { key: "GPA", label: { en: "GPA", vi: "DiemTB" }, type: "DECIMAL(3,2)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
          GPA: { en: "3.8", vi: "3.8" }
        },
        {
          StudentID: { en: "S04", vi: "SV04" },
          FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" },
          GPA: { en: "3.9", vi: "3.9" }
        }
      ]
    },

    probation_list: {
      id: "probation_list",
      name: { en: "ProbationList", vi: "DanhSachCanhBao" },
      description: {
        en: "Academic warning probation list",
        vi: "Danh sách sinh viên bị cảnh báo học tập"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" },
        { key: "GPA", label: { en: "GPA", vi: "DiemTB" }, type: "DECIMAL(3,2)" }
      ],
      rows: [
        {
          StudentID: { en: "S08", vi: "SV08" },
          FullName: { en: "David Kim", vi: "Đào Văn Nam" },
          GPA: { en: "1.8", vi: "1.8" }
        }
      ]
    },

    // Set Intersection Relations
    math_club: {
      id: "math_club",
      name: { en: "MathClub", vi: "CLB_Toan" },
      description: {
        en: "Active members of the Mathematics Club",
        vi: "Thành viên tích cực của Câu lạc bộ Toán"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" }
        },
        {
          StudentID: { en: "S02", vi: "SV02" },
          FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" }
        },
        {
          StudentID: { en: "S03", vi: "SV03" },
          FullName: { en: "Charlie Le", vi: "Lê Văn Cường" }
        }
      ]
    },

    robotics_club: {
      id: "robotics_club",
      name: { en: "RoboticsClub", vi: "CLB_Robot" },
      description: {
        en: "Active members of the Robotics Club",
        vi: "Thành viên tích cực của Câu lạc bộ Robot"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" }
      ],
      rows: [
        {
          StudentID: { en: "S02", vi: "SV02" },
          FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" }
        },
        {
          StudentID: { en: "S03", vi: "SV03" },
          FullName: { en: "Charlie Le", vi: "Lê Văn Cường" }
        },
        {
          StudentID: { en: "S05", vi: "SV05" },
          FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" }
        }
      ]
    },

    music_club: {
      id: "music_club",
      name: { en: "MusicClub", vi: "CLB_AmNhac" },
      description: {
        en: "Active members of the Music Club",
        vi: "Thành viên tích cực của Câu lạc bộ Âm nhạc"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "FullName", label: { en: "FullName", vi: "HoTen" }, type: "VARCHAR(50)" }
      ],
      rows: [
        {
          StudentID: { en: "S07", vi: "SV07" },
          FullName: { en: "Kelly Taylor", vi: "Hoàng Thảo My" }
        }
      ]
    },

    // Set Difference Relations
    enrolled_project: {
      id: "enrolled_project",
      name: { en: "EnrolledProject", vi: "DangKyDoAn" },
      description: {
        en: "All students registered for the capstone project",
        vi: "Tất cả sinh viên đăng ký môn đồ án tốt nghiệp"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "StudentName", label: { en: "StudentName", vi: "TenSV" }, type: "VARCHAR(50)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          StudentName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" }
        },
        {
          StudentID: { en: "S02", vi: "SV02" },
          StudentName: { en: "Bob Tran", vi: "Trần Quốc Bảo" }
        },
        {
          StudentID: { en: "S03", vi: "SV03" },
          StudentName: { en: "Charlie Le", vi: "Lê Văn Cường" }
        },
        {
          StudentID: { en: "S04", vi: "SV04" },
          StudentName: { en: "Diana Pham", vi: "Phạm Diệu Anh" }
        }
      ]
    },

    submitted_project: {
      id: "submitted_project",
      name: { en: "SubmittedProject", vi: "DaNopDoAn" },
      description: {
        en: "Students who have submitted the final project report",
        vi: "Danh sách sinh viên đã nộp báo cáo đồ án"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "StudentName", label: { en: "StudentName", vi: "TenSV" }, type: "VARCHAR(50)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          StudentName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" }
        },
        {
          StudentID: { en: "S04", vi: "SV04" },
          StudentName: { en: "Diana Pham", vi: "Phạm Diệu Anh" }
        }
      ]
    },

    graded_project: {
      id: "graded_project",
      name: { en: "GradedProject", vi: "DaChamDiem" },
      description: {
        en: "Students whose projects have been graded",
        vi: "Danh sách sinh viên đã có điểm đồ án"
      },
      columns: [
        { key: "StudentID", label: { en: "StudentID", vi: "MaSV" }, type: "VARCHAR(10)" },
        { key: "Score", label: { en: "Score", vi: "DiemSo" }, type: "DECIMAL(3,1)" }
      ],
      rows: [
        {
          StudentID: { en: "S01", vi: "SV01" },
          Score: { en: "9.5", vi: "9.5" }
        }
      ]
    },

    // Prerequisites table for Natural Join
    prerequisites: {
      id: "prerequisites",
      name: { en: "Prerequisites", vi: "DieuKienTienQuyet" },
      description: {
        en: "Required prerequisite courses for advanced subjects",
        vi: "Các môn học tiên quyết cần hoàn thành trước"
      },
      columns: [
        { key: "CourseID", label: { en: "CourseID", vi: "MaMH" }, type: "VARCHAR(10)" },
        { key: "PrereqCourseID", label: { en: "PrereqCourseID", vi: "MaMHTienQuyet" }, type: "VARCHAR(10)" },
        { key: "MinGrade", label: { en: "MinGrade", vi: "DiemToiThieu" }, type: "VARCHAR(2)" }
      ],
      rows: [
        {
          CourseID: { en: "CS102", vi: "MH102" },
          PrereqCourseID: { en: "CS101", vi: "MH101" },
          MinGrade: { en: "C", vi: "C" }
        },
        {
          CourseID: { en: "SE301", vi: "MH301" },
          PrereqCourseID: { en: "CS101", vi: "MH101" },
          MinGrade: { en: "B", vi: "B" }
        }
      ]
    }
  },

  // Topics definitions
  topics: [
    {
      id: "selection",
      name: { en: "Selection (σ)", vi: "Phép Chọn (σ)" },
      symbol: "\\sigma",
      unicode: "σ",
      shortDesc: {
        en: "Filter tuples that satisfy a given boolean condition (horizontal subsetting)",
        vi: "Lọc các bộ thỏa mãn điều kiện logic cho trước (tập con theo chiều ngang)"
      },
      cases: [
        {
          id: "sel-1",
          title: { en: "Case 1: Numeric Comparison (Age ≥ 21)", vi: "Trường hợp 1: So sánh số học (Tuổi ≥ 21)" },
          difficulty: "Easy",
          instruction: {
            en: "Select all student records from Students where Age is 21 or greater.",
            vi: "Chọn tất cả bản ghi sinh viên từ bảng SinhVien có Tuoi từ 21 trở lên."
          },
          relationalAlgebra: "\\sigma_{Age \\ge 21}(Students)",
          relationalAlgebraVi: "\\sigma_{Tuoi \\ge 21}(SinhVien)",
          sql: {
            en: "SELECT *\nFROM Students\nWHERE Age >= 21;",
            vi: "CHỌN *\nTỪ SinhVien\nVỚI ĐIỀU KIỆN Tuoi >= 21;"
          },
          theory: {
            concept: {
              en: "The Selection operator (σ) yields a horizontal subset of the relation. It selects only those tuples (rows) for which the predicate formula evaluates to TRUE.",
              vi: "Toán tử Chọn (σ) tạo ra một tập con theo chiều ngang của quan hệ. Nó chỉ giữ lại các bộ (hàng) thỏa mãn biểu thức điều kiện logic nhận giá trị TRUE."
            },
            formal: {
              en: "\\sigma_{p}(R) = \\{ t \\mid t \\in R \\land p(t) = \\text{TRUE} \\}",
              vi: "\\sigma_{p}(R) = \\{ t \\mid t \\in R \\land p(t) = \\text{TRUE} \\}"
            },
            sqlMapping: {
              en: "Maps directly to the SQL `WHERE` clause without altering the `SELECT` column list (`SELECT *`).",
              vi: "Tương ứng trực tiếp với mệnh đề `VỚI ĐIỀU KIỆN` (WHERE) trong SQL mà không làm thay đổi danh sách các cột (`CHỌN *`)."
            },
            tips: {
              en: "The degree (number of columns) of the result relation is identical to the degree of the input relation. The cardinality (number of rows) is ≤ |R|.",
              vi: "Bậc (số cột) của quan hệ kết quả bằng đúng bậc của quan hệ ban đầu. Lực lượng (số hàng) luôn nhỏ hơn hoặc bằng |R|."
            }
          },
          tablesShown: ["students", "courses", "professors"],
          requiredTables: ["students"],
          expectedResult: {
            columns: ["StudentID", "FullName", "Age", "GPA", "Department"],
            rows: [
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                Age: { en: "21", vi: "21" },
                GPA: { en: "3.8", vi: "3.8" },
                Department: { en: "CS", vi: "CNTT" }
              },
              {
                StudentID: { en: "S03", vi: "SV03" },
                FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
                Age: { en: "22", vi: "22" },
                GPA: { en: "2.9", vi: "2.9" },
                Department: { en: "CS", vi: "CNTT" }
              },
              {
                StudentID: { en: "S05", vi: "SV05" },
                FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" },
                Age: { en: "23", vi: "23" },
                GPA: { en: "3.1", vi: "3.1" },
                Department: { en: "IS", vi: "HTTT" }
              }
            ]
          }
        },

        {
          id: "sel-2",
          title: { en: "Case 2: Exact String Match (Department = 'CS')", vi: "Trường hợp 2: Khớp chuỗi chính xác (Khoa = 'CNTT')" },
          difficulty: "Easy",
          instruction: {
            en: "Select all students belonging to the Computer Science department ('CS').",
            vi: "Chọn tất cả sinh viên thuộc khoa Công nghệ Thông tin ('CNTT')."
          },
          relationalAlgebra: "\\sigma_{Department = 'CS'}(Students)",
          relationalAlgebraVi: "\\sigma_{Khoa = 'CNTT'}(SinhVien)",
          sql: {
            en: "SELECT *\nFROM Students\nWHERE Department = 'CS';",
            vi: "CHỌN *\nTỪ SinhVien\nVỚI ĐIỀU KIỆN Khoa = 'CNTT';"
          },
          theory: {
            concept: {
              en: "String comparison matches text literals exactly. In relational algebra, predicates can check equality (=) or inequality (≠) on categorical domain values.",
              vi: "Phép so sánh chuỗi kiểm tra sự trùng khớp chính xác của giá trị ký tự. Trong đại số quan hệ, vị từ có thể kiểm tra bằng (=) hoặc khác (≠) trên các miền giá trị."
            },
            formal: {
              en: "\\sigma_{\\text{Department} = 'CS'}(Students)",
              vi: "\\sigma_{\\text{Khoa} = 'CNTT'}(SinhVien)"
            },
            sqlMapping: {
              en: "Translates to `WHERE Department = 'CS'` in standard SQL.",
              vi: "Tương ứng với `VỚI ĐIỀU KIỆN Khoa = 'CNTT'` trong SQL tiếng Việt."
            },
            tips: {
              en: "Remember that string values are case-sensitive in formal relational algebra.",
              vi: "Ghi nhớ rằng các giá trị chuỗi có phân biệt chữ hoa chữ thường trong đại số quan hệ chuẩn."
            }
          },
          tablesShown: ["students", "departments", "classrooms"],
          requiredTables: ["students"],
          expectedResult: {
            columns: ["StudentID", "FullName", "Age", "GPA", "Department"],
            rows: [
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                Age: { en: "21", vi: "21" },
                GPA: { en: "3.8", vi: "3.8" },
                Department: { en: "CS", vi: "CNTT" }
              },
              {
                StudentID: { en: "S03", vi: "SV03" },
                FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
                Age: { en: "22", vi: "22" },
                GPA: { en: "2.9", vi: "2.9" },
                Department: { en: "CS", vi: "CNTT" }
              }
            ]
          }
        },

        {
          id: "sel-3",
          title: { en: "Case 3: Compound Condition (GPA ≥ 3.5 ∧ Age ≤ 20)", vi: "Trường hợp 3: Điều kiện phức hợp (ĐiểmTB ≥ 3.5 ∧ Tuổi ≤ 20)" },
          difficulty: "Medium",
          instruction: {
            en: "Select students who have a GPA of at least 3.5 AND an Age of 20 or younger.",
            vi: "Chọn các sinh viên có DiemTB từ 3.5 trở lên VÀ có Tuoi không quá 20."
          },
          relationalAlgebra: "\\sigma_{GPA \\ge 3.5 \\;\\land\\; Age \\le 20}(Students)",
          relationalAlgebraVi: "\\sigma_{DiemTB \\ge 3.5 \\;\\land\\; Tuoi \\le 20}(SinhVien)",
          sql: {
            en: "SELECT *\nFROM Students\nWHERE GPA >= 3.5 AND Age <= 20;",
            vi: "CHỌN *\nTỪ SinhVien\nVỚI ĐIỀU KIỆN DiemTB >= 3.5 VÀ Tuoi <= 20;"
          },
          theory: {
            concept: {
              en: "Selection predicates can combine atomic conditions using logical operators: Conjunction (∧, AND), Disjunction (∨, OR), and Negation (¬, NOT).",
              vi: "Điều kiện chọn có thể kết hợp nhiều mệnh đề đơn bằng các phép nối logic: Hội (∧, VÀ), Tuyển (∨, HOẶC), và Phủ định (¬, KHÔNG)."
            },
            formal: {
              en: "\\sigma_{c_1 \\land c_2}(R) \\equiv \\sigma_{c_1}(\\sigma_{c_2}(R))",
              vi: "\\sigma_{c_1 \\land c_2}(R) \\equiv \\sigma_{c_1}(\\sigma_{c_2}(R))"
            },
            sqlMapping: {
              en: "Conjunction ∧ maps to SQL `AND`. Disjunction ∨ maps to SQL `OR`.",
              vi: "Phép hội ∧ tương ứng với `VÀ` (AND). Phép tuyển ∨ tương ứng với `HOẶC` (OR)."
            },
            tips: {
              en: "Cascading selections property: \\sigma_{c_1 \\land c_2}(R) is commutative: we can apply condition 1 first or condition 2 first.",
              vi: "Tính chất thác chọn: \\sigma_{c_1 \\land c_2}(R) có tính giao hoán, có thể áp dụng điều kiện nào trước cũng cho cùng kết quả."
            }
          },
          tablesShown: ["students", "courses", "enrollments"],
          requiredTables: ["students"],
          expectedResult: {
            columns: ["StudentID", "FullName", "Age", "GPA", "Department"],
            rows: [
              {
                StudentID: { en: "S04", vi: "SV04" },
                FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" },
                Age: { en: "19", vi: "19" },
                GPA: { en: "3.9", vi: "3.9" },
                Department: { en: "SE", vi: "KTPM" }
              }
            ]
          }
        }
      ]
    },

    {
      id: "projection",
      name: { en: "Projection (π)", vi: "Phép Chiếu (π)" },
      symbol: "\\pi",
      unicode: "π",
      shortDesc: {
        en: "Extract specific columns and eliminate duplicate tuples (vertical subsetting)",
        vi: "Trích xuất các cột mong muốn và loại bỏ các bộ trùng lặp (tập con theo chiều dọc)"
      },
      cases: [
        {
          id: "proj-1",
          title: { en: "Case 1: Specific Column Projection (StudentID, FullName)", vi: "Trường hợp 1: Chiếu các cột cụ thể (MãSV, HọTên)" },
          difficulty: "Easy",
          instruction: {
            en: "Project only the StudentID and FullName attributes from the Students table.",
            vi: "Chiếu chỉ hai thuộc tính MaSV và HoTen từ bảng SinhVien."
          },
          relationalAlgebra: "\\pi_{StudentID, FullName}(Students)",
          relationalAlgebraVi: "\\pi_{MaSV, HoTen}(SinhVien)",
          sql: {
            en: "SELECT StudentID, FullName\nFROM Students;",
            vi: "CHỌN MaSV, HoTen\nTỪ SinhVien;"
          },
          theory: {
            concept: {
              en: "The Projection operator (π) reduces the vertical dimensionality of a relation, selecting only specified columns and dropping all others.",
              vi: "Toán tử Chiếu (π) giảm số chiều theo chiều dọc của quan hệ, chỉ giữ lại các cột được chỉ định và bỏ qua tất cả các cột khác."
            },
            formal: {
              en: "\\pi_{A_1, A_2, \\dots, A_k}(R)",
              vi: "\\pi_{A_1, A_2, \\dots, A_k}(R)"
            },
            sqlMapping: {
              en: "Maps to naming the columns in `SELECT column1, column2 FROM Table`.",
              vi: "Tương ứng với việc liệt kê tên cột sau `CHỌN cot1, cot2 TỪ Bang`."
            },
            tips: {
              en: "In mathematical relational algebra, relations are SETS, so duplicate tuples are automatically eliminated!",
              vi: "Trong đại số quan hệ thuần túy, quan hệ là một TẬP HỢP, do đó mọi hàng trùng lặp đều tự động bị loại bỏ!"
            }
          },
          tablesShown: ["students", "departments", "courses"],
          requiredTables: ["students"],
          expectedResult: {
            columns: ["StudentID", "FullName"],
            rows: [
              { StudentID: { en: "S01", vi: "SV01" }, FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" } },
              { StudentID: { en: "S02", vi: "SV02" }, FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" } },
              { StudentID: { en: "S03", vi: "SV03" }, FullName: { en: "Charlie Le", vi: "Lê Văn Cường" } },
              { StudentID: { en: "S04", vi: "SV04" }, FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" } },
              { StudentID: { en: "S05", vi: "SV05" }, FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" } }
            ]
          }
        },

        {
          id: "proj-2",
          title: { en: "Case 2: Duplicate Elimination (Department)", vi: "Trường hợp 2: Loại bỏ trùng lặp (Khoa)" },
          difficulty: "Medium",
          instruction: {
            en: "Project the Department column from Students. Notice: In relational algebra, duplicate rows MUST be eliminated!",
            vi: "Chiếu cột Khoa từ bảng SinhVien. Lưu ý: Trong đại số quan hệ, các hàng trùng lặp BẮT BUỘC phải bị loại bỏ!"
          },
          relationalAlgebra: "\\pi_{Department}(Students)",
          relationalAlgebraVi: "\\pi_{Khoa}(SinhVien)",
          sql: {
            en: "SELECT DISTINCT Department\nFROM Students;",
            vi: "CHỌN DUY_NHẤT Khoa\nTỪ SinhVien;"
          },
          theory: {
            concept: {
              en: "Because relations are sets by definition, projection automatically performs duplicate elimination. In SQL, you must specify `DISTINCT` to achieve set semantics.",
              vi: "Do quan hệ theo định nghĩa toán học là một tập hợp, phép chiếu luôn tự động khử trùng lặp. Trong SQL, ta phải dùng từ khóa `DUY_NHẤT` (DISTINCT) để đạt được điều này."
            },
            formal: {
              en: "|\\pi_X(R)| \\le |R|",
              vi: "|\\pi_X(R)| \\le |R|"
            },
            sqlMapping: {
              en: "Equivalent to `SELECT DISTINCT Department FROM Students;`",
              vi: "Tương đương với `CHỌN DUY_NHẤT Khoa TỪ SinhVien;`"
            },
            tips: {
              en: "There are 5 students across CS, IS, and SE. The projection produces only 3 distinct rows!",
              vi: "Có 5 sinh viên nhưng chỉ thuộc 3 khoa: CNTT, HTTT, KTPM. Phép chiếu chỉ cho ra đúng 3 hàng duy nhất!"
            }
          },
          tablesShown: ["students", "professors"],
          requiredTables: ["students"],
          expectedResult: {
            columns: ["Department"],
            rows: [
              { Department: { en: "CS", vi: "CNTT" } },
              { Department: { en: "IS", vi: "HTTT" } },
              { Department: { en: "SE", vi: "KTPM" } }
            ]
          }
        },

        {
          id: "proj-3",
          title: { en: "Case 3: Course ID and Credits (CourseID, Credits)", vi: "Trường hợp 3: Mã môn học và Số tín chỉ (MaMH, SoTinChi)" },
          difficulty: "Easy",
          instruction: {
            en: "Project CourseID and Credits from the Courses table.",
            vi: "Chiếu MaMH và SoTinChi từ bảng MonHoc."
          },
          relationalAlgebra: "\\pi_{CourseID, Credits}(Courses)",
          relationalAlgebraVi: "\\pi_{MaMH, SoTinChi}(MonHoc)",
          sql: {
            en: "SELECT CourseID, Credits\nFROM Courses;",
            vi: "CHỌN MaMH, SoTinChi\nTỪ MonHoc;"
          },
          theory: {
            concept: {
              en: "Projection retains candidate keys or composite keys to identify catalog items while hiding descriptions.",
              vi: "Phép chiếu giữ lại khóa chính hoặc các thuộc tính cần quan sát, ẩn đi các thông tin mô tả chi tiết không cần thiết."
            },
            formal: {
              en: "\\pi_{CourseID, Credits}(Courses)",
              vi: "\\pi_{MaMH, SoTinChi}(MonHoc)"
            },
            sqlMapping: {
              en: "SELECT CourseID, Credits FROM Courses;",
              vi: "CHỌN MaMH, SoTinChi TỪ MonHoc;"
            },
            tips: {
              en: "Since CourseID is the primary key, all rows remain distinct.",
              vi: "Vì MaMH là khóa chính nên mỗi hàng chiếu ra đều là duy nhất."
            }
          },
          tablesShown: ["courses", "classrooms", "departments"],
          requiredTables: ["courses"],
          expectedResult: {
            columns: ["CourseID", "Credits"],
            rows: [
              { CourseID: { en: "CS101", vi: "MH101" }, Credits: { en: "3", vi: "3" } },
              { CourseID: { en: "CS102", vi: "MH102" }, Credits: { en: "4", vi: "4" } },
              { CourseID: { en: "IS201", vi: "MH201" }, Credits: { en: "3", vi: "3" } },
              { CourseID: { en: "SE301", vi: "MH301" }, Credits: { en: "3", vi: "3" } }
            ]
          }
        }
      ]
    },

    {
      id: "cartesian",
      name: { en: "Cartesian Product (×)", vi: "Tích Decartes (×)" },
      symbol: "\\times",
      unicode: "×",
      shortDesc: {
        en: "Pair every tuple of relation R with every tuple of relation S (Cross Product)",
        vi: "Kết hợp từng bộ của quan hệ R với mọi bộ của quan hệ S (Tích chéo)"
      },
      cases: [
        {
          id: "cart-1",
          title: { en: "Case 1: Small Table Cross Product (Semesters × Clubs)", vi: "Trường hợp 1: Tích chéo hai bảng nhỏ (HọcKỳ × CâuLạcBộ)" },
          difficulty: "Medium",
          instruction: {
            en: "Compute the Cartesian product of Semesters (2 rows) and Clubs (2 rows). The result should have 2 × 2 = 4 tuples.",
            vi: "Tính tích Descartes giữa bảng HocKy (2 hàng) và CauLacBo (2 hàng). Kết quả sẽ có 2 × 2 = 4 hàng."
          },
          relationalAlgebra: "Semesters \\times Clubs",
          relationalAlgebraVi: "HocKy \\times CauLacBo",
          sql: {
            en: "SELECT *\nFROM Semesters\nCROSS JOIN Clubs;",
            vi: "CHỌN *\nTỪ HocKy\nKẾT NỐI CHÉO CauLacBo;"
          },
          theory: {
            concept: {
              en: "The Cartesian Product (R × S) concatenates every tuple in R with every tuple in S. Degree = deg(R) + deg(S). Cardinality = |R| × |S|.",
              vi: "Tích Descartes (R × S) ghép nối mỗi bộ trong R với tất cả các bộ trong S. Bậc = bậc(R) + bậc(S). Lực lượng = |R| × |S|."
            },
            formal: {
              en: "R \\times S = \\{ (r, s) \\mid r \\in R \\land s \\in S \\}",
              vi: "R \\times S = \\{ (r, s) \\mid r \\in R \\land s \\in S \\}"
            },
            sqlMapping: {
              en: "In SQL: `FROM R CROSS JOIN S` or `FROM R, S` without a `WHERE` condition.",
              vi: "Trong SQL: `TỪ R KẾT NỐI CHÉO S` hoặc `TỪ R, S` không có điều kiện lọc."
            },
            tips: {
              en: "Order of tuples in the result does not affect set equality.",
              vi: "Thứ tự các bộ trong tập hợp kết quả không ảnh hưởng đến tính đúng đắn của đáp án."
            }
          },
          tablesShown: ["semesters", "clubs", "departments"],
          requiredTables: ["semesters", "clubs"],
          expectedResult: {
            columns: ["SemesterID", "AcademicYear", "ClubID", "ClubName"],
            rows: [
              {
                SemesterID: { en: "Fall", vi: "HK1" },
                AcademicYear: { en: "2024-2025", vi: "2024-2025" },
                ClubID: { en: "C01", vi: "CLB01" },
                ClubName: { en: "Robotics Club", vi: "CLB Robot" }
              },
              {
                SemesterID: { en: "Fall", vi: "HK1" },
                AcademicYear: { en: "2024-2025", vi: "2024-2025" },
                ClubID: { en: "C02", vi: "CLB02" },
                ClubName: { en: "AI Club", vi: "CLB Trí Tuệ Nhân Tạo" }
              },
              {
                SemesterID: { en: "Spring", vi: "HK2" },
                AcademicYear: { en: "2024-2025", vi: "2024-2025" },
                ClubID: { en: "C01", vi: "CLB01" },
                ClubName: { en: "Robotics Club", vi: "CLB Robot" }
              },
              {
                SemesterID: { en: "Spring", vi: "HK2" },
                AcademicYear: { en: "2024-2025", vi: "2024-2025" },
                ClubID: { en: "C02", vi: "CLB02" },
                ClubName: { en: "AI Club", vi: "CLB Trí Tuệ Nhân Tạo" }
              }
            ]
          }
        },

        {
          id: "cart-2",
          title: { en: "Case 2: Projected Product (π_ClubName(Clubs) × π_RoomID(Classrooms))", vi: "Trường hợp 2: Tích của các phép chiếu (CLB × PhòngHọc)" },
          difficulty: "Hard",
          instruction: {
            en: "Compute the Cartesian product of ClubName (from Clubs, 2 rows) and RoomID (from Classrooms, 3 rows) to generate possible room bookings (2 × 3 = 6 rows).",
            vi: "Tính tích Descartes giữa tên câu lạc bộ (TenCLB từ CauLacBo, 2 hàng) và phòng học (MaPhong từ PhongHoc, 3 hàng) để xếp lịch phòng (2 × 3 = 6 hàng)."
          },
          relationalAlgebra: "\\pi_{ClubName}(Clubs) \\times \\pi_{RoomID}(Classrooms)",
          relationalAlgebraVi: "\\pi_{TenCLB}(CauLacBo) \\times \\pi_{MaPhong}(PhongHoc)",
          sql: {
            en: "SELECT c.ClubName, r.RoomID\nFROM Clubs c\nCROSS JOIN Classrooms r;",
            vi: "CHỌN c.TenCLB, r.MaPhong\nTỪ CauLacBo c\nKẾT NỐI CHÉO PhongHoc r;"
          },
          theory: {
            concept: {
              en: "Cartesian product combines relations after projection to model all combinations of two independent dimensions.",
              vi: "Tích Descartes kết hợp các quan hệ sau khi chiếu để mô hình hóa mọi tổ hợp khả dĩ giữa hai chiều độc lập."
            },
            formal: {
              en: "|\\pi_A(R) \\times \\pi_B(S)| = |\\pi_A(R)| \\times |\\pi_B(S)|",
              vi: "|\\pi_A(R) \\times \\pi_B(S)| = |\\pi_A(R)| \\times |\\pi_B(S)|"
            },
            sqlMapping: {
              en: "SELECT ClubName, RoomID FROM Clubs CROSS JOIN Classrooms;",
              vi: "CHỌN TenCLB, MaPhong TỪ CauLacBo KẾT NỐI CHÉO PhongHoc;"
            },
            tips: {
              en: "Clubs has 2 distinct names, Classrooms has 3 distinct RoomIDs. Total rows = 6.",
              vi: "CauLacBo có 2 tên CLB, PhongHoc có 3 mã phòng. Tổng số hàng tạo ra là 6 hàng."
            }
          },
          tablesShown: ["clubs", "classrooms", "semesters"],
          requiredTables: ["clubs", "classrooms"],
          expectedResult: {
            columns: ["ClubName", "RoomID"],
            rows: [
              { ClubName: { en: "Robotics Club", vi: "CLB Robot" }, RoomID: { en: "R101", vi: "P101" } },
              { ClubName: { en: "Robotics Club", vi: "CLB Robot" }, RoomID: { en: "R202", vi: "P202" } },
              { ClubName: { en: "Robotics Club", vi: "CLB Robot" }, RoomID: { en: "Lab01", vi: "Lab01" } },
              { ClubName: { en: "AI Club", vi: "CLB Trí Tuệ Nhân Tạo" }, RoomID: { en: "R101", vi: "P101" } },
              { ClubName: { en: "AI Club", vi: "CLB Trí Tuệ Nhân Tạo" }, RoomID: { en: "R202", vi: "P202" } },
              { ClubName: { en: "AI Club", vi: "CLB Trí Tuệ Nhân Tạo" }, RoomID: { en: "Lab01", vi: "Lab01" } }
            ]
          }
        }
      ]
    },

    {
      id: "union",
      name: { en: "Set Union (∪)", vi: "Hợp Tập Hợp (∪)" },
      symbol: "\\cup",
      unicode: "∪",
      shortDesc: {
        en: "Combine tuples from two union-compatible relations, removing duplicates",
        vi: "Kết hợp các bộ từ hai quan hệ khả hợp, loại bỏ các phần tử trùng lặp"
      },
      cases: [
        {
          id: "union-1",
          title: { en: "Case 1: Honor Students Union (CS_Honor ∪ DeanList)", vi: "Trường hợp 1: Hợp danh sách khen thưởng (SV_XuatSac ∪ DanhSachKhenThuong)" },
          difficulty: "Medium",
          instruction: {
            en: "Find all students who are in CS_Honor OR DeanList. Note: Student S01/SV01 is in both tables, so they must only appear ONCE in the union!",
            vi: "Tìm tất cả sinh viên thuộc danh sách SV_XuatSac_CNTT HOẶC DanhSachKhenThuong. Lưu ý: Sinh viên SV01 có tên ở cả hai bảng, nên chỉ xuất hiện 1 LẦN trong kết quả hợp!"
          },
          relationalAlgebra: "CS\\_Honor \\cup DeanList",
          relationalAlgebraVi: "SV\\_XuatSac\\_CNTT \\cup DanhSachKhenThuong",
          sql: {
            en: "SELECT StudentID, FullName, GPA\nFROM CS_Honor\nUNION\nSELECT StudentID, FullName, GPA\nFROM DeanList;",
            vi: "CHỌN MaSV, HoTen, DiemTB\nTỪ SV_XuatSac_CNTT\nHỢP\nCHỌN MaSV, HoTen, DiemTB\nTỪ DanhSachKhenThuong;"
          },
          theory: {
            concept: {
              en: "Two relations R and S are union-compatible if they have the same arity (number of attributes) and corresponding attributes have compatible data domains.",
              vi: "Hai quan hệ R và S được gọi là khả hợp (union-compatible) nếu chúng có cùng bậc (số lượng thuộc tính) và các miền giá trị tương ứng tương thích nhau."
            },
            formal: {
              en: "R \\cup S = \\{ t \\mid t \\in R \\lor t \\in S \\}",
              vi: "R \\cup S = \\{ t \\mid t \\in R \\lor t \\in S \\}"
            },
            sqlMapping: {
              en: "SQL `UNION` automatically eliminates duplicates (unlike `UNION ALL` which preserves duplicates).",
              vi: "Từ khóa `HỢP` (UNION) trong SQL tự động loại trừ trùng lặp (khác với `HỢP TẤT CẢ` - UNION ALL giữ lại trùng lặp)."
            },
            tips: {
              en: "S01 is in both tables. S03 is only in CS_Honor. S04 is only in DeanList. Result has 3 unique tuples.",
              vi: "SV01 có ở cả 2 bảng. SV03 chỉ có ở SV_XuatSac. SV04 chỉ có ở DanhSachKhenThuong. Kết quả gồm 3 bộ phân biệt."
            }
          },
          tablesShown: ["cs_honor", "dean_list", "probation_list"],
          requiredTables: ["cs_honor", "dean_list"],
          expectedResult: {
            columns: ["StudentID", "FullName", "GPA"],
            rows: [
              { StudentID: { en: "S01", vi: "SV01" }, FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" }, GPA: { en: "3.8", vi: "3.8" } },
              { StudentID: { en: "S03", vi: "SV03" }, FullName: { en: "Charlie Le", vi: "Lê Văn Cường" }, GPA: { en: "3.6", vi: "3.6" } },
              { StudentID: { en: "S04", vi: "SV04" }, FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" }, GPA: { en: "3.9", vi: "3.9" } }
            ]
          }
        },

        {
          id: "union-2",
          title: { en: "Case 2: Projected Union (π_FullName(MathClub) ∪ π_FullName(RoboticsClub))", vi: "Trường hợp 2: Hợp các phép chiếu (HọTên CLB Toán ∪ CLB Robot)" },
          difficulty: "Medium",
          instruction: {
            en: "Get the set of all unique student names who are members of either the MathClub or the RoboticsClub.",
            vi: "Lấy tập hợp tất cả họ tên sinh viên là thành viên của CLB_Toan hoặc CLB_Robot."
          },
          relationalAlgebra: "\\pi_{FullName}(MathClub) \\cup \\pi_{FullName}(RoboticsClub)",
          relationalAlgebraVi: "\\pi_{HoTen}(CLB\\_Toan) \\cup \\pi_{HoTen}(CLB\\_Robot)",
          sql: {
            en: "SELECT FullName FROM MathClub\nUNION\nSELECT FullName FROM RoboticsClub;",
            vi: "CHỌN HoTen TỪ CLB_Toan\nHỢP\nCHỌN HoTen TỪ CLB_Robot;"
          },
          theory: {
            concept: {
              en: "When original relations have different schemas, projecting compatible attributes makes them union-compatible.",
              vi: "Khi các quan hệ gốc có cấu trúc khác nhau, việc chiếu các thuộc tính tương thích sẽ giúp chúng trở nên khả hợp."
            },
            formal: {
              en: "\\pi_{FullName}(MathClub) \\cup \\pi_{FullName}(RoboticsClub)",
              vi: "\\pi_{HoTen}(CLB\\_Toan) \\cup \\pi_{HoTen}(CLB\\_Robot)"
            },
            sqlMapping: {
              en: "SELECT FullName FROM MathClub UNION SELECT FullName FROM RoboticsClub;",
              vi: "CHỌN HoTen TỪ CLB_Toan HỢP CHỌN HoTen TỪ CLB_Robot;"
            },
            tips: {
              en: "Bob (S02) and Charlie (S03) belong to both clubs. They must each appear only once!",
              vi: "Bảo (SV02) và Cường (SV03) tham gia cả hai CLB, họ chỉ được xuất hiện một lần trong kết quả!"
            }
          },
          tablesShown: ["math_club", "robotics_club", "music_club"],
          requiredTables: ["math_club", "robotics_club"],
          expectedResult: {
            columns: ["FullName"],
            rows: [
              { FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" } },
              { FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" } },
              { FullName: { en: "Charlie Le", vi: "Lê Văn Cường" } },
              { FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" } }
            ]
          }
        }
      ]
    },

    {
      id: "intersection",
      name: { en: "Set Intersection (∩)", vi: "Giao Tập Hợp (∩)" },
      symbol: "\\cap",
      unicode: "∩",
      shortDesc: {
        en: "Return tuples that appear in BOTH relations simultaneously",
        vi: "Trả về các bộ xuất hiện đồng thời ở CẢ HAI quan hệ"
      },
      cases: [
        {
          id: "inter-1",
          title: { en: "Case 1: Dual Club Members (MathClub ∩ RoboticsClub)", vi: "Trường hợp 1: Thành viên hai CLB (CLB_Toan ∩ CLB_Robot)" },
          difficulty: "Easy",
          instruction: {
            en: "Find all students who belong to BOTH MathClub and RoboticsClub.",
            vi: "Tìm tất cả sinh viên tham gia CẢ HAI câu lạc bộ: CLB_Toan và CLB_Robot."
          },
          relationalAlgebra: "MathClub \\cap RoboticsClub",
          relationalAlgebraVi: "CLB\\_Toan \\cap CLB\\_Robot",
          sql: {
            en: "SELECT StudentID, FullName\nFROM MathClub\nINTERSECT\nSELECT StudentID, FullName\nFROM RoboticsClub;",
            vi: "CHỌN MaSV, HoTen\nTỪ CLB_Toan\nGIAO\nCHỌN MaSV, HoTen\nTỪ CLB_Robot;"
          },
          theory: {
            concept: {
              en: "Intersection returns tuples belonging to both input relations. R and S must be union-compatible.",
              vi: "Phép giao trả về các bộ thuộc về cả hai quan hệ đầu vào. R và S bắt buộc phải khả hợp."
            },
            formal: {
              en: "R \\cap S = \\{ t \\mid t \\in R \\land t \\in S \\} = R - (R - S)",
              vi: "R \\cap S = \\{ t \\mid t \\in R \\land t \\in S \\} = R - (R - S)"
            },
            sqlMapping: {
              en: "Maps to the SQL `INTERSECT` operator.",
              vi: "Tương ứng với toán tử `GIAO` (INTERSECT) trong SQL."
            },
            tips: {
              en: "Look for StudentIDs that appear in both tables: S02 (Bob) and S03 (Charlie).",
              vi: "Tìm các MaSV xuất hiện ở cả hai bảng: SV02 (Bảo) và SV03 (Cường)."
            }
          },
          tablesShown: ["math_club", "robotics_club", "music_club"],
          requiredTables: ["math_club", "robotics_club"],
          expectedResult: {
            columns: ["StudentID", "FullName"],
            rows: [
              { StudentID: { en: "S02", vi: "SV02" }, FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" } },
              { StudentID: { en: "S03", vi: "SV03" }, FullName: { en: "Charlie Le", vi: "Lê Văn Cường" } }
            ]
          }
        },

        {
          id: "inter-2",
          title: { en: "Case 2: Dual Honor Students (CS_Honor ∩ DeanList)", vi: "Trường hợp 2: Sinh viên đạt hai danh hiệu (SV_XuatSac ∩ DanhSachKhenThuong)" },
          difficulty: "Medium",
          instruction: {
            en: "Find all students who made both the CS_Honor list AND the DeanList.",
            vi: "Tìm tất cả sinh viên vừa đạt danh hiệu SV_XuatSac_CNTT VÀ có tên trong DanhSachKhenThuong."
          },
          relationalAlgebra: "CS\\_Honor \\cap DeanList",
          relationalAlgebraVi: "SV\\_XuatSac\\_CNTT \\cap DanhSachKhenThuong",
          sql: {
            en: "SELECT StudentID, FullName, GPA\nFROM CS_Honor\nINTERSECT\nSELECT StudentID, FullName, GPA\nFROM DeanList;",
            vi: "CHỌN MaSV, HoTen, DiemTB\nTỪ SV_XuatSac_CNTT\nGIAO\nCHỌN MaSV, HoTen, DiemTB\nTỪ DanhSachKhenThuong;"
          },
          theory: {
            concept: {
              en: "Tuples must match on all corresponding attribute values to be part of the intersection.",
              vi: "Các bộ phải trùng khớp trên mọi giá trị thuộc tính tương ứng để được tính vào kết quả giao."
            },
            formal: {
              en: "R \\cap S \\subseteq R \\quad \\text{and} \\quad R \\cap S \\subseteq S",
              vi: "R \\cap S \\subseteq R \\quad \\text{và} \\quad R \\cap S \\subseteq S"
            },
            sqlMapping: {
              en: "SELECT ... FROM R INTERSECT SELECT ... FROM S",
              vi: "CHỌN ... TỪ R GIAO CHỌN ... TỪ S"
            },
            tips: {
              en: "Only S01 (Alice Nguyen, GPA 3.8) satisfies both criteria.",
              vi: "Chỉ duy nhất SV01 (Nguyễn Thùy Linh, ĐiểmTB 3.8) có mặt ở cả hai danh sách."
            }
          },
          tablesShown: ["cs_honor", "dean_list", "probation_list"],
          requiredTables: ["cs_honor", "dean_list"],
          expectedResult: {
            columns: ["StudentID", "FullName", "GPA"],
            rows: [
              { StudentID: { en: "S01", vi: "SV01" }, FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" }, GPA: { en: "3.8", vi: "3.8" } }
            ]
          }
        }
      ]
    },

    {
      id: "difference",
      name: { en: "Set Difference ( - )", vi: "Hiệu Tập Hợp ( - )" },
      symbol: "-",
      unicode: "−",
      shortDesc: {
        en: "Return tuples in relation R that are NOT in relation S (Relative Complement / Minus)",
        vi: "Trả về các bộ thuộc quan hệ R nhưng KHÔNG thuộc quan hệ S (Phần bù tương đối)"
      },
      cases: [
        {
          id: "diff-1",
          title: { en: "Case 1: Missing Project Submission (EnrolledProject - SubmittedProject)", vi: "Trường hợp 1: Chưa nộp đồ án (DangKyDoAn - DaNopDoAn)" },
          difficulty: "Easy",
          instruction: {
            en: "Find all students who enrolled in the project but have NOT submitted their report yet.",
            vi: "Tìm tất cả sinh viên đã đăng ký đồ án nhưng CHƯA nộp báo cáo."
          },
          relationalAlgebra: "EnrolledProject - SubmittedProject",
          relationalAlgebraVi: "DangKyDoAn - DaNopDoAn",
          sql: {
            en: "SELECT StudentID, StudentName\nFROM EnrolledProject\nEXCEPT\nSELECT StudentID, StudentName\nFROM SubmittedProject;",
            vi: "CHỌN MaSV, TenSV\nTỪ DangKyDoAn\nTRỪ\nCHỌN MaSV, TenSV\nTỪ DaNopDoAn;"
          },
          theory: {
            concept: {
              en: "Set Difference (R - S) selects all tuples in R that do not appear in S. Note: Difference is NOT commutative! (R - S ≠ S - R).",
              vi: "Phép trừ (R - S) lấy tất cả các bộ có trong R nhưng không xuất hiện trong S. Lưu ý: Phép trừ KHÔNG có tính giao hoán! (R - S ≠ S - R)."
            },
            formal: {
              en: "R - S = \\{ t \\mid t \\in R \\land t \\notin S \\}",
              vi: "R - S = \\{ t \\mid t \\in R \\land t \\notin S \\}"
            },
            sqlMapping: {
              en: "Maps to the SQL `EXCEPT` (or `MINUS` in Oracle) operator.",
              vi: "Tương ứng với toán tử `TRỪ` (EXCEPT hoặc MINUS) trong SQL."
            },
            tips: {
              en: "Enrolled has S01, S02, S03, S04. Submitted has S01, S04. Remaining: S02 and S03.",
              vi: "DangKy có SV01, SV02, SV03, SV04. DaNop có SV01, SV04. Sinh viên còn lại chưa nộp là SV02 và SV03."
            }
          },
          tablesShown: ["enrolled_project", "submitted_project", "graded_project"],
          requiredTables: ["enrolled_project", "submitted_project"],
          expectedResult: {
            columns: ["StudentID", "StudentName"],
            rows: [
              { StudentID: { en: "S02", vi: "SV02" }, StudentName: { en: "Bob Tran", vi: "Trần Quốc Bảo" } },
              { StudentID: { en: "S03", vi: "SV03" }, StudentName: { en: "Charlie Le", vi: "Lê Văn Cường" } }
            ]
          }
        },

        {
          id: "diff-2",
          title: { en: "Case 2: Math Club Non-Robotics Members (MathClub - RoboticsClub)", vi: "Trường hợp 2: Thành viên CLB Toán không tham gia Robot (CLB_Toan - CLB_Robot)" },
          difficulty: "Medium",
          instruction: {
            en: "Find members of the MathClub who do NOT participate in the RoboticsClub.",
            vi: "Tìm các thành viên của CLB_Toan nhưng KHÔNG tham gia CLB_Robot."
          },
          relationalAlgebra: "MathClub - RoboticsClub",
          relationalAlgebraVi: "CLB\\_Toan - CLB\\_Robot",
          sql: {
            en: "SELECT StudentID, FullName\nFROM MathClub\nEXCEPT\nSELECT StudentID, FullName\nFROM RoboticsClub;",
            vi: "CHỌN MaSV, HoTen\nTỪ CLB_Toan\nTRỪ\nCHỌN MaSV, HoTen\nTỪ CLB_Robot;"
          },
          theory: {
            concept: {
              en: "Filters out common members, retaining only members exclusive to the first set.",
              vi: "Lọc bỏ những thành viên chung giữa hai tập hợp, chỉ giữ lại những thành viên độc quyền của tập hợp đứng trước."
            },
            formal: {
              en: "t \\in (MathClub - RoboticsClub) \\iff t \\in MathClub \\land t \\notin RoboticsClub",
              vi: "t \\in (CLB\\_Toan - CLB\\_Robot) \\iff t \\in CLB\\_Toan \\land t \\notin CLB\\_Robot"
            },
            sqlMapping: {
              en: "SELECT ... FROM MathClub EXCEPT SELECT ... FROM RoboticsClub;",
              vi: "CHỌN ... TỪ CLB_Toan TRỪ CHỌN ... TỪ CLB_Robot;"
            },
            tips: {
              en: "MathClub has S01, S02, S03. Robotics has S02, S03, S05. Only S01 is unique to MathClub.",
              vi: "CLB_Toan có SV01, SV02, SV03. CLB_Robot có SV02, SV03, SV05. Chỉ duy nhất SV01 là thuộc riêng CLB_Toan."
            }
          },
          tablesShown: ["math_club", "robotics_club", "music_club"],
          requiredTables: ["math_club", "robotics_club"],
          expectedResult: {
            columns: ["StudentID", "FullName"],
            rows: [
              { StudentID: { en: "S01", vi: "SV01" }, FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" } }
            ]
          }
        }
      ]
    },

    {
      id: "rename",
      name: { en: "Rename (ρ)", vi: "Phép Đổi Tên (ρ)" },
      symbol: "\\rho",
      unicode: "ρ",
      shortDesc: {
        en: "Rename relation names and attribute labels to resolve ambiguities or prepare for joins",
        vi: "Đổi tên quan hệ và tên thuộc tính nhằm tránh nhập nhằng hoặc chuẩn bị cho phép kết nối"
      },
      cases: [
        {
          id: "ren-1",
          title: { en: "Case 1: Rename Relation and Attributes (ρ_S(ID, Name))", vi: "Trường hợp 1: Đổi tên quan hệ và thuộc tính (ρ_SV(Ma, Ten))" },
          difficulty: "Easy",
          instruction: {
            en: "Project StudentID and FullName from Students, then rename the relation to 'S' with attributes 'ID' and 'Name'.",
            vi: "Chiếu MaSV và HoTen từ bảng SinhVien, sau đó đổi tên quan hệ thành 'SV' với các cột 'Ma' và 'Ten'."
          },
          relationalAlgebra: "\\rho_{S(ID, Name)}(\\pi_{StudentID, FullName}(Students))",
          relationalAlgebraVi: "\\rho_{SV(Ma, Ten)}(\\pi_{MaSV, HoTen}(SinhVien))",
          sql: {
            en: "SELECT StudentID AS ID, FullName AS Name\nFROM Students;",
            vi: "CHỌN MaSV LÀ Ma, HoTen LÀ Ten\nTỪ SinhVien;"
          },
          theory: {
            concept: {
              en: "The Rename operator (ρ) renames the result of a relational algebra expression, either giving a new name to the relation, to individual attributes, or both.",
              vi: "Toán tử Đổi tên (ρ) đổi tên kết quả của một biểu thức đại số quan hệ, có thể đặt tên mới cho bảng, cho từng thuộc tính hoặc cả hai."
            },
            formal: {
              en: "\\rho_{S(B_1, B_2, \\dots, B_n)}(R)",
              vi: "\\rho_{S(B_1, B_2, \\dots, B_n)}(R)"
            },
            sqlMapping: {
              en: "Maps to the SQL `AS` alias keyword on columns and table names.",
              vi: "Tương ứng với từ khóa định danh `LÀ` (AS) cho cột và bảng trong SQL."
            },
            tips: {
              en: "The column headers in your result table must be 'ID' and 'Name' (in English) or 'Ma' and 'Ten' (in Vietnamese).",
              vi: "Tên tiêu đề cột trong bảng kết quả phải là 'Ma' và 'Ten' (tiếng Việt) hoặc 'ID' và 'Name' (tiếng Anh)."
            }
          },
          tablesShown: ["students", "departments", "courses"],
          requiredTables: ["students"],
          expectedResult: {
            columns: ["ID", "Name"],
            rows: [
              { ID: { en: "S01", vi: "SV01" }, Name: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" } },
              { ID: { en: "S02", vi: "SV02" }, Name: { en: "Bob Tran", vi: "Trần Quốc Bảo" } },
              { ID: { en: "S03", vi: "SV03" }, Name: { en: "Charlie Le", vi: "Lê Văn Cường" } },
              { ID: { en: "S04", vi: "SV04" }, Name: { en: "Diana Pham", vi: "Phạm Diệu Anh" } },
              { ID: { en: "S05", vi: "SV05" }, Name: { en: "Evan Vu", vi: "Vũ Minh Đức" } }
            ]
          }
        },

        {
          id: "ren-2",
          title: { en: "Case 2: Renaming Attributes for Course Summary (ρ_Subject(Code, Title))", vi: "Trường hợp 2: Đổi tên cột môn học (ρ_HocPhan(MaHP, TenHP))" },
          difficulty: "Easy",
          instruction: {
            en: "Project CourseID and CourseName from Courses and rename the attributes to Code and Title.",
            vi: "Chiếu MaMH và TenMonHoc từ bảng MonHoc và đổi tên hai cột này thành MaHP và TenHP."
          },
          relationalAlgebra: "\\rho_{Subject(Code, Title)}(\\pi_{CourseID, CourseName}(Courses))",
          relationalAlgebraVi: "\\rho_{HocPhan(MaHP, TenHP)}(\\pi_{MaMH, TenMonHoc}(MonHoc))",
          sql: {
            en: "SELECT CourseID AS Code, CourseName AS Title\nFROM Courses;",
            vi: "CHỌN MaMH LÀ MaHP, TenMonHoc LÀ TenHP\nTỪ MonHoc;"
          },
          theory: {
            concept: {
              en: "Renaming attributes is crucial before Cartesian product or self-joins to disambiguate identical column names.",
              vi: "Việc đổi tên thuộc tính rất quan trọng trước khi thực hiện tích Descartes hoặc tự kết nối (self-join) để phân biệt các cột trùng tên."
            },
            formal: {
              en: "\\rho_{R(A \\rightarrow B)}(E)",
              vi: "\\rho_{R(A \\rightarrow B)}(E)"
            },
            sqlMapping: {
              en: "SELECT CourseID AS Code, CourseName AS Title FROM Courses;",
              vi: "CHỌN MaMH LÀ MaHP, TenMonHoc LÀ TenHP TỪ MonHoc;"
            },
            tips: {
              en: "Result table columns must match Code and Title.",
              vi: "Các cột của bảng kết quả phải khớp với MaHP và TenHP."
            }
          },
          tablesShown: ["courses", "classrooms"],
          requiredTables: ["courses"],
          expectedResult: {
            columns: ["Code", "Title"],
            rows: [
              { Code: { en: "CS101", vi: "MH101" }, Title: { en: "Database Systems", vi: "Cơ Sở Dữ Liệu" } },
              { Code: { en: "CS102", vi: "MH102" }, Title: { en: "Computer Networks", vi: "Mạng Máy Tính" } },
              { Code: { en: "IS201", vi: "MH201" }, Title: { en: "Enterprise Systems", vi: "Hệ Thống Doanh Nghiệp" } },
              { Code: { en: "SE301", vi: "MH301" }, Title: { en: "Software Architecture", vi: "Kiến Trúc Phần Mềm" } }
            ]
          }
        }
      ]
    },

    {
      id: "join",
      name: { en: "Join Operations (⋈)", vi: "Các Phép Kết Nối (⋈)" },
      symbol: "\\bowtie",
      unicode: "⋈",
      shortDesc: {
        en: "Combine related tuples from two tables based on matching conditions (Inner, Outer, and Natural Joins)",
        vi: "Kết hợp các bộ có quan hệ từ hai bảng dựa trên điều kiện ghép (Kết trong, Kết ngoài, và Kết tự nhiên)"
      },
      cases: [
        {
          id: "join-inner",
          title: { en: "Case 1: Inner Theta Join (Students ⋈ Enrollments)", vi: "Trường hợp 1: Kết nối trong (SinhVien ⋈ DangKy)" },
          difficulty: "Medium",
          joinType: "Inner Join",
          instruction: {
            en: "Perform an INNER JOIN between Students and Enrollments on StudentID. Keep StudentID, FullName, CourseID, and Grade. (Only matching students appear; S04, S05 have no enrollment and S06 is not in Students).",
            vi: "Thực hiện KẾT NỐI TRONG giữa SinhVien và DangKy theo MaSV. Giữ lại các cột MaSV, HoTen, MaMH, và DiemChu. (Chỉ lấy các bộ có mặt ở cả 2 bảng; SV04, SV05 chưa đăng ký và SV06 không có trong SinhVien)."
          },
          relationalAlgebra: "\\pi_{StudentID, FullName, CourseID, Grade}(Students \\bowtie_{Students.StudentID = Enrollments.StudentID} Enrollments)",
          relationalAlgebraVi: "\\pi_{MaSV, HoTen, MaMH, DiemChu}(SinhVien \\bowtie_{SinhVien.MaSV = DangKy.MaSV} DangKy)",
          sql: {
            en: "SELECT s.StudentID, s.FullName, e.CourseID, e.Grade\nFROM Students s\nINNER JOIN Enrollments e\n  ON s.StudentID = e.StudentID;",
            vi: "CHỌN s.MaSV, s.HoTen, e.MaMH, e.DiemChu\nTỪ SinhVien s\nKẾT NỐI TRONG DangKy e\n  TRÊN ĐIỀU KIỆN s.MaSV = e.MaSV;"
          },
          theory: {
            concept: {
              en: "Inner Join (⋈_θ) returns only tuples from both relations that satisfy the join condition θ. Tuples that do not have a match in the other relation are discarded.",
              vi: "Kết nối trong (⋈_θ) chỉ giữ lại những bộ từ cả hai quan hệ thỏa mãn điều kiện kết nối θ. Các bộ không tìm thấy đối sánh tương ứng ở bảng kia sẽ bị loại bỏ."
            },
            formal: {
              en: "R \\bowtie_{\\theta} S = \\sigma_{\\theta}(R \\times S)",
              vi: "R \\bowtie_{\\theta} S = \\sigma_{\\theta}(R \\times S)"
            },
            sqlMapping: {
              en: "Maps directly to `INNER JOIN ... ON ...` in SQL.",
              vi: "Tương ứng trực tiếp với `KẾT NỐI TRONG ... TRÊN ĐIỀU KIỆN ...` trong SQL."
            },
            tips: {
              en: "Alice (S01) enrolled in 2 courses, producing 2 rows. Bob (S02) enrolled in 1. Charlie (S03) enrolled in 1. Total = 4 rows.",
              vi: "Linh (SV01) đăng ký 2 môn -> sinh ra 2 hàng. Bảo (SV02) có 1 môn. Cường (SV03) có 1 môn. Tổng cộng = 4 hàng."
            }
          },
          tablesShown: ["students", "enrollments", "courses", "professors"],
          requiredTables: ["students", "enrollments"],
          expectedResult: {
            columns: ["StudentID", "FullName", "CourseID", "Grade"],
            rows: [
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A", vi: "A" }
              },
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS102", vi: "MH102" },
                Grade: { en: "B+", vi: "B+" }
              },
              {
                StudentID: { en: "S02", vi: "SV02" },
                FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A-", vi: "A-" }
              },
              {
                StudentID: { en: "S03", vi: "SV03" },
                FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
                CourseID: { en: "IS201", vi: "MH201" },
                Grade: { en: "B", vi: "B" }
              }
            ]
          }
        },

        {
          id: "join-left",
          title: { en: "Case 2: Left Outer Join (Students ⟕ Enrollments)", vi: "Trường hợp 2: Kết nối ngoài trái (SinhVien ⟕ DangKy)" },
          difficulty: "Hard",
          joinType: "Left Outer Join",
          instruction: {
            en: "Perform a LEFT OUTER JOIN from Students to Enrollments on StudentID. Keep StudentID, FullName, CourseID, and Grade. Preserves ALL students! Unmatched students (S04, S05) receive NULL for CourseID and Grade.",
            vi: "Thực hiện KẾT NỐI NGOÀI TRÁI từ SinhVien sang DangKy theo MaSV. Giữ lại các cột MaSV, HoTen, MaMH, và DiemChu. Giữ lại TẤT CẢ sinh viên! Những sinh viên chưa đăng ký môn nào (SV04, SV05) sẽ nhận giá trị NULL ở MaMH và DiemChu."
          },
          relationalAlgebra: "\\pi_{StudentID, FullName, CourseID, Grade}(Students {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} Enrollments)",
          relationalAlgebraVi: "\\pi_{MaSV, HoTen, MaMH, DiemChu}(SinhVien {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} DangKy)",
          sql: {
            en: "SELECT s.StudentID, s.FullName, e.CourseID, e.Grade\nFROM Students s\nLEFT JOIN Enrollments e\n  ON s.StudentID = e.StudentID;",
            vi: "CHỌN s.MaSV, s.HoTen, e.MaMH, e.DiemChu\nTỪ SinhVien s\nKẾT NỐI NGOÀI TRÁI DangKy e\n  TRÊN ĐIỀU KIỆN s.MaSV = e.MaSV;"
          },
          theory: {
            concept: {
              en: "Left Outer Join (⟕) keeps all tuples from the left relation. If a left tuple has no matching tuple in the right relation, attributes of the right relation are filled with NULL values.",
              vi: "Kết nối ngoài trái (⟕) bảo toàn toàn bộ các bộ từ quan hệ bên trái. Nếu một bộ bên trái không tìm thấy bản ghi tương ứng bên phải, các thuộc tính của bảng phải sẽ được điền giá trị NULL."
            },
            formal: {
              en: "R {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} S = (R \\bowtie S) \\cup ( (R - \\pi_{attrs(R)}(R \\bowtie S)) \\times \\{ (\\text{NULL}, \\dots, \\text{NULL}) \\} )",
              vi: "R {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} S = (R \\bowtie S) \\cup ( (R - \\pi_{attrs(R)}(R \\bowtie S)) \\times \\{ (\\text{NULL}, \\dots, \\text{NULL}) \\} )"
            },
            sqlMapping: {
              en: "Maps to `LEFT JOIN` or `LEFT OUTER JOIN` in SQL.",
              vi: "Tương ứng với `KẾT NỐI NGOÀI TRÁI` (LEFT JOIN) trong SQL."
            },
            tips: {
              en: "Notice that S04 (Diana) and S05 (Evan) are preserved with NULL for CourseID and Grade. Total = 6 rows.",
              vi: "Lưu ý rằng SV04 (Diệu Anh) và SV05 (Minh Đức) được giữ lại với giá trị NULL ở MaMH và DiemChu. Tổng cộng = 6 hàng."
            }
          },
          tablesShown: ["students", "enrollments", "departments"],
          requiredTables: ["students", "enrollments"],
          expectedResult: {
            columns: ["StudentID", "FullName", "CourseID", "Grade"],
            rows: [
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A", vi: "A" }
              },
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS102", vi: "MH102" },
                Grade: { en: "B+", vi: "B+" }
              },
              {
                StudentID: { en: "S02", vi: "SV02" },
                FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A-", vi: "A-" }
              },
              {
                StudentID: { en: "S03", vi: "SV03" },
                FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
                CourseID: { en: "IS201", vi: "MH201" },
                Grade: { en: "B", vi: "B" }
              },
              {
                StudentID: { en: "S04", vi: "SV04" },
                FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" },
                CourseID: { en: "NULL", vi: "NULL" },
                Grade: { en: "NULL", vi: "NULL" }
              },
              {
                StudentID: { en: "S05", vi: "SV05" },
                FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" },
                CourseID: { en: "NULL", vi: "NULL" },
                Grade: { en: "NULL", vi: "NULL" }
              }
            ]
          }
        },

        {
          id: "join-right",
          title: { en: "Case 3: Right Outer Join (Students ⟖ Enrollments)", vi: "Trường hợp 3: Kết nối ngoài phải (SinhVien ⟖ DangKy)" },
          difficulty: "Hard",
          joinType: "Right Outer Join",
          instruction: {
            en: "Perform a RIGHT OUTER JOIN between Students and Enrollments on StudentID. Keep StudentID, FullName, CourseID, and Grade. Preserves ALL enrollments! S06 has no student profile, so StudentID in result is S06 and FullName is NULL.",
            vi: "Thực hiện KẾT NỐI NGOÀI PHẢI giữa SinhVien và DangKy theo MaSV. Giữ lại MaSV, HoTen, MaMH, và DiemChu. Giữ lại TẤT CẢ các bản ghi đăng ký! SV06 không có hồ sơ sinh viên, nên MaSV là SV06 và HoTen nhận giá trị NULL."
          },
          relationalAlgebra: "\\pi_{Enrollments.StudentID, FullName, CourseID, Grade}(Students {\\;\\mkern-12mu\\raisebox{0.15ex}{]}\\bowtie\\;} Enrollments)",
          relationalAlgebraVi: "\\pi_{DangKy.MaSV, HoTen, MaMH, DiemChu}(SinhVien {\\;\\mkern-12mu\\raisebox{0.15ex}{]}\\bowtie\\;} DangKy)",
          sql: {
            en: "SELECT e.StudentID, s.FullName, e.CourseID, e.Grade\nFROM Students s\nRIGHT JOIN Enrollments e\n  ON s.StudentID = e.StudentID;",
            vi: "CHỌN e.MaSV, s.HoTen, e.MaMH, e.DiemChu\nTỪ SinhVien s\nKẾT NỐI NGOÀI PHẢI DangKy e\n  TRÊN ĐIỀU KIỆN s.MaSV = e.MaSV;"
          },
          theory: {
            concept: {
              en: "Right Outer Join (⟖) preserves all tuples from the right relation. If a right tuple has no matching tuple in the left relation, missing attributes are padded with NULL.",
              vi: "Kết nối ngoài phải (⟖) bảo toàn mọi bộ từ quan hệ bên phải. Nếu một bộ bên phải không có bộ tương ứng bên trái, các thuộc tính còn thiếu sẽ được bù bằng NULL."
            },
            formal: {
              en: "R {\\;\\mkern-12mu\\raisebox{0.15ex}{]}\\bowtie\\;} S \\equiv S {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} R",
              vi: "R {\\;\\mkern-12mu\\raisebox{0.15ex}{]}\\bowtie\\;} S \\equiv S {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} R"
            },
            sqlMapping: {
              en: "Maps to `RIGHT JOIN` or `RIGHT OUTER JOIN` in SQL.",
              vi: "Tương ứng với `KẾT NỐI NGOÀI PHẢI` (RIGHT JOIN) trong SQL."
            },
            tips: {
              en: "S06 appears in Enrollments (CS101, Grade A). Since S06 is not in Students, FullName becomes NULL. Total = 5 rows.",
              vi: "SV06 có trong bảng DangKy (MH101, điểm A). Vì SV06 không có trong SinhVien, HoTen nhận giá trị NULL. Tổng cộng = 5 hàng."
            }
          },
          tablesShown: ["students", "enrollments", "professors"],
          requiredTables: ["students", "enrollments"],
          expectedResult: {
            columns: ["StudentID", "FullName", "CourseID", "Grade"],
            rows: [
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A", vi: "A" }
              },
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS102", vi: "MH102" },
                Grade: { en: "B+", vi: "B+" }
              },
              {
                StudentID: { en: "S02", vi: "SV02" },
                FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A-", vi: "A-" }
              },
              {
                StudentID: { en: "S03", vi: "SV03" },
                FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
                CourseID: { en: "IS201", vi: "MH201" },
                Grade: { en: "B", vi: "B" }
              },
              {
                StudentID: { en: "S06", vi: "SV06" },
                FullName: { en: "NULL", vi: "NULL" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A", vi: "A" }
              }
            ]
          }
        },

        {
          id: "join-full",
          title: { en: "Case 4: Full Outer Join (Students ⟗ Enrollments)", vi: "Trường hợp 4: Kết nối ngoài đầy đủ (SinhVien ⟗ DangKy)" },
          difficulty: "Hard",
          joinType: "Full Outer Join",
          instruction: {
            en: "Perform a FULL OUTER JOIN between Students and Enrollments on StudentID. Keep StudentID, FullName, CourseID, and Grade. Preserves ALL rows from BOTH tables! (Unmatched students get NULL course info; unmatched enrollments get NULL student info).",
            vi: "Thực hiện KẾT NỐI NGOÀI ĐẦY ĐỦ giữa SinhVien và DangKy theo MaSV. Giữ lại MaSV, HoTen, MaMH, và DiemChu. Bảo toàn TẤT CẢ các bộ từ CẢ HAI bảng! (Sinh viên chưa đăng ký nhận NULL thông tin môn học; đăng ký thiếu sinh viên nhận NULL thông tin họ tên)."
          },
          relationalAlgebra: "\\pi_{COALESCE(s.ID, e.ID), FullName, CourseID, Grade}(Students {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\mkern-12mu\\raisebox{0.15ex}{]}\\;} Enrollments)",
          relationalAlgebraVi: "\\pi_{COALESCE(s.MaSV, e.MaSV), HoTen, MaMH, DiemChu}(SinhVien {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\mkern-12mu\\raisebox{0.15ex}{]}\\;} DangKy)",
          sql: {
            en: "SELECT COALESCE(s.StudentID, e.StudentID) AS StudentID,\n       s.FullName, e.CourseID, e.Grade\nFROM Students s\nFULL OUTER JOIN Enrollments e\n  ON s.StudentID = e.StudentID;",
            vi: "CHỌN NẾU_NULL(s.MaSV, e.MaSV) LÀ MaSV,\n       s.HoTen, e.MaMH, e.DiemChu\nTỪ SinhVien s\nKẾT NỐI NGOÀI ĐẦY ĐỦ DangKy e\n  TRÊN ĐIỀU KIỆN s.MaSV = e.MaSV;"
          },
          theory: {
            concept: {
              en: "Full Outer Join (⟗) combines the effect of Left and Right Outer Joins. It retains all tuples from both relations, substituting NULL for missing attributes on either side.",
              vi: "Kết nối ngoài đầy đủ (⟗) kết hợp cả hai phép kết ngoài trái và phải. Nó giữ lại tất cả các bộ của cả hai quan hệ, điền NULL cho bất kỳ thuộc tính nào bị khuyết từ mỗi phía."
            },
            formal: {
              en: "R {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\mkern-12mu\\raisebox{0.15ex}{]}\\;} S = (R {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} S) \\cup (R {\\;\\mkern-12mu\\raisebox{0.15ex}{]}\\bowtie\\;} S)",
              vi: "R {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\mkern-12mu\\raisebox{0.15ex}{]}\\;} S = (R {\\;\\bowtie\\mkern-12mu\\raisebox{0.15ex}{[}\\;} S) \\cup (R {\\;\\mkern-12mu\\raisebox{0.15ex}{]}\\bowtie\\;} S)"
            },
            sqlMapping: {
              en: "Maps to `FULL OUTER JOIN ... ON ...` in standard SQL.",
              vi: "Tương ứng với `KẾT NỐI NGOÀI ĐẦY ĐỦ ... TRÊN ĐIỀU KIỆN ...` trong SQL."
            },
            tips: {
              en: "Result contains: 4 matched rows + 2 unmatched students (S04, S05) + 1 unmatched enrollment (S06) = 7 total rows!",
              vi: "Kết quả gồm: 4 hàng khớp + 2 sinh viên chưa đăng ký (SV04, SV05) + 1 lượt đăng ký thiếu sinh viên (SV06) = 7 hàng tất cả!"
            }
          },
          tablesShown: ["students", "enrollments", "courses", "classrooms"],
          requiredTables: ["students", "enrollments"],
          expectedResult: {
            columns: ["StudentID", "FullName", "CourseID", "Grade"],
            rows: [
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A", vi: "A" }
              },
              {
                StudentID: { en: "S01", vi: "SV01" },
                FullName: { en: "Alice Nguyen", vi: "Nguyễn Thùy Linh" },
                CourseID: { en: "CS102", vi: "MH102" },
                Grade: { en: "B+", vi: "B+" }
              },
              {
                StudentID: { en: "S02", vi: "SV02" },
                FullName: { en: "Bob Tran", vi: "Trần Quốc Bảo" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A-", vi: "A-" }
              },
              {
                StudentID: { en: "S03", vi: "SV03" },
                FullName: { en: "Charlie Le", vi: "Lê Văn Cường" },
                CourseID: { en: "IS201", vi: "MH201" },
                Grade: { en: "B", vi: "B" }
              },
              {
                StudentID: { en: "S04", vi: "SV04" },
                FullName: { en: "Diana Pham", vi: "Phạm Diệu Anh" },
                CourseID: { en: "NULL", vi: "NULL" },
                Grade: { en: "NULL", vi: "NULL" }
              },
              {
                StudentID: { en: "S05", vi: "SV05" },
                FullName: { en: "Evan Vu", vi: "Vũ Minh Đức" },
                CourseID: { en: "NULL", vi: "NULL" },
                Grade: { en: "NULL", vi: "NULL" }
              },
              {
                StudentID: { en: "S06", vi: "SV06" },
                FullName: { en: "NULL", vi: "NULL" },
                CourseID: { en: "CS101", vi: "MH101" },
                Grade: { en: "A", vi: "A" }
              }
            ]
          }
        },

        {
          id: "join-natural",
          title: { en: "Case 5: Natural Join (Courses * Prerequisites)", vi: "Trường hợp 5: Kết nối tự nhiên (MonHoc * DieuKienTienQuyet)" },
          difficulty: "Medium",
          joinType: "Natural Join",
          instruction: {
            en: "Perform a NATURAL JOIN between Courses and Prerequisites. In natural join, relations join on ALL identically named attributes (CourseID), and the join column appears only ONCE in the result schema! Output: CourseID, CourseName, PrereqCourseID, MinGrade.",
            vi: "Thực hiện KẾT NỐI TỰ NHIÊN giữa MonHoc và DieuKienTienQuyet. Trong kết nối tự nhiên, hai bảng tự động ghép theo thuộc tính trùng tên (MaMH), và cột ghép này CHỈ XUẤT HIỆN ĐÚNG 1 LẦN trong lược đồ kết quả! Các cột: MaMH, TenMonHoc, MaMHTienQuyet, DiemToiThieu."
          },
          relationalAlgebra: "\\pi_{CourseID, CourseName, PrereqCourseID, MinGrade}(Courses * Prerequisites)",
          relationalAlgebraVi: "\\pi_{MaMH, TenMonHoc, MaMHTienQuyet, DiemToiThieu}(MonHoc * DieuKienTienQuyet)",
          sql: {
            en: "SELECT CourseID, CourseName, PrereqCourseID, MinGrade\nFROM Courses\nNATURAL JOIN Prerequisites;",
            vi: "CHỌN MaMH, TenMonHoc, MaMHTienQuyet, DiemToiThieu\nTỪ MonHoc\nKẾT NỐI TỰ NHIÊN DieuKienTienQuyet;"
          },
          theory: {
            concept: {
              en: "Natural Join (*) is an equijoin over all common attributes with implicit projection that removes duplicate join columns from the result schema.",
              vi: "Kết nối tự nhiên (*) là phép kết nối bằng dựa trên tất cả các thuộc tính có cùng tên, tự động loại bỏ cột ghép bị lặp khỏi lược đồ kết quả."
            },
            formal: {
              en: "R * S = \\pi_{attrs(R) \\cup attrs(S)}(\\sigma_{R.A_1 = S.A_1 \\land \\dots}(R \\times S))",
              vi: "R * S = \\pi_{attrs(R) \\cup attrs(S)}(\\sigma_{R.A_1 = S.A_1 \\land \\dots}(R \\times S))"
            },
            sqlMapping: {
              en: "Maps to `NATURAL JOIN` in standard SQL (or `JOIN ... USING (CourseID)`).",
              vi: "Tương ứng với `KẾT NỐI TỰ NHIÊN` (NATURAL JOIN) trong SQL hoặc `KẾT NỐI ... DÙNG (MaMH)`."
            },
            tips: {
              en: "Common attribute is CourseID. CS102 and SE301 have prerequisites listed, producing 2 matching rows.",
              vi: "Thuộc tính chung là MaMH. MH102 và MH301 có quy định môn tiên quyết, tạo ra 2 hàng khớp."
            }
          },
          tablesShown: ["courses", "prerequisites", "classrooms", "departments"],
          requiredTables: ["courses", "prerequisites"],
          expectedResult: {
            columns: ["CourseID", "CourseName", "PrereqCourseID", "MinGrade"],
            rows: [
              {
                CourseID: { en: "CS102", vi: "MH102" },
                CourseName: { en: "Computer Networks", vi: "Mạng Máy Tính" },
                PrereqCourseID: { en: "CS101", vi: "MH101" },
                MinGrade: { en: "C", vi: "C" }
              },
              {
                CourseID: { en: "SE301", vi: "MH301" },
                CourseName: { en: "Software Architecture", vi: "Kiến Trúc Phần Mềm" },
                PrereqCourseID: { en: "CS101", vi: "MH101" },
                MinGrade: { en: "B", vi: "B" }
              }
            ]
          }
        }
      ]
    }
  ],

  // Translation dictionaries for UI labels and messages
  translations: {
    en: {
      siteTitle: "Relational Algebra & Set Theory",
      siteSubtitle: "Interactive Database Theory Laboratory",
      sqlDialectLabel: "Structured Query Language (SQL)",
      learningProgress: "LEARNING PROGRESS",
      complete: "COMPLETE",
      inProgress: "IN PROGRESS",
      allTopics: "Topics & Operations",
      availableTablesTitle: "Database Source Tables",
      distractorNotice: "Notice: 1-2 extra tables are shown as distractors to train table identification.",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
      minimize: "Minimize",
      expand: "Expand",
      rowsCount: "rows",
      colsCount: "cols",
      operationHeader: "Relational Algebra Expression",
      sqlEquivalenceHeader: "Equivalent SQL Query",
      copySql: "Copy SQL",
      sqlCopied: "SQL Copied to clipboard!",
      readMoreInfo: "Theory & Explanation (Click to read)",
      resultTableHeader: "Your Result Table (Interactive Exercise)",
      resultTableHelp: "Step 1: Choose column names. Step 2: Fill cell values (type or pick from column dropdown). Step 3: Check answer.",
      addColumn: "+ Add Column",
      removeColumn: "- Remove Col",
      addRow: "+ Add Row",
      clearTable: "Clear Rows",
      checkAnswer: "Check Result",
      showSolution: "Show Solution",
      hideSolution: "Hide Solution",
      showHint: "Need a Hint?",
      nextCase: "Next Exercise →",
      selectColumnPlaceholder: "-- Select Column --",
      selectValuePlaceholder: "Type or pick value...",
      pickFromList: "Select value...",
      correctCongratulations: "🎉 Outstanding! Your result table matches the relational algebra expression perfectly!",
      incorrectFeedback: "Not quite right yet. Please check the feedback below:",
      missingColumns: "Missing required column(s):",
      extraColumns: "Extra unexpected column(s):",
      duplicateColumns: "You have duplicated columns. Each column header must be unique.",
      rowMismatch: "Your table has {actual} rows, but the expected result has {expected} rows.",
      missingRowDetails: "Row {num} is missing or has incorrect values.",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      themeToggle: "Toggle Light/Dark Theme",
      toggleSidebar: "Toggle Sidebar",
      theoryModalTitle: "Theory & Operational Semantics",
      theoryConcept: "Mathematical Concept",
      theoryFormal: "Formal Definition",
      theorySqlMapping: "SQL Equivalence",
      theoryTips: "Exam Tips & Observations",
      closeModal: "Close",
      caseStatusNotStarted: "Not Started",
      caseStatusInProgress: "In Progress",
      caseStatusCompleted: "Completed",
      searchPlaceholder: "Search topics or operations...",
      difficultyLabel: "Difficulty",
      resetProgress: "Reset All Progress",
      resetProgressConfirm: "Are you sure you want to reset all your learning progress?"
    },

    vi: {
      siteTitle: "Đại Số Quan Hệ & Lý Thuyết Tập Hợp",
      siteSubtitle: "Phòng Thực Hành Tương Tác Cơ Sở Dữ Liệu",
      sqlDialectLabel: "Ngôn Ngữ Truy Vấn Có Cấu Trúc (SQL)",
      learningProgress: "TIẾN ĐỘ HỌC TẬP",
      complete: "HOÀN THÀNH",
      inProgress: "ĐANG LÀM",
      allTopics: "Chủ Đề & Phép Toán",
      availableTablesTitle: "Các Bảng Dữ Liệu Nguồn",
      distractorNotice: "Lưu ý: Có 1-2 bảng gây nhiễu được thêm vào để bạn luyện tập nhận biết bảng cần truy vấn.",
      expandAll: "Mở rộng tất cả",
      collapseAll: "Thu gọn tất cả",
      minimize: "Thu gọn",
      expand: "Mở rộng",
      rowsCount: "hàng",
      colsCount: "cột",
      operationHeader: "Biểu Thức Đại Số Quan Hệ",
      sqlEquivalenceHeader: "Câu Lệnh SQL Tương Đương",
      copySql: "Sao chép SQL",
      sqlCopied: "Đã sao chép SQL vào bộ nhớ tạm!",
      readMoreInfo: "Lý thuyết & Giải thích chi tiết (Nhấn để xem)",
      resultTableHeader: "Bảng Kết Quả Của Bạn (Bài Tập Tương Tác)",
      resultTableHelp: "Bước 1: Chọn tiêu đề cột. Bước 2: Điền dữ liệu (gõ trực tiếp hoặc chọn từ danh sách). Bước 3: Nhấn kiểm tra.",
      addColumn: "+ Thêm Cột",
      removeColumn: "- Xóa Cột",
      addRow: "+ Thêm Hàng",
      clearTable: "Xóa Các Hàng",
      checkAnswer: "Kiểm Tra Kết Quả",
      showSolution: "Xem Lời Giải",
      hideSolution: "Ẩn Lời Giải",
      showHint: "Xem Gợi Ý",
      nextCase: "Bài Tiếp Theo →",
      selectColumnPlaceholder: "-- Chọn Tên Cột --",
      selectValuePlaceholder: "Gõ hoặc chọn giá trị...",
      pickFromList: "Chọn giá trị...",
      correctCongratulations: "🎉 Xuất sắc! Bảng kết quả của bạn hoàn toàn chính xác với biểu thức đại số quan hệ!",
      incorrectFeedback: "Chưa chính xác hoàn toàn. Hãy xem các phản hồi chi tiết dưới đây:",
      missingColumns: "Còn thiếu cột bắt buộc:",
      extraColumns: "Cột dư thừa không cần thiết:",
      duplicateColumns: "Có cột bị trùng lặp. Mỗi tiêu đề cột phải là duy nhất.",
      rowMismatch: "Bảng của bạn hiện có {actual} hàng, nhưng kết quả đúng cần có {expected} hàng.",
      missingRowDetails: "Hàng số {num} bị thiếu hoặc có giá trị chưa đúng.",
      lightMode: "Chế độ Sáng",
      darkMode: "Chế độ Tối",
      themeToggle: "Chuyển Đổi Sáng/Tối",
      toggleSidebar: "Đóng/Mở Thanh Bên",
      theoryModalTitle: "Lý Thuyết & Ngữ Nghĩa Phép Toán",
      theoryConcept: "Khái Niệm Toán Học",
      theoryFormal: "Định Nghĩa Hình Thức",
      theorySqlMapping: "Cú Pháp SQL Tương Đương",
      theoryTips: "Lưu Ý Khi Làm Bài Thi",
      closeModal: "Đóng",
      caseStatusNotStarted: "Chưa Làm",
      caseStatusInProgress: "Đang Làm",
      caseStatusCompleted: "Đã Hoàn Thành",
      searchPlaceholder: "Tìm kiếm chủ đề, phép toán...",
      difficultyLabel: "Độ khó",
      resetProgress: "Đặt Lại Tiến Độ",
      resetProgressConfirm: "Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập không?"
    }
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.COURSE_DATA = COURSE_DATA;
}
