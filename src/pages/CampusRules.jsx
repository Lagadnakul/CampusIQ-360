
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Info,
  Library,
  Search,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import "../styles/pages/CampusRules.css";


/* =========================================================
   CAMPUS RULE DATA
========================================================= */

const campusRules = [
  {
    id: 1,
    title: "Maintain Academic Integrity",
    description:
      "Students must complete academic work honestly and must not engage in plagiarism, cheating, or unauthorized collaboration.",
    category: "Academic",
    icon: GraduationCap,
    status: "Important",
    statusType: "important",
  },
  {
    id: 2,
    title: "Attendance Requirement",
    description:
      "Students are expected to maintain the minimum attendance requirement specified by the university for their courses.",
    category: "Academic",
    icon: Clock3,
    status: "Important",
    statusType: "important",
  },
  {
    id: 3,
    title: "Library Conduct",
    description:
      "Maintain silence inside the library, handle books carefully, and return borrowed materials within the permitted period.",
    category: "Library",
    icon: Library,
    status: "Standard",
    statusType: "standard",
  },
  {
    id: 4,
    title: "Campus Identification",
    description:
      "Students should carry their valid university identification card while accessing campus facilities.",
    category: "Campus",
    icon: ShieldCheck,
    status: "Standard",
    statusType: "standard",
  },
  {
    id: 5,
    title: "Classroom Conduct",
    description:
      "Students should maintain respectful behaviour in classrooms and avoid activities that disrupt teaching and learning.",
    category: "Campus",
    icon: Users,
    status: "Standard",
    statusType: "standard",
  },
  {
    id: 6,
    title: "Restricted Areas",
    description:
      "Students must not enter laboratories, staff-only areas, server rooms, or other restricted locations without authorization.",
    category: "Safety",
    icon: AlertTriangle,
    status: "Important",
    statusType: "important",
  },
  {
    id: 7,
    title: "Computer Lab Usage",
    description:
      "University computers and network resources should only be used for authorized academic and institutional activities.",
    category: "Technology",
    icon: FileText,
    status: "Standard",
    statusType: "standard",
  },
  {
    id: 8,
    title: "Respect Campus Property",
    description:
      "Students are responsible for treating university buildings, equipment, furniture, and other campus property with care.",
    category: "Campus",
    icon: ShieldCheck,
    status: "Standard",
    statusType: "standard",
  },
  {
    id: 9,
    title: "Emergency Instructions",
    description:
      "During emergencies, students must follow instructions from university security and emergency personnel.",
    category: "Safety",
    icon: AlertTriangle,
    status: "Critical",
    statusType: "critical",
  },
];


const categories = [
  "All",
  "Academic",
  "Campus",
  "Library",
  "Safety",
  "Technology",
];


/* =========================================================
   COMPONENT
========================================================= */

