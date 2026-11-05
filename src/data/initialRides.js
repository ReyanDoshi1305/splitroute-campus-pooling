export const INITIAL_RIDES = [
  {
    id: "ride-1",
    host: {
      name: "Aman Sharma",
      dept: "Computer Science, 3rd Yr",
      email: "aman.s@campus.edu",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
      isVerified: true
    },
    origin: "Central Metro Station (Gate 2)",
    destination: "Main Campus (Engineering Block)",
    departureTime: "Today, 08:45 AM",
    departureTimestamp: Date.now() + 1000 * 60 * 45, // in 45 mins
    vehicleType: "Cab / Sedan",
    totalFare: 320,
    totalSeats: 4,
    availableSeats: 2,
    isWomenOnly: false,
    pickupNotes: "Waiting by the cafe next to Gate 2. Uber Premier booked (White Dzire).",
    passengers: [
      { name: "Aman Sharma", email: "aman.s@campus.edu", isHost: true },
      { name: "Rohit Verma", email: "rohit.v@campus.edu", isHost: false }
    ],
    status: "ACTIVE"
  },
  {
    id: "ride-2",
    host: {
      name: "Sneha Patel",
      dept: "Biotech Engineering, 2nd Yr",
      email: "sneha.p@campus.edu",
      phone: "+91 98111 22334",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
      isVerified: true
    },
    origin: "North Hostel Complex",
    destination: "City Center Tech Hub",
    departureTime: "Today, 09:15 AM",
    departureTimestamp: Date.now() + 1000 * 60 * 75,
    vehicleType: "Auto-Rickshaw",
    totalFare: 160,
    totalSeats: 3,
    availableSeats: 1,
    isWomenOnly: true,
    pickupNotes: "Outside Girls Hostel Gate 1. Split equally among 3 people.",
    passengers: [
      { name: "Sneha Patel", email: "sneha.p@campus.edu", isHost: true },
      { name: "Ananya Iyer", email: "ananya.i@campus.edu", isHost: false }
    ],
    status: "ACTIVE"
  },
  {
    id: "ride-3",
    host: {
      name: "Devansh Mehta",
      dept: "Mechanical Dept, 4th Yr",
      email: "devansh.m@campus.edu",
      phone: "+91 97234 56789",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80",
      isVerified: true
    },
    origin: "City Railway Terminal",
    destination: "Campus South Gate (Library)",
    departureTime: "Today, 10:00 AM",
    departureTimestamp: Date.now() + 1000 * 60 * 120,
    vehicleType: "Cab / Sedan",
    totalFare: 400,
    totalSeats: 4,
    availableSeats: 3,
    isWomenOnly: false,
    pickupNotes: "Pickup near Platform 1 prepaid taxi lane. Have two medium luggage bags.",
    passengers: [
      { name: "Devansh Mehta", email: "devansh.m@campus.edu", isHost: true }
    ],
    status: "ACTIVE"
  },
  {
    id: "ride-4",
    host: {
      name: "Rhea Sen",
      dept: "Design & Media, 3rd Yr",
      email: "rhea.s@campus.edu",
      phone: "+91 99000 88776",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      isVerified: true
    },
    origin: "South Extension Circle",
    destination: "Main Campus (Auditorium)",
    departureTime: "Today, 11:30 AM",
    departureTimestamp: Date.now() + 1000 * 60 * 210,
    vehicleType: "Personal Car",
    totalFare: 240,
    totalSeats: 3,
    availableSeats: 0,
    isWomenOnly: true,
    pickupNotes: "Hyundai i20. Driving myself, just splitting fuel cost with 3 fellow students.",
    passengers: [
      { name: "Rhea Sen", email: "rhea.s@campus.edu", isHost: true },
      { name: "Tanvi Roy", email: "tanvi.r@campus.edu", isHost: false },
      { name: "Simran Kaur", email: "simran.k@campus.edu", isHost: false }
    ],
    status: "FULL"
  }
];

export const POPULAR_LOCATIONS = [
  "Central Metro Station (Gate 2)",
  "North Hostel Complex",
  "South Hostel Block B",
  "City Railway Terminal",
  "South Extension Circle",
  "Main Campus (Engineering Block)",
  "Main Campus (Auditorium)",
  "Campus South Gate (Library)",
  "City Center Tech Hub",
  "Student Food Street / Market"
];
