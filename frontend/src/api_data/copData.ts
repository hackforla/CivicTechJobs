import {
  CopIconData,
  CopIconEngineering,
  CopIconOps,
  CopIconProduct,
  CopIconUiux,
} from "assets/images/images";

interface copDatum {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  roles: string[];
}

const copData: copDatum[] = [
  {
    id: 0, // will be replaced by useID when upgrade to React18+; see #200
    title: "UI/UX",
    subtitle: "UX Design and Writing",
    icon: CopIconUiux,
    description:
      "The User Interface/User Experience (UI/UX) Community of Practice (CoP) is a space for UI and UX designers and research professionals to share effective practices, and give and receive mentorship, set design and research standards, and to create guides for new projects. Recent meeting topics include how to create a professional online portfolio, a meet and greet with a Hack for LA alum who landed a job at Google, how to effectively network, and training in Figma.",
    roles: [
      "UI/UX Designer",
      "UX Researcher",
      "UX Writing",
      "UX Practice Lead",
    ],
  },
  {
    id: 1,
    title: "Engineering",
    subtitle: "Frontend and Backend",
    icon: CopIconEngineering,
    description:
      "The Engineering Community of Practice (CoP) is a space for developers to share effective practices and set development standards and give and receive mentorship. Recent meeting topics include career advancement strategy workshops and “tech talks” with discussions on architecture paradigms, testing, and new technology.",
    roles: [
      "Back End Developer",
      "Front End Developer",
      "Full Stack Developer",
      "Engineering Practice Lead",
    ],
  },
  {
    id: 2,
    title: "Data Science",
    subtitle: "",
    icon: CopIconData,
    description:
      "The Data Science Community of Practice (CoP) is a space for data science professionals to discuss the current state of the field, share effective practices, give and receive mentorship, and to workshop projects. Recent meeting topics include reviewing popular tools for data analysis, using data science to improve Hack for LA workflows, and presenting research results to peers and leadership for feedback and mentoring.",
    roles: [
      "Data Scientist",
      "Data Analyst",
      "Data Engineer",
      "Data Science Practice Lead",
    ],
  },
  {
    id: 3,
    title: "Project/Product Management",
    subtitle: "Planning and Organization",
    icon: CopIconProduct,
    description:
      "The Product Managers (PM) Community of Practice (CoP) is a space for product management professionals to share effective practices, and give and receive mentorship, set product management standards, and to create guides and templates for new projects. Recent meeting topics include a project management focused book club, discussing how to best manage knowledge and issues, and brainstorming solutions to various PM issues.",
    roles: [
      "Product Manager",
      "Project Manager",
      "Business Analyst",
      "Product Owner",
      "Special Projects Coordinator",
      "Product Management Practice Lead",
    ],
  },
  {
    id: 4,
    title: "DevOps",
    subtitle: "Dev and IT Operations",
    icon: CopIconOps,
    description:
      "The Operations (Ops) Community of Practice (CoP) is a space for operations professionals to discuss all areas of dev-ops, coordinate infrastructure improvement, and share effective practices, and give and receive mentorship. Recent meeting topics include improving AWS hosting, password vaults, and multi-tenant product architecture.",
    roles: [
      "Site Reliability Engineer",
      "Data Engineer",
      "Database Architect",
      "Security Engineer",
      "DevOps Practice Lead",
    ],
  },
];

function fetchCopDataById(id: number) {
  for (const item of copData) {
    if (item.id == id) {
      return item;
    }
  }
}

function fetchAllCopData() {
  return copData;
}

export { copData, copDatum, fetchCopDataById, fetchAllCopData };
