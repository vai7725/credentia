export type UsersProps = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  userImage: string;
  status: string;
  role: string;
  clerkid: string;
  isProfileComplete: boolean;
  activePage: number;
  skills: string[];
  yearsOfExperience: string;
  socialLinks: SocialLinksProps[];
  educationDetails: EducationDetailsProps;
  workExperience: WorkExperienceProps[];
  companyDetails: CompanyDetailsProps;
  paperAttempts: PaperAttemptsProps[];
  paperAnswers: PaperAnswersProps[];
  createdAt: Date;
  updatedAt: Date;
  JobPost: JobPostProps[];
  Application: ApplicationProps[];
};

export type SocialLinksProps = {
  id: string;
  title: string;
  link: string;
  userId: string;
};

export type EducationDetailsProps = {
  id: string;
  highestDegree: string;
  fieldOfStudy: string;
  graduationYear: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkExperienceProps = {
  id: string;
  company: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  workDuration: string;
  keyResponsibilities: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyDetailsProps = {
  id: string;
  companyName: string;
  companyDescription: string;
  industry: string;
  companySize: string;
  foundedYear: string;
  companyAddress: string;
  companyAddressCity: string;
  companyAddressCountry: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  companyMissionStatement: string;
  companyCoreValues: string;
  userId: string;
};

export type PaperProps = {
  id: string;
  title: string;
  questions: QuestionProps[];
  company: string;
  approve: boolean;
  createdAt: Date;
  userAttempt: PaperAttemptsProps[];
};

export type QuestionProps = {
  id: string;
  text: string;
  difficulty: string;
  paperId: string;
  options: OptionProps[];
  correctId: string;
  createdAt: Date;
  userAnswer: PaperAnswersProps[];
};

export type OptionProps = {
  id: string;
  text: string;
  questionId: string;
  UserAnswer: PaperAnswersProps[];
};

export type PaperAttemptsProps = {
  id: string;
  userId: string;
  paperId: string;
  score: number;
  createdAt: Date;
};

export type PaperAnswersProps = {
  id: string;
  userId: string;
  questionId: string;
  optionId: string;
  createdAt: Date;
};

export type JobPostProps = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  applications: ApplicationProps[];
};

export type ApplicationProps = {
  id: string;
  jobPostId: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
