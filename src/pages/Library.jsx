import {
  BookOpen,
  Search,
  Filter,
  Clock3,
  CheckCircle2,
  BookMarked,
  Users,
  LibraryBig,
} from "lucide-react";

import "../styles/pages/Library.css";

const books = [
  {
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "Artificial Intelligence",
    available: 4,
    total: 8,
    status: "Available",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    available: 2,
    total: 6,
    status: "Available",
  },
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    category: "Machine Learning",
    available: 0,
    total: 5,
    status: "Unavailable",
  },
  {
    title: "Business Analytics",
    author: "James Evans",
    category: "Analytics",
    available: 3,
    total: 5,
    status: "Available",
  },
  {
    title: "High Performance Computing",
    author: "Georg Hager",
    category: "Computing",
    available: 1,
    total: 4,
    status: "Available",
  },
  {
    title: "Research Methodology",
    author: "Ranjit Kumar",
    category: "Research",
    available: 5,
    total: 7,
    status: "Available",
  },
];

const borrowedBooks = [
  {
    title: "Deep Learning with Python",
    author: "François Chollet",
    borrowedOn: "05 Aug 2026",
    dueDate: "19 Aug 2026",
    daysLeft: 6,
  },
  {
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    borrowedOn: "08 Aug 2026",
    dueDate: "22 Aug 2026",
    daysLeft: 9,
  },
];

function Library() {
  const availableBooks = books.filter(
    (book) => book.status === "Available"
  ).length;

  const unavailableBooks = books.filter(
    (book) => book.status === "Unavailable"
  ).length;

  return (
    <div className="library-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="library-header">

        <div>

          <div className="library-eyebrow">
            <LibraryBig size={15} />
            CAMPUS LIBRARY
          </div>

          <h1>Library</h1>

          <p>
            Discover books, manage borrowed resources and track your library activity.
          </p>

        </div>

        <div className="library-member-card">

          <BookOpen size={18} />

          <div>
            <span>Library Status</span>
            <strong>Active Member</strong>
          </div>

        </div>

      </div>


      {/* =========================
          QUICK STATISTICS
      ========================= */}

      <div className="library-stats">

        <div className="library-stat-card">

          <div className="library-stat-icon purple">
            <BookOpen size={19} />
          </div>

          <div>
            <span>Total Resources</span>
            <strong>1,248</strong>
            <small>Books & academic resources</small>
          </div>

        </div>


        <div className="library-stat-card">

          <div className="library-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Available Now</span>
            <strong>864</strong>
            <small>Ready to borrow</small>
          </div>

        </div>


        <div className="library-stat-card">

          <div className="library-stat-icon blue">
            <BookMarked size={19} />
          </div>

          <div>
            <span>My Borrowed Books</span>
            <strong>{borrowedBooks.length}</strong>
            <small>Currently with you</small>
          </div>

        </div>


        <div className="library-stat-card">

          <div className="library-stat-icon orange">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Next Due</span>
            <strong>6 Days</strong>
            <small>Nearest return deadline</small>
          </div>

        </div>

      </div>


      {/* =========================
          SEARCH & FILTER
      ========================= */}

      <div className="library-search-section">

        <div className="library-search-box">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search books, authors or subjects..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>

        </div>


        <button className="library-filter-button">

          <Filter size={17} />

          Filter

        </button>

      </div>


      {/* =========================
          BOOK COLLECTION
      ========================= */}

      <div className="library-section">

        <div className="library-section-header">

          <div>

            <h2>Explore Library</h2>

            <p>
              Browse academic resources available on campus.
            </p>

          </div>

          <span className="library-result-count">
            {books.length} Featured Books
          </span>

        </div>


        <div className="book-grid">

          {books.map((book, index) => (

            <div
              className="book-card"
              key={index}
            >

              <div className="book-card-top">

                <div className="book-cover">

                  <BookOpen size={28} />

                </div>

                <span
                  className={`book-status ${
                    book.status === "Available"
                      ? "available"
                      : "unavailable"
                  }`}
                >
                  {book.status}
                </span>

              </div>


              <div className="book-card-content">

                <span className="book-category">
                  {book.category}
                </span>

                <h3>
                  {book.title}
                </h3>

                <p>
                  {book.author}
                </p>

              </div>


              <div className="book-card-footer">

                <div>

                  <span>Availability</span>

                  <strong>
                    {book.available}/{book.total}
                  </strong>

                </div>

                <Users size={15} />

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =========================
          MY BORROWED BOOKS
      ========================= */}

      <div className="borrowed-section">

        <div className="library-section-header">

          <div>

            <h2>My Borrowed Books</h2>

            <p>
              Keep track of your current library loans.
            </p>

          </div>

          <span className="library-result-count">
            {borrowedBooks.length} Active Loans
          </span>

        </div>


        <div className="borrowed-list">

          {borrowedBooks.map((book, index) => (

            <div
              className="borrowed-card"
              key={index}
            >

              <div className="borrowed-icon">

                <BookMarked size={20} />

              </div>


              <div className="borrowed-main">

                <span>
                  CURRENT LOAN
                </span>

                <h3>
                  {book.title}
                </h3>

                <p>
                  {book.author}
                </p>

              </div>


              <div className="borrowed-date">

                <span>
                  Borrowed
                </span>

                <strong>
                  {book.borrowedOn}
                </strong>

              </div>


              <div className="borrowed-date">

                <span>
                  Due Date
                </span>

                <strong>
                  {book.dueDate}
                </strong>

              </div>


              <div className="days-left">

                <Clock3 size={15} />

                <div>
                  <strong>
                    {book.daysLeft} days
                  </strong>

                  <span>
                    remaining
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =========================
          SMART INSIGHT
      ========================= */}

      <div className="library-insight">

        <div className="insight-icon">
          ✦
        </div>

        <div>

          <span>
            CAMPUSIQ INSIGHT
          </span>

          <h3>
            Your next library return is due in 6 days.
          </h3>

          <p>
            You currently have {borrowedBooks.length} books borrowed.
            Return them on time to maintain your library access.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Library;