function CampusRules() {

  const [activeCategory, setActiveCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");


  /* =======================================================
     FILTER RULES
  ======================================================= */

  const filteredRules = useMemo(() => {

    const query = searchQuery.trim().toLowerCase();

    return campusRules.filter((rule) => {

      const matchesCategory =
        activeCategory === "All" ||
        rule.category === activeCategory;

      const matchesSearch =
        !query ||
        rule.title.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;

    });

  }, [activeCategory, searchQuery]);


  /* =======================================================
     COUNTS
  ======================================================= */

  const importantRules = campusRules.filter(
    (rule) =>
      rule.statusType === "important" ||
      rule.statusType === "critical"
  ).length;


  return (

    <div className="campus-rules-page">


      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="rules-header">

        <div className="rules-header-content">

          <div className="rules-eyebrow">

            <ShieldCheck size={15} />

            CAMPUS GUIDELINES

          </div>


          <h1>
            Campus Rules
          </h1>


          <p>
            Everything you need to know to stay informed,
            safe, and responsible across campus.
          </p>

        </div>


        <div className="rules-header-badge">

          <div className="rules-badge-icon">
            <BookOpen size={20} />
          </div>

          <div>

            <strong>
              {campusRules.length} Guidelines
            </strong>

            <span>
              Keep your campus experience smooth
            </span>

          </div>

        </div>

      </section>



      {/* ===================================================
          OVERVIEW CARDS
      =================================================== */}

      <section className="rules-overview">


        <div className="rules-overview-card">

          <div className="rules-overview-icon purple">
            <FileText size={19} />
          </div>

          <div>

            <span>
              TOTAL GUIDELINES
            </span>

            <strong>
              {campusRules.length}
            </strong>

          </div>

        </div>


        <div className="rules-overview-card">

          <div className="rules-overview-icon orange">
            <AlertTriangle size={19} />
          </div>

          <div>

            <span>
              IMPORTANT
            </span>

            <strong>
              {importantRules}
            </strong>

          </div>

        </div>


        <div className="rules-overview-card">

          <div className="rules-overview-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>

            <span>
              CATEGORIES
            </span>

            <strong>
              {categories.length - 1}
            </strong>

          </div>

        </div>


      </section>



      {/* ===================================================
          SEARCH + FILTER
      =================================================== */}

      <section className="rules-controls">

        <div className="rules-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search campus rules..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          {searchQuery && (

            <button
              className="rules-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <XCircle size={16} />
            </button>

          )}

        </div>


        <div className="rules-category-list">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

      </section>



      {/* ===================================================
          IMPORTANT NOTICE
      =================================================== */}

      <section className="rules-notice">

        <div className="rules-notice-icon">
          <Info size={18} />
        </div>

        <div>

          <strong>
            Stay informed
          </strong>

          <p>
            Campus rules may vary by department,
            facility, or university policy. Always follow
            official instructions when a specific situation
            requires additional guidance.
          </p>

        </div>

      </section>



      {/* ===================================================
          RULES HEADER
      =================================================== */}

      <div className="rules-section-heading">

        <div>

          <span>
            CAMPUS GUIDELINES
          </span>

          <h2>
            Rules & Regulations
          </h2>

        </div>

        <small>
          {filteredRules.length}{" "}
          {filteredRules.length === 1
            ? "rule"
            : "rules"} found
        </small>

      </div>



      {/* ===================================================
          RULE GRID
      =================================================== */}

      {filteredRules.length > 0 ? (

        <section className="rules-grid">

          {filteredRules.map((rule) => {

            const Icon = rule.icon;

            return (

              <article
                className="rule-card"
                key={rule.id}
              >


                <div className="rule-card-top">

                  <div
                    className={`rule-icon ${rule.statusType}`}
                  >
                    <Icon size={20} />
                  </div>


                  <span
                    className={`rule-status ${rule.statusType}`}
                  >

                    {rule.statusType === "critical" && (
                      <AlertTriangle size={12} />
                    )}

                    {rule.statusType === "important" && (
                      <Info size={12} />
                    )}

                    {rule.statusType === "standard" && (
                      <CheckCircle2 size={12} />
                    )}

                    {rule.status}

                  </span>

                </div>



                <div className="rule-card-content">

                  <span className="rule-category">
                    {rule.category}
                  </span>

                  <h3>
                    {rule.title}
                  </h3>

                  <p>
                    {rule.description}
                  </p>

                </div>



                <div className="rule-card-footer">

                  <span>
                    CampusIQ Guideline
                  </span>

                  <ChevronRight size={16} />

                </div>

              </article>

            );

          })}

        </section>

      ) : (

        <div className="rules-empty">

          <div className="rules-empty-icon">
            <Search size={22} />
          </div>

          <h3>
            No rules found
          </h3>

          <p>
            Try a different search term or category.
          </p>

          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </button>

        </div>

      )}



      {/* ===================================================
          FOOTER
      =================================================== */}

      <section className="rules-footer">

        <div className="rules-footer-icon">
          <ShieldCheck size={18} />
        </div>

        <div>

          <strong>
            Campus responsibility
          </strong>

          <span>
            A better campus starts with everyone.
          </span>

        </div>

      </section>


    </div>

  );
}


export default CampusRules;

