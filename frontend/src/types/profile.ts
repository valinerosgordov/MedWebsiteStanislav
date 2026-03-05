export interface EducationEntry {
  id: string;
  institutionName: string;
  specialty: string;
  graduationYear: number;
  diplomaUrl: string | null;
  createdAt: string;
}

export interface RatingDto {
  id: string;
  score: number;
  comment: string | null;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  photoUrl: string | null;
  address: string | null;
  education: string | null;
  workplace: string | null;
  bio: string | null;
  memberNumber: number;
  educationEntries: EducationEntry[];
  averageRating: number;
  ratingsCount: number;
  ratings: RatingDto[];
}

export interface AddRatingRequest {
  score: number;
  comment?: string;
}

export interface UpdateProfileRequest {
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  address: string | null;
  education: string | null;
  workplace: string | null;
  bio: string | null;
}

export interface UserListItem {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  memberNumber: number;
  createdAt: string;
}

export interface AddEducationRequest {
  institutionName: string;
  specialty: string;
  graduationYear: number;
}
