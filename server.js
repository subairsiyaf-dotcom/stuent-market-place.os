const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK using serviceAccountKey.json
let db = null;
let firebaseConnected = false;

try {
  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
    firebaseConnected = true;
    console.log(`🔥 Firebase Admin SDK initialized for project: ${serviceAccount.project_id}`);
  } else {
    console.warn("⚠️ serviceAccountKey.json not found. Running in mock mode.");
  }
} catch (error) {
  console.error("❌ Firebase Initialization Error:", error);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initial Default Data for Firestore Seeding
const SEED_DATA = {
  profile: {
    name: "Alex Vance",
    studentId: "CS2024-8841",
    semester: "Fall 2026 - 5th Semester",
    major: "Computer Science",
    gpa: 3.82
  },
  assignments: [
    {
      id: "asgn-1",
      title: "Operating Systems File System Implementation",
      course: "CS302",
      dueDate: "2026-10-15",
      priority: "High",
      status: "Pending",
      points: 100,
      instructions: "Implement FAT32 indexing logic in C++ with memory bounds safety."
    },
    {
      id: "asgn-2",
      title: "Database System Design & Normalization",
      course: "CS304",
      dueDate: "2026-10-18",
      priority: "Medium",
      status: "Pending",
      points: 85,
      instructions: "Normalize relational schemas to 3NF and BCNF with ER diagrams."
    },
    {
      id: "asgn-3",
      title: "Linear Algebra Eigenvectors Problem Set",
      course: "MATH201",
      dueDate: "2026-10-12",
      priority: "High",
      status: "Submitted",
      points: 50,
      instructions: "Solve problems 4.1 to 4.12 including Gram-Schmidt process."
    },
    {
      id: "asgn-4",
      title: "Software Engineering Agile User Stories",
      course: "CS310",
      dueDate: "2026-10-22",
      priority: "Low",
      status: "Pending",
      points: 60,
      instructions: "Draft 10 user stories with acceptance criteria in Given-When-Then format."
    }
  ],
  attendance: [
    { id: "CS302", courseName: "Operating Systems", attended: 22, total: 25, threshold: 75 },
    { id: "CS304", courseName: "Database Systems", attended: 18, total: 20, threshold: 75 },
    { id: "MATH201", courseName: "Linear Algebra", attended: 19, total: 24, threshold: 75 },
    { id: "CS310", courseName: "Software Engineering", attended: 14, total: 15, threshold: 75 }
  ],
  events: [
    {
      id: "evt-1",
      title: "Annual Campus AI & Cloud Hackathon 2026",
      category: "Hackathon",
      date: "2026-10-25",
      time: "09:00 AM - 09:00 PM",
      location: "Innovation Hub, Hall B",
      organizer: "ACM Student Chapter",
      description: "Build innovative AI applications for campus utility. $5,000 in total prizes!",
      attendees: 142,
      isRsvped: false
    },
    {
      id: "evt-2",
      title: "Full-Stack Web Dev Workshop with React & Next.js",
      category: "Workshop",
      date: "2026-10-16",
      time: "04:00 PM - 06:30 PM",
      location: "CS Lab 3",
      organizer: "Dev Club",
      description: "Hands-on workshop covering server actions, Tailwind UI, and Firestore integration.",
      attendees: 88,
      isRsvped: true
    },
    {
      id: "evt-3",
      title: "Autumn Campus Cultural Music Festival",
      category: "Cultural Fests",
      date: "2026-10-30",
      time: "06:00 PM - 11:00 PM",
      location: "Main Open Amphitheater",
      organizer: "Student Council",
      description: "Live bands, food trucks, and light shows celebrating the fall semester.",
      attendees: 320,
      isRsvped: false
    }
  ],
  lostFound: [
    {
      id: "lf-1",
      type: "lost",
      title: "Black Apple iPad Air (5th Gen) with Stylus",
      category: "Electronics",
      location: "Library 2nd Floor Reading Room",
      date: "2026-10-08",
      reward: "$50 Reward",
      status: "Active",
      contactName: "Alex Vance",
      contactEmail: "alex.vance@campus.edu",
      description: "Left in a navy blue case on desk 14. Contains all course lecture notes!"
    },
    {
      id: "lf-2",
      type: "found",
      title: "Sony Noise-Canceling Headphones WH-1000XM4",
      category: "Electronics",
      location: "Cafeteria Counter 3",
      date: "2026-10-09",
      reward: "None",
      status: "Active",
      contactName: "Campus Security Office",
      contactEmail: "security@campus.edu",
      description: "Handed over to security desk. Please bring student ID to claim."
    }
  ],
  marketplace: [
    {
      id: "mkt-1",
      title: "Dell UltraSharp 27\" 4K Monitor (U2723QE)",
      category: "Electronics",
      price: 180,
      condition: "Like New",
      sellerName: "Michael S.",
      sellerRating: 4.9,
      sellerContact: "michael.s@campus.edu",
      imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600",
      status: "Available"
    },
    {
      id: "mkt-2",
      title: "Operating System Concepts Textbook (10th Ed)",
      category: "Books",
      price: 35,
      condition: "Good",
      sellerName: "Priya S.",
      sellerRating: 4.8,
      sellerContact: "priya.s@campus.edu",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
      status: "Available"
    },
    {
      id: "mkt-3",
      title: "Ergonomic Mesh Office Desk Chair",
      category: "Furniture",
      price: 55,
      condition: "Like New",
      sellerName: "David K.",
      sellerRating: 4.7,
      sellerContact: "david.k@campus.edu",
      imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&q=80&w=600",
      status: "Available"
    }
  ]
};

// Seed Firestore if empty
async function seedFirestoreIfEmpty() {
  if (!db) return;
  try {
    const assignmentsSnap = await db.collection('assignments').get();
    if (assignmentsSnap.empty) {
      console.log("🌱 Seeding Firestore initial collections...");
      
      // Seed Profile
      await db.collection('student_profile').doc('current').set(SEED_DATA.profile);

      // Seed Assignments
      for (const item of SEED_DATA.assignments) {
        await db.collection('assignments').doc(item.id).set(item);
      }

      // Seed Attendance
      for (const item of SEED_DATA.attendance) {
        await db.collection('attendance').doc(item.id).set(item);
      }

      // Seed Events
      for (const item of SEED_DATA.events) {
        await db.collection('events').doc(item.id).set(item);
      }

      // Seed Lost & Found
      for (const item of SEED_DATA.lostFound) {
        await db.collection('lost_found').doc(item.id).set(item);
      }

      // Seed Marketplace
      for (const item of SEED_DATA.marketplace) {
        await db.collection('marketplace').doc(item.id).set(item);
      }

      console.log("✅ Firestore Database successfully seeded with CampusMate initial data!");
    } else {
      console.log("⚡ Firestore Database collections already populated.");
    }
  } catch (err) {
    console.error("⚠️ Firestore Seeding Error:", err);
  }
}

seedFirestoreIfEmpty();

// --- API ROUTES ---

// Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    firebaseConnected,
    projectId: 'student-market-place-c3359',
    timestamp: new Date().toISOString()
  });
});

