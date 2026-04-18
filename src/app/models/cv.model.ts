/**
 * CV Data Models — Type-safe interfaces for portfolio data
 */

export interface Contact {
  label: string;
  href: string;
}

export interface Skill {
  label: string;
  value: string;
}

export interface Experience {
  title: string;
  org: string;
  location: string;
  dates: string;
  stack: string;
  bullets: string[];
  tags: string[];
}

export interface Project {
  title: string;
  links: Link[];
  bullets: string[];
  tags: string[];
}

export interface EnterpriseProject {
  title: string;
  context: string;
  bullets: string[];
  tags: string[];
}

export interface Link {
  label: string;
  href: string;
}

export interface Education {
  degree: string;
  school: string;
  dates: string;
  detail?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dates: string;
  href?: string;
}

export interface Additional {
  languages: string;
  interests: string;
  achievement: string;
}

export interface CV {
  name: string;
  title: string;
  contact: Contact[];
  summary: string;
  skills: Skill[];
  experience: Experience[];
  enterpriseProjects: EnterpriseProject[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  additional: Additional;
}
