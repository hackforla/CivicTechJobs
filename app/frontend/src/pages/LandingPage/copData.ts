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
  icon: React.ElementType;
  description: string;
}

const copData: copDatum[] = [
  {
    id: 0, // will be replaced by useID when upgrade to React18+; see #200
    title: "UI/UX",
    icon: CopIconUiux,
    description:
      "The User Interface/User Experience (UI/UX) Community of Practice (CoP) is a space for UI and UX designers and research professionals to share effective practices, and give and receive mentorship, set design and research standards, and to create guides for new projects. Recent meeting topics include how to create a professional online portfolio, a meet and greet with a Hack for LA alum who landed a job at Google, how to effectively network, and training in Figma.",
  },
  {
    id: 1,
    title: "Engineering",
    icon: CopIconEngineering,
    description:
      "The Engineering Community of Practice (CoP) is a space for developers to share effective practices and set development standards and give and receive mentorship. Recent meeting topics include career advancement strategy workshops and “tech talks” with discussions on architecture paradigms, testing, and new technology.",
  },
  {
    id: 2,
    title: "Data Science",
    icon: CopIconData,
    description:
      "The Data Science Community of Practice (CoP) is a space for data science professionals to discuss the current state of the field, share effective practices, give and receive mentorship, and to workshop projects. Recent meeting topics include reviewing popular tools for data analysis, using data science to improve Hack for LA workflows, and presenting research results to peers and leadership for feedback and mentoring.",
  },
  {
    id: 3,
    title: "Project/Product Management",
    icon: CopIconProduct,
    description:
      "The Product Managers (PM) Community of Practice (CoP) is a space for product management professionals to share effective practices, and give and receive mentorship, set product management standards, and to create guides and templates for new projects. Recent meeting topics include a project management focused book club, discussing how to best manage knowledge and issues, and brainstorming solutions to various PM issues.",
  },
  {
    id: 4,
    title: "Ops",
    icon: CopIconOps,
    description:
      "The Operations (Ops) Community of Practice (CoP) is a space for operations professionals to discuss all areas of dev-ops, coordinate infrastructure improvement, and share effective practices, and give and receive mentorship. Recent meeting topics include improving AWS hosting, password vaults, and multi-tenant product architecture.",
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

export { copDatum, fetchCopDataById, fetchAllCopData };
