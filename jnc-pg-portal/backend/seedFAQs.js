import mongoose from "mongoose";
import dotenv from "dotenv";
import FAQ from "./models/FAQ.js";

dotenv.config();

const faqs = [
  {
    question: "Courses offered",
    answer: "Jyoti Nivas PG College offers MCA, MBA and other postgraduate programs.",
    keywords: ["courses", "programs", "degree"]
  },
  {
    question: "Admission process",
    answer: "Admissions are done through online application and merit-based selection.",
    keywords: ["admission", "apply", "join"]
  },
  {
    question: "Eligibility",
    answer: "Eligibility depends on the course. Generally, a bachelor's degree is required.",
    keywords: ["eligibility", "criteria", "qualification"]
  },
  {
    question: "Placement",
    answer: "Top companies visit the campus every year with strong placement support.",
    keywords: ["placement", "jobs", "companies"]
  },
  {
    question: "Fees",
    answer: "Fee structure varies by course. Please contact admin office for details.",
    keywords: ["fees", "cost", "price"]
  },
  {
    question: "Location",
    answer: "Jyoti Nivas PG College is located in Bangalore.",
    keywords: ["location", "address", "where"]
  },
  {
    question: "Hostel",
    answer: "Hostel facilities are available with good amenities.",
    keywords: ["hostel", "accommodation", "stay"]
  },
  {
    question: "Library",
    answer: "The college has a well-equipped library with academic resources.",
    keywords: ["library", "books", "study"]
  },
  {
    question: "Faculty",
    answer: "Experienced and qualified faculty members guide students.",
    keywords: ["faculty", "teachers", "staff"]
  },
  {
    question: "Internships",
    answer: "Students are provided internship opportunities through placement cell.",
    keywords: ["internship", "training"]
  },
  {
    question: "Contact",
    answer: "You can contact via email or visit the college office.",
    keywords: ["contact", "phone", "email"]
  },
  {
    question: "Working hours",
    answer: "College operates from 9 AM to 5 PM on weekdays.",
    keywords: ["timing", "hours", "open"]
  },
  {
    question: "Campus",
    answer: "The campus is well-equipped with modern infrastructure.",
    keywords: ["campus", "infrastructure"]
  },
  {
    question: "WiFi",
    answer: "WiFi is available for students inside campus.",
    keywords: ["wifi", "internet"]
  },
  {
    question: "Scholarships",
    answer: "Scholarships are available based on merit and eligibility.",
    keywords: ["scholarship", "financial aid"]
  },
  {
    question: "Exams",
    answer: "Exams are conducted semester-wise.",
    keywords: ["exam", "semester", "test"]
  },
  {
    question: "Attendance",
    answer: "Minimum attendance is required as per university rules.",
    keywords: ["attendance", "presence"]
  },
  {
    question: "Transport",
    answer: "Transport facility is available for students.",
    keywords: ["bus", "transport"]
  },
  {
    question: "Canteen",
    answer: "A hygienic canteen is available on campus.",
    keywords: ["canteen", "food"]
  },
  {
    question: "Sports",
    answer: "Sports and extracurricular activities are encouraged.",
    keywords: ["sports", "games"]
  },
  {
    question: "Events",
    answer: "The college conducts cultural and technical events regularly.",
    keywords: ["events", "fest"]
  },
  {
    question: "Departments",
    answer: "Multiple departments offer diverse academic programs.",
    keywords: ["departments", "branches"]
  },
  {
    question: "Labs",
    answer: "Modern laboratories are available for practical learning.",
    keywords: ["labs", "practical"]
  },
  {
    question: "Results",
    answer: "Results are published on the official portal.",
    keywords: ["results", "marks"]
  },
  {
    question: "Certificates",
    answer: "Certificates are issued after course completion.",
    keywords: ["certificate", "degree"]
  },
  {
    question: "Alumni",
    answer: "Strong alumni network supports students.",
    keywords: ["alumni", "graduates"]
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await FAQ.deleteMany(); // optional reset
    await FAQ.insertMany(faqs);

    console.log("FAQs inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();