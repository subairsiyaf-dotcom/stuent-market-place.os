export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Submitted' | 'Overdue';
  description: string;
  maxScore: number;
}

export interface AttendanceSubject {
  id: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  attended: number;
  total: number;
  minPercentageRequired: number;
  lastUpdated: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Hackathon' | 'Workshop' | 'Cultural' | 'Sports' | 'Club' | 'Career';
  date: string;
  time: string;
  location: string;
  organizer: string;
  rsvpsCount: number;
  isBookmarked: boolean;
  isRsvped: boolean;
  image: string;
  description: string;
}

export interface LostAndFoundItem {
  id: string;
  title: string;
  type: 'Lost' | 'Found';
  category: 'Electronics' | 'Documents/ID' | 'Keys/Wallet' | 'Clothing' | 'Books' | 'Other';
  location: string;
  dateReported: string;
  status: 'Active' | 'Resolved';
  contactPerson: string;
  contactEmail: string;
  description: string;
  reward?: string;
  image: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: 'Textbooks' | 'Electronics' | 'Dorm Gear' | 'Clothing' | 'Bicycles' | 'Lab Kits';
  condition: 'Brand New' | 'Like New' | 'Good' | 'Used';
  sellerName: string;
  sellerRating: number;
  postedDate: string;
  location: string;
  image: string;
  description: string;
  isSaved: boolean;
}

export interface UserProfile {
  name: string;
  studentId: string;
  major: string;
  semester: string;
  avatar: string;
  overallAttendance: number;
  pendingAssignmentsCount: number;
}
