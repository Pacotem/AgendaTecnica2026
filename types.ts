export interface Course {
  id: string;
  market: string;
  contactEmail: string;
  focusArea: string;
  audience: string;
  expectedAttendees: string;
  startDate: string;
  duration: string;
  title: string;
  containsWatsonX: boolean;
  isUserGroup: boolean;
  projectedCost: string;
  notes: string;
  requested: string;
  registrationLink?: string;
  parsedDate: Date;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
}