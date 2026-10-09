# 🎓 CampusMate — All-in-One Student Productivity & Campus Platform

**CampusMate** is a high-fidelity Next.js student platform built to help college students streamline their academic requirements and engage with their campus community in one unified interface.

---

## 📱 Product Requirements Document (PRD) & Screen Breakdown

CampusMate addresses the key pain points of college students through 6 dedicated screens:

### 1. Dashboard Overview (`/`)
* **Welcome Hero & Student Pulse:** Displays personalized student ID, semester info, pending assignment count, and overall attendance gauge.
* **Quick Metric Cards:** Live counters for pending assignments, overall attendance, active campus events, and marketplace listings.
* **Urgent Deadline Alert:** Highlights the next upcoming coursework due date with priority badge and quick submission action.
* **Bunk Safe Indicator:** Live calculation showing how many future lectures can be safely missed while maintaining >75% attendance.
* **Featured Highlights:** Snippets of active hackathons, lost-and-found reports, and marketplace listings.

### 2. Assignments & Deadlines Tracker (`/assignments`)
* **Status Filter Tabs:** All, Pending, Submitted, and Overdue tasks.
* **Course Filter & Search:** Instantly filter tasks by course code (e.g. `CS302`, `CS304`, `MATH201`) or keywords.
* **Priority & Progress Badges:** Visual tags for High/Medium/Low priority.
* **Interactive Completion Toggle:** One-click status updater between "Pending" and "Submitted".
* **Add Assignment Modal:** Full form validation to add custom assignments with due date, priority, points, and instructions.

### 3. Attendance Monitor & Analytics (`/attendance`)
* **Course Progress Cards:** Displays attended/total lectures per course with dynamic progress bars.
* **Bunk & Shortage Predictor:**
  * *If >75%:* Calculates exact number of lectures you can safely skip.
  * *If <75%:* Calculates exact number of consecutive classes required to restore eligibility.
* **Attendance Threshold Selector:** Toggle minimum target between 70%, 75%, 80%, or 85%.
* **Quick Attendance Logger:** Interactive `+ Present` and `+ Absent` loggers updating live state.

### 4. Campus Events & Activity Feed (`/events`)
* **Category Filter Pills:** Hackathons, Workshops, Cultural Fests, Sports, Club Meetings, Career Fairs.
* **RSVP & Bookmark Controls:** Interactive RSVP toggle with live attendance counter increments/decrements.
* **Event Detail Modal:** Complete overview of speaker, time, venue, organizer, and schedule.
* **Host an Event Form Modal:** Form for student leaders to publish new campus events.

### 5. Lost & Found Community Hub (`/lost-and-found`)
* **Lost vs Found Tabs:** Separate views for reported lost belongings vs found items with status badges.
* **Location & Reward Badges:** Tags specifying exact campus spots (Library 2nd Floor, Cafeteria, Science Block) and cash rewards.
* **Contact Owner Modal:** Direct contact channel with email links and "Mark Item Resolved" status update.
* **Report Lost/Found Form:** Submit new reports with category, location, reward, and description.

### 6. Student Marketplace (`/marketplace`)
* **Peer-to-Peer Campus Store:** Buy & sell textbooks, electronics, monitors, bikes, dorm chairs, and lab kits.
* **Filter Controls:** Category pills, item condition (Brand New, Like New, Good, Used), and max price filter.
* **Buy / Chat with Seller Modal:** Instant message simulation to reach out to student sellers directly.
* **List Item Form:** Publish new items for sale with pricing, location, condition, and image preview simulation.

---

## 🚀 Tech Stack

- **Framework:** Next.js (React 18/19, App Router)
- **Styling:** Tailwind CSS + Custom CSS Variables & Glassmorphism
- **Icons:** Lucide React
- **Language:** TypeScript
- **Design System:** Responsive mobile-first design with drawer sidebar and sticky header.

---

## 🛠️ How to Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore **CampusMate**!
