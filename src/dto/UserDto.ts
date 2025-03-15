export interface UserDTO {
  username: string;
  email: string;
  password: string;
  gender: string;
  phone_number?: string;
  profile_picture_url?: string;
  is_verified?: boolean;
  address?: string;
  rating?: number;
  role?: string;
  is_active?: boolean;
  status?: string;
  created_by?: number;
  modified_by?: number;
}