// Profile API
app.get('/api/profile', async (req, res) => {
  try {
    if (db) {
      const doc = await db.collection('student_profile').doc('current').get();
      if (doc.exists) return res.json(doc.data());
    }
    res.json(SEED_DATA.profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const updatedProfile = {
      name: req.body.name || 'Alex Vance',
      studentId: req.body.studentId || 'CS2024-8841',
      semester: req.body.semester || 'Fall 2026 - 5th Semester',
      major: req.body.major || 'Computer Science',
      email: req.body.email || 'alex.vance@campus.edu',
      avatarUrl: req.body.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      updatedAt: FieldValue.serverTimestamp()
    };
    if (db) {
      await db.collection('student_profile').doc('current').set(updatedProfile, { merge: true });
      return res.json({ success: true, ...updatedProfile });
    }
    SEED_DATA.profile = { ...SEED_DATA.profile, ...updatedProfile };
    res.json({ success: true, ...SEED_DATA.profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assignments API
app.get('/api/assignments', async (req, res) => {
  try {
    if (db) {
      const snap = await db.collection('assignments').get();
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(list);
    }
    res.json(SEED_DATA.assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/assignments', async (req, res) => {
  try {
    const newAsgn = {
      title: req.body.title || 'Untitled Assignment',
      course: req.body.course || 'GENERAL',
      dueDate: req.body.dueDate || new Date().toISOString().split('T')[0],
      priority: req.body.priority || 'Medium',
      status: 'Pending',
      points: Number(req.body.points) || 100,
      instructions: req.body.instructions || '',
      createdAt: FieldValue.serverTimestamp()
    };
    if (db) {
      const ref = await db.collection('assignments').add(newAsgn);
      return res.json({ id: ref.id, ...newAsgn });
    }
    const fakeId = 'asgn-' + Date.now();
    SEED_DATA.assignments.push({ id: fakeId, ...newAsgn });
    res.json({ id: fakeId, ...newAsgn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/assignments/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (db) {
      await db.collection('assignments').doc(id).update({ status });
      return res.json({ success: true, id, status });
    }
    const item = SEED_DATA.assignments.find(a => a.id === id);
    if (item) item.status = status;
    res.json({ success: true, id, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/assignments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      await db.collection('assignments').doc(id).delete();
      return res.json({ success: true, id });
    }
    SEED_DATA.assignments = SEED_DATA.assignments.filter(a => a.id !== id);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance API
app.get('/api/attendance', async (req, res) => {
  try {
    if (db) {
      const snap = await db.collection('attendance').get();
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(list);
    }
    res.json(SEED_DATA.attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance/log', async (req, res) => {
  try {
    const { id, isPresent } = req.body;
    if (db) {
      const ref = db.collection('attendance').doc(id);
      const doc = await ref.get();
      if (doc.exists) {
        const data = doc.data();
        const attended = isPresent ? data.attended + 1 : data.attended;
        const total = data.total + 1;
        await ref.update({ attended, total });
        return res.json({ success: true, id, attended, total });
      }
    }
    const item = SEED_DATA.attendance.find(a => a.id === id);
    if (item) {
      if (isPresent) item.attended += 1;
      item.total += 1;
      return res.json({ success: true, id, attended: item.attended, total: item.total });
    }
    res.status(404).json({ error: "Course not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Events API
app.get('/api/events', async (req, res) => {
  try {
    if (db) {
      const snap = await db.collection('events').get();
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(list);
    }
    res.json(SEED_DATA.events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = {
      title: req.body.title || 'Campus Event',
      category: req.body.category || 'Workshop',
      date: req.body.date || new Date().toISOString().split('T')[0],
      time: req.body.time || '10:00 AM',
      location: req.body.location || 'Student Center',
      organizer: req.body.organizer || 'Student Club',
      description: req.body.description || '',
      attendees: 1,
      isRsvped: true,
      createdAt: FieldValue.serverTimestamp()
    };
    if (db) {
      const ref = await db.collection('events').add(newEvent);
      return res.json({ id: ref.id, ...newEvent });
    }
    const fakeId = 'evt-' + Date.now();
    SEED_DATA.events.push({ id: fakeId, ...newEvent });
    res.json({ id: fakeId, ...newEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events/:id/rsvp', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      const ref = db.collection('events').doc(id);
      const doc = await ref.get();
      if (doc.exists) {
        const data = doc.data();
        const isRsvped = !data.isRsvped;
        const attendees = isRsvped ? data.attendees + 1 : Math.max(0, data.attendees - 1);
        await ref.update({ isRsvped, attendees });
        return res.json({ success: true, id, isRsvped, attendees });
      }
    }
    const item = SEED_DATA.events.find(e => e.id === id);
    if (item) {
      item.isRsvped = !item.isRsvped;
      item.attendees = item.isRsvped ? item.attendees + 1 : Math.max(0, item.attendees - 1);
      return res.json({ success: true, id, isRsvped: item.isRsvped, attendees: item.attendees });
    }
    res.status(404).json({ error: "Event not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lost & Found API
app.get('/api/lost-and-found', async (req, res) => {
  try {
    if (db) {
      const snap = await db.collection('lost_found').get();
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(list);
    }
    res.json(SEED_DATA.lostFound);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lost-and-found', async (req, res) => {
  try {
    const newItem = {
      type: req.body.type || 'lost',
      title: req.body.title || 'Lost Item',
      category: req.body.category || 'Personal',
      location: req.body.location || 'Campus Ground',
      date: req.body.date || new Date().toISOString().split('T')[0],
      reward: req.body.reward || 'None',
      status: 'Active',
      contactName: req.body.contactName || 'Student',
      contactEmail: req.body.contactEmail || 'student@campus.edu',
      description: req.body.description || '',
      createdAt: FieldValue.serverTimestamp()
    };
    if (db) {
      const ref = await db.collection('lost_found').add(newItem);
      return res.json({ id: ref.id, ...newItem });
    }
    const fakeId = 'lf-' + Date.now();
    SEED_DATA.lostFound.push({ id: fakeId, ...newItem });
    res.json({ id: fakeId, ...newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/lost-and-found/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    if (db) {
      await db.collection('lost_found').doc(id).update({ status: 'Resolved' });
      return res.json({ success: true, id, status: 'Resolved' });
    }
    const item = SEED_DATA.lostFound.find(i => i.id === id);
    if (item) item.status = 'Resolved';
    res.json({ success: true, id, status: 'Resolved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Marketplace API
app.get('/api/marketplace', async (req, res) => {
  try {
    if (db) {
      const snap = await db.collection('marketplace').get();
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(list);
    }
    res.json(SEED_DATA.marketplace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/marketplace', async (req, res) => {
  try {
    const newItem = {
      title: req.body.title || 'Marketplace Item',
      category: req.body.category || 'General',
      price: Number(req.body.price) || 10,
      condition: req.body.condition || 'Good',
      sellerName: req.body.sellerName || 'Alex Vance',
      sellerRating: 5.0,
      sellerContact: req.body.sellerContact || 'alex.vance@campus.edu',
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600',
      status: 'Available',
      createdAt: FieldValue.serverTimestamp()
    };
    if (db) {
      const ref = await db.collection('marketplace').add(newItem);
      return res.json({ id: ref.id, ...newItem });
    }
    const fakeId = 'mkt-' + Date.now();
    SEED_DATA.marketplace.push({ id: fakeId, ...newItem });
    res.json({ id: fakeId, ...newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CampusMate server running with Firestore API on http://localhost:${PORT}`);
});
