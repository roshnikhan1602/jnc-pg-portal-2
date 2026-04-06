import ireneImg from "@/assets/faculty/irene.jpg";
import mariaImg from "@/assets/faculty/maria.jpg";

export const facultyData = {
  "Computer Science": [
    {
      id: 1,
      name: "Dr. S. Irene Getzi",
      role: "HoD & Associate Professor",
      qualification: "MCA, MPhil, PhD",
      email: "irenegetzi@jyotinivas.org",
      image: ireneImg,
      bio: "Head of the Department with experience in research and academics.",
      research: ["Artificial Intelligence", "Data Mining"],
    },
    {
      id: 2,
      name: "Ms. Maria John",
      role: "Assistant Professor",
      qualification: "MTech, PhD (Ongoing)",
      email: "mariajohn@jyotinivas.org",
      image: mariaImg,
      bio: "Specializes in software engineering and full stack development.",
      research: ["Web Development", "Cloud Computing"],
    },
  ],
};
