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
  skills?: { Name: string; Description: string }[];
}

const sampleCopData: copDatum[] = [
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
    skills: [
      {
        Name: "Wireframes - low fidelity",
        Description: "Creating basic wireframes to outline design concepts.",
      },
      {
        Name: "Mockups - high fidelity",
        Description: "Designing detailed mockups for user interfaces.",
      },
      {
        Name: "Paper Prototyping",
        Description: "Using paper sketches to prototype designs.",
      },
      {
        Name: "Sketching",
        Description: "Drawing rough sketches to visualize ideas.",
      },
      {
        Name: "Figma prototyping",
        Description: "Creating interactive prototypes using Figma.",
      },
      {
        Name: "Figma components",
        Description: "Building reusable components in Figma.",
      },
      {
        Name: "Figma auto-layout",
        Description:
          "Using auto-layout features in Figma for responsive designs.",
      },
      {
        Name: "HTML/CSS",
        Description: "Writing HTML and CSS for web development.",
      },
      {
        Name: "Information Architecture",
        Description: "Structuring and organizing information effectively.",
      },
      {
        Name: "Design evaluation",
        Description: "Assessing designs for usability and effectiveness.",
      },
      {
        Name: "Design System",
        Description: "Creating a consistent design system for projects.",
      },
      {
        Name: "Group design ideation",
        Description: "Collaborating with teams to brainstorm design ideas.",
      },
      {
        Name: "Responsive design",
        Description:
          "Designing interfaces that adapt to different screen sizes.",
      },
      {
        Name: "Logo design",
        Description: "Creating logos for branding purposes.",
      },
      {
        Name: "Icons, vector graphics, and photos",
        Description: "Designing icons and editing vector graphics or photos.",
      },
      {
        Name: "Accessibility Design",
        Description: "Ensuring designs are accessible to all users.",
      },
      {
        Name: "Accessibility Testing",
        Description:
          "Testing designs for compliance with accessibility standards.",
      },
      {
        Name: "Usability test",
        Description: "Conducting usability tests to gather user feedback.",
      },
      {
        Name: "A/B or multivariate testing",
        Description: "Comparing design variations to determine effectiveness.",
      },
      {
        Name: "Guidance",
        Description: "Providing guidance on design best practices.",
      },
      {
        Name: "Interview",
        Description: "Conducting user interviews to gather insights.",
      },
      {
        Name: "Observation",
        Description: "Observing users to understand their behavior.",
      },
      {
        Name: "Diary studies",
        Description:
          "Collecting user feedback over time through diary studies.",
      },
      { Name: "Survey", Description: "Using surveys to gather user opinions." },
      {
        Name: "Affinity mapping",
        Description: "Organizing ideas and insights using affinity mapping.",
      },
      {
        Name: "Empathy mapping",
        Description: "Understanding user needs through empathy mapping.",
      },
      {
        Name: "Competitive analysis",
        Description: "Analyzing competitors to identify opportunities.",
      },
      {
        Name: "Secondary research",
        Description: "Conducting research using existing data sources.",
      },
      {
        Name: "Web analytics",
        Description: "Using web analytics tools to track user behavior.",
      },
      {
        Name: "Task analysis",
        Description: "Breaking down tasks to understand user workflows.",
      },
      {
        Name: "Card sorting",
        Description: "Organizing content using card sorting techniques.",
      },
      {
        Name: "Tree testing",
        Description: "Testing navigation structures with users.",
      },
      {
        Name: "User persona",
        Description: "Creating user personas to represent target audiences.",
      },
      {
        Name: "Journey mapping",
        Description: "Mapping user journeys to identify pain points.",
      },
      {
        Name: "Participant recruiting/screening",
        Description: "Recruiting and screening participants for studies.",
      },
      {
        Name: "Cognitive walkthrough",
        Description: "Evaluating designs through cognitive walkthroughs.",
      },
      {
        Name: "Expert review",
        Description: "Getting feedback from design experts.",
      },
      {
        Name: "Heuristic evaluation",
        Description: "Assessing designs using heuristic principles.",
      },
      {
        Name: "Research presentation",
        Description: "Presenting research findings to stakeholders.",
      },
      {
        Name: "Research Roadmap",
        Description: "Planning a roadmap for research activities.",
      },
      {
        Name: "Research Plan",
        Description: "Creating a detailed plan for research projects.",
      },
      {
        Name: "Time management",
        Description: "Managing time effectively to meet deadlines.",
      },
      {
        Name: "Collaboration / work with cross-functional team",
        Description: "Collaborating with teams across disciplines.",
      },
      {
        Name: "Communication to present design ideas and solutions",
        Description: "Communicating design ideas effectively.",
      },
      {
        Name: "Handing off design assets to developers",
        Description: "Preparing and sharing design assets with developers.",
      },
      {
        Name: "Adobe Creative Suite",
        Description: "Using Adobe tools for design and editing.",
      },
      {
        Name: "JavaScript",
        Description: "Writing JavaScript for interactive web applications.",
      },
      {
        Name: "InVision",
        Description: "Prototyping and collaborating using InVision.",
      },
      {
        Name: "Knowledge of Git and GitHub",
        Description: "Using Git and GitHub for version control.",
      },
      {
        Name: "Creating design specifications and style guides",
        Description: "Documenting design specifications and guidelines.",
      },
      {
        Name: "Understand Agile methodology",
        Description: "Applying Agile principles to design workflows.",
      },
      {
        Name: "Creating browser extensions for Chrome and Firefox",
        Description: "Developing browser extensions for Chrome and Firefox.",
      },
      {
        Name: "Data analysis",
        Description: "Analyzing data to inform design decisions.",
      },
      {
        Name: "Presentation skills",
        Description: "Delivering effective presentations to stakeholders.",
      },
      {
        Name: "Audit skills",
        Description: "Conducting audits to evaluate design quality.",
      },
      {
        Name: "Research operations",
        Description: "Managing operations for research projects.",
      },
      {
        Name: "Strong motivation",
        Description: "Demonstrating motivation and commitment to tasks.",
      },
      {
        Name: "Work ethic",
        Description: "Maintaining a strong and reliable work ethic.",
      },
      {
        Name: "Google Analytics",
        Description: "Using Google Analytics to track website performance.",
      },
      {
        Name: "Branding",
        Description: "Developing and maintaining brand identity.",
      },
      {
        Name: "Collateral Templates",
        Description: "Creating templates for marketing collateral.",
      },
      {
        Name: "Internal Icon or Emoji Legend",
        Description: "Designing internal icon or emoji legends for teams.",
      },
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
    skills: [
      {
        Name: "JavaScript",
        Description:
          "Programming language for building interactive web applications.",
      },
      {
        Name: "TypeScript",
        Description:
          "A strongly typed superset of JavaScript for scalable applications.",
      },
      {
        Name: "Python",
        Description:
          "A versatile programming language for web, data, and automation.",
      },
      {
        Name: "CSS",
        Description:
          "Stylesheet language for designing web layouts and visuals.",
      },
      {
        Name: "HTML",
        Description: "Markup language for structuring web content.",
      },
      {
        Name: "Markdown",
        Description: "Lightweight markup language for formatting text.",
      },
      {
        Name: "React",
        Description: "JavaScript library for building user interfaces.",
      },
      {
        Name: "Express.js",
        Description: "Web application framework for Node.js.",
      },
      {
        Name: "Django",
        Description: "Python framework for building web applications.",
      },
      {
        Name: "FastApi",
        Description:
          "Python framework for building APIs quickly and efficiently.",
      },
      { Name: "Flask", Description: "Lightweight Python web framework." },
      {
        Name: "Jekyll/Liquid",
        Description: "Static site generator and templating language.",
      },
      {
        Name: "MongoDB",
        Description: "NoSQL database for storing unstructured data.",
      },
      {
        Name: "Postgres",
        Description: "Relational database for structured data storage.",
      },
      {
        Name: "Redis",
        Description:
          "In-memory data store for caching and real-time applications.",
      },
      {
        Name: "Relational Databases",
        Description: "Databases that store data in structured tables.",
      },
      {
        Name: "Nonrelational Data Stores (NoSQL)",
        Description: "Databases for unstructured or semi-structured data.",
      },
      {
        Name: "Database architecture",
        Description: "Designing and structuring databases for efficiency.",
      },
      { Name: "Docker", Description: "Tool for containerizing applications." },
      {
        Name: "AWS/Azure/GCP",
        Description: "Cloud platforms for hosting and managing applications.",
      },
      {
        Name: "CI/CD with GitHub Actions",
        Description: "Automating build, test, and deployment workflows.",
      },
      {
        Name: "DevOps Networking",
        Description: "Managing network configurations in DevOps environments.",
      },
      {
        Name: "Hosting",
        Description: "Deploying applications to servers or cloud platforms.",
      },
      {
        Name: "Deploying",
        Description: "Releasing applications to production environments.",
      },
      {
        Name: "Git (version control)",
        Description: "Version control system for tracking code changes.",
      },
      { Name: "NPM", Description: "Package manager for JavaScript libraries." },
      {
        Name: "Package managers",
        Description: "Tools for managing software dependencies.",
      },
      {
        Name: "Using linters",
        Description:
          "Tools for analyzing code to ensure quality and consistency.",
      },
      {
        Name: "Command-line scripting",
        Description: "Writing scripts to automate tasks in the terminal.",
      },
      {
        Name: "Application Error Monitoring",
        Description: "Tracking and resolving application errors.",
      },
      {
        Name: "DataDog (Error Monitoring)",
        Description: "Monitoring tool for tracking application performance.",
      },
      {
        Name: "Sentry (Error Monitoring)",
        Description: "Error tracking tool for applications.",
      },
      {
        Name: "Agile",
        Description:
          "Project management methodology for iterative development.",
      },
      {
        Name: "Code reviews",
        Description: "Reviewing code for quality and correctness.",
      },
      {
        Name: "Technical writing and documentation",
        Description: "Creating clear and concise technical documentation.",
      },
      {
        Name: "Behavior-Driven Development",
        Description: "Development approach focusing on user behavior.",
      },
      {
        Name: "TDD (Test Driven Development)",
        Description: "Writing tests before implementing code.",
      },
      {
        Name: "DDD (Domain Driven Development)",
        Description: "Designing software based on domain models.",
      },
      {
        Name: "QA Testing",
        Description: "Ensuring software quality through testing.",
      },
      {
        Name: "Automated Testing (unit testing, E2E testing, integration testing)",
        Description: "Using tools to automate software testing.",
      },
      {
        Name: "REST APIs",
        Description: "Building APIs using RESTful principles.",
      },
      { Name: "GraphQL", Description: "Query language for APIs." },
      {
        Name: "Web Accessibility (e.g. WAI, WCAG)",
        Description: "Ensuring web content is accessible to all users.",
      },
      {
        Name: "Web Sockets",
        Description:
          "Enabling real-time communication between client and server.",
      },
      {
        Name: "CORS",
        Description: "Managing cross-origin resource sharing for APIs.",
      },
      {
        Name: "Cookies",
        Description: "Storing small pieces of data in the browser.",
      },
      {
        Name: "Microservices",
        Description: "Architectural style for building modular applications.",
      },
      {
        Name: "Model View Controller",
        Description: "Design pattern for separating application concerns.",
      },
      {
        Name: "Object Relational Mappers (ORMs)",
        Description: "Tools for mapping database tables to objects.",
      },
      {
        Name: "OOP (Object Oriented Programming)",
        Description: "Programming paradigm based on objects.",
      },
      {
        Name: "Data structures",
        Description: "Organizing and storing data efficiently.",
      },
      {
        Name: "Algorithms",
        Description: "Step-by-step procedures for solving problems.",
      },
      {
        Name: "Performance and load testing",
        Description: "Testing applications under heavy usage.",
      },
      {
        Name: "Caching",
        Description: "Storing data temporarily for faster access.",
      },
      {
        Name: "Cryptography",
        Description: "Securing data through encryption.",
      },
      {
        Name: "SSL/TLS",
        Description: "Protocols for securing data transmission.",
      },
      {
        Name: "GitHub Projects",
        Description: "Project management tool within GitHub.",
      },
      {
        Name: "Public Speaking and Communication",
        Description: "Presenting ideas effectively to an audience.",
      },
      {
        Name: "Task Estimation / scoring issues with 'points'",
        Description: "Estimating effort required for tasks.",
      },
      {
        Name: "Diagramming",
        Description: "Creating diagrams to visualize systems or processes.",
      },
      {
        Name: "Content Delivery Networks (CDNs)",
        Description: "Distributing content across multiple servers.",
      },
      {
        Name: "Content Management Systems (CMS)",
        Description: "Platforms for managing digital content.",
      },
      {
        Name: "Filesystems",
        Description: "Organizing and storing files on a system.",
      },
      {
        Name: "HTTP",
        Description: "Protocol for transferring data over the web.",
      },
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
    skills: [
      {
        Name: "Data Transformations",
        Description: "Transforming raw data into usable formats.",
      },
      {
        Name: "Data Wrangling",
        Description: "Cleaning and preparing data for analysis.",
      },
      {
        Name: "Data Exploration",
        Description: "Analyzing data to uncover patterns and insights.",
      },
      {
        Name: "ETL Tools (Apache Airflow..)",
        Description:
          "Extracting, transforming, and loading data using tools like Apache Airflow.",
      },
      {
        Name: "Data Warehouses",
        Description: "Centralized storage systems for structured data.",
      },
      {
        Name: "Big Data Technologies (Apache Hadoop, Spark, Kafka)",
        Description:
          "Using tools like Hadoop, Spark, and Kafka for big data processing.",
      },
      {
        Name: "Cloud Software as a Service (SaaS)",
        Description: "Leveraging cloud-based tools for data analysis.",
      },
      {
        Name: "Metadata Management",
        Description: "Organizing and maintaining metadata for datasets.",
      },
      {
        Name: "Python",
        Description:
          "Programming language for data analysis and machine learning.",
      },
      {
        Name: "R",
        Description: "Statistical programming language for data analysis.",
      },
      {
        Name: "SQL",
        Description:
          "Query language for managing and analyzing relational databases.",
      },
      {
        Name: "Jupyter Notebooks",
        Description:
          "Interactive environment for data analysis and visualization.",
      },
      {
        Name: "Dashboarding/BI Tools",
        Description: "Creating dashboards using business intelligence tools.",
      },
      {
        Name: "Tableau",
        Description: "Visualization tool for creating interactive dashboards.",
      },
      {
        Name: "Power BI",
        Description:
          "Microsoft's business intelligence and visualization tool.",
      },
      {
        Name: "Data Visualizations",
        Description: "Creating visual representations of data.",
      },
      {
        Name: "Accessible Data Visualizations",
        Description:
          "Designing data visualizations that are accessible to all users.",
      },
      {
        Name: "Semiotics",
        Description: "Interpreting signs and symbols in data visualizations.",
      },
      {
        Name: "Geographical Information Services (GIS)",
        Description: "Analyzing spatial data using GIS tools.",
      },
      {
        Name: "Application Programming Interface (API) Data Retrieval",
        Description: "Fetching data from APIs for analysis.",
      },
      {
        Name: "Application Programming Interface (API) Development",
        Description: "Building APIs for data access and integration.",
      },
      {
        Name: "Webscraping",
        Description: "Extracting data from websites using automated tools.",
      },
      {
        Name: "Statistical Model Selection",
        Description: "Choosing appropriate statistical models for analysis.",
      },
      {
        Name: "Statistical Model Interpretation",
        Description: "Interpreting results from statistical models.",
      },
      {
        Name: "Statistics Methods",
        Description: "Applying statistical techniques for data analysis.",
      },
      {
        Name: "Machine Learning (ML)",
        Description:
          "Building predictive models using machine learning techniques.",
      },
      {
        Name: "Supervised Machine Learning (ML)",
        Description: "Training models with labeled data.",
      },
      {
        Name: "Unsupervised Machine Learning (ML)",
        Description: "Finding patterns in unlabeled data.",
      },
      {
        Name: "Git/Version Control",
        Description: "Using Git for version control in data projects.",
      },
      {
        Name: "Documentation",
        Description: "Creating clear documentation for data workflows.",
      },
      {
        Name: "Create a presentation/ present findings to stakeholders",
        Description: "Presenting data insights to stakeholders.",
      },
      {
        Name: "Data model design",
        Description: "Designing data models for analysis and storage.",
      },
      {
        Name: "Analysis Framework Development",
        Description: "Building frameworks for systematic data analysis.",
      },
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
    skills: [
      {
        Name: "6 month work identification",
        Description: "Identifying work priorities for the next six months.",
      },
      {
        Name: "Agenda Setting",
        Description: "Creating agendas for meetings and discussions.",
      },
      {
        Name: "Roadmap Design",
        Description: "Planning and designing product roadmaps.",
      },
      {
        Name: "Strategy",
        Description: "Developing strategies to achieve business goals.",
      },
      {
        Name: "OKR ideation and measurement",
        Description: "Defining and measuring objectives and key results.",
      },
      {
        Name: "Check-ins with the team (face to face)",
        Description: "Conducting regular face-to-face team check-ins.",
      },
      {
        Name: "Follow-ups with the team (asynchronous)",
        Description: "Following up with team members asynchronously.",
      },
      {
        Name: "Onboarding Offboarding",
        Description: "Managing onboarding and offboarding processes.",
      },
      {
        Name: "Recruit New Team Members",
        Description: "Recruiting and integrating new team members.",
      },
      {
        Name: "Managing Team Calendar",
        Description: "Organizing and maintaining the team's calendar.",
      },
      {
        Name: "Stakeholder Management: Organizing Meetings",
        Description: "Scheduling and managing stakeholder meetings.",
      },
      {
        Name: "Stakeholder Management: Slide Deck Template",
        Description: "Creating slide decks for stakeholder presentations.",
      },
      {
        Name: "Professional Written Communication",
        Description: "Writing clear and professional communications.",
      },
      {
        Name: "Minutes of Meeting (MOM)",
        Description: "Documenting meeting minutes for reference.",
      },
      {
        Name: "Crafting User Stories",
        Description: "Writing user stories to define product requirements.",
      },
      {
        Name: "Creation of Product Backlog",
        Description: "Building and maintaining the product backlog.",
      },
      {
        Name: "Define Success Criteria/Metrics (KPIs)",
        Description: "Defining key performance indicators for success.",
      },
      {
        Name: "Requirement Gathering",
        Description: "Collecting and documenting product requirements.",
      },
      {
        Name: "Requirement Coordination",
        Description: "Coordinating requirements across teams.",
      },
      {
        Name: "Issue Creation: General",
        Description:
          "Creating and managing general issues in project tracking tools.",
      },
      {
        Name: "Issue Creation: Epics",
        Description: "Defining and managing epics in project tracking tools.",
      },
      {
        Name: "Issue Labeling: size",
        Description: "Labeling issues based on size or complexity.",
      },
      {
        Name: "Issue Labeling: feature",
        Description: "Categorizing issues as features.",
      },
      {
        Name: "Issue Labeling: Complexity",
        Description: "Labeling issues based on complexity.",
      },
      {
        Name: "Issue Labeling: Role",
        Description: "Assigning roles to issues for accountability.",
      },
      {
        Name: "Milestone Creation",
        Description: "Defining milestones for project tracking.",
      },
      {
        Name: "Milestone Tracking",
        Description: "Monitoring progress toward milestones.",
      },
      {
        Name: "Kanban Management",
        Description: "Managing workflows using Kanban boards.",
      },
      {
        Name: "Cross-Functional Collaboration",
        Description: "Collaborating with teams across different functions.",
      },
      {
        Name: "Leadership",
        Description: "Providing leadership and guidance to teams.",
      },
      {
        Name: "Meeting Scheduling",
        Description: "Scheduling and organizing meetings.",
      },
      {
        Name: "Change Management",
        Description: "Managing changes in projects and processes.",
      },
      {
        Name: "Comparative & Competitive Analysis",
        Description: "Analyzing competitors to identify opportunities.",
      },
      {
        Name: "Hypothesis Testing & Validation",
        Description: "Testing and validating hypotheses for product decisions.",
      },
      {
        Name: "Product Analytics",
        Description: "Analyzing product performance and user behavior.",
      },
      {
        Name: "Usability Testing Recommendation evaluation",
        Description: "Evaluating usability testing recommendations.",
      },
      {
        Name: "Product Launch",
        Description: "Planning and executing product launches.",
      },
      {
        Name: "Product Training and Documentation",
        Description:
          "Creating training materials and documentation for products.",
      },
      {
        Name: "Customer Relationship Management",
        Description: "Managing relationships with customers.",
      },
      {
        Name: "Markdown Formatting",
        Description: "Using Markdown for formatting documents.",
      },
      {
        Name: "Wikis",
        Description: "Creating and maintaining wikis for team knowledge.",
      },
      {
        Name: "Documentation/Google Drive Organization",
        Description: "Organizing documentation in Google Drive.",
      },
      {
        Name: "Document Professionalization (see Design, Collateral Templates)",
        Description: "Professionalizing documents for presentations.",
      },
      {
        Name: "One Sheet Development",
        Description: "Creating one-sheet summaries for stakeholders.",
      },
      {
        Name: "Agile Ceremonies",
        Description:
          "Facilitating Agile ceremonies like stand-ups and retrospectives.",
      },
      {
        Name: "Story Points",
        Description: "Estimating effort using story points.",
      },
      {
        Name: "Acceptance Criteria",
        Description: "Defining acceptance criteria for tasks.",
      },
      {
        Name: "UX Design Principles",
        Description: "Applying UX design principles to product development.",
      },
      {
        Name: "Journey Mapping",
        Description: "Mapping user journeys to improve experiences.",
      },
      {
        Name: "Test Issue Templates",
        Description: "Creating templates for testing issues.",
      },
      {
        Name: "Automation: Mail Merge",
        Description: "Automating email communication using mail merge.",
      },
      {
        Name: "Data Management",
        Description: "Organizing and managing data for projects.",
      },
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
    skills: [
      {
        Name: "IAM structuring",
        Description:
          "Designing and managing Identity and Access Management (IAM) structures.",
      },
      {
        Name: "Terraform",
        Description: "Using Terraform for infrastructure as code.",
      },
      {
        Name: "Docker",
        Description: "Containerizing applications using Docker.",
      },
      {
        Name: "Kubernetes",
        Description: "Orchestrating containers with Kubernetes.",
      },
      {
        Name: "CI/CD",
        Description:
          "Implementing Continuous Integration and Continuous Deployment pipelines.",
      },
      {
        Name: "GitHub Pages",
        Description: "Hosting static sites using GitHub Pages.",
      },
      {
        Name: "Load Balancers",
        Description:
          "Distributing traffic across servers using load balancers.",
      },
      {
        Name: "DNS",
        Description: "Managing Domain Name System (DNS) configurations.",
      },
      {
        Name: "Performance Monitoring",
        Description: "Monitoring application performance and metrics.",
      },
      {
        Name: "Performance Optimization",
        Description: "Improving application performance and efficiency.",
      },
      {
        Name: "Observability",
        Description:
          "Ensuring system observability through logs, metrics, and traces.",
      },
      {
        Name: "Cost Optimization",
        Description: "Reducing costs in cloud and infrastructure usage.",
      },
      {
        Name: "Pen Testing",
        Description:
          "Conducting penetration testing to identify vulnerabilities.",
      },
      {
        Name: "Secret Management",
        Description: "Managing sensitive information securely.",
      },
      {
        Name: "Troubleshooting",
        Description: "Diagnosing and resolving system issues.",
      },
      {
        Name: "Usage Caps",
        Description: "Setting and managing usage limits for resources.",
      },
      {
        Name: "Redis",
        Description: "Using Redis for caching and real-time data storage.",
      },
      {
        Name: "SQL",
        Description: "Querying and managing relational databases.",
      },
      {
        Name: "Capacity Planning",
        Description: "Planning for future resource needs.",
      },
      {
        Name: "Diagramming",
        Description: "Creating diagrams to visualize system architecture.",
      },
      {
        Name: "Python",
        Description: "Using Python for scripting and automation.",
      },
      {
        Name: "Go",
        Description: "Programming with Go for system-level applications.",
      },
      {
        Name: "Automation/Scripting",
        Description: "Automating tasks using scripts.",
      },
      {
        Name: "Glue code",
        Description: "Writing glue code to integrate systems and tools.",
      },
    ],
  },
];

function fetchCopDataById(id: number) {
  for (const item of sampleCopData) {
    if (item.id == id) {
      return item;
    }
  }
}

function fetchCopDataByTitle(title: string) {
  for (const item of sampleCopData) {
    if (item.title == title) {
      return item;
    }
  }
}

function fetchAllCopData() {
  return sampleCopData;
}

export {
  sampleCopData,
  copDatum,
  fetchCopDataById,
  fetchAllCopData,
  fetchCopDataByTitle,
};
