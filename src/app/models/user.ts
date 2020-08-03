export class User {
  id: number;
  name: string;
  identification: number;
  email: string;
  // tslint:disable-next-line:variable-name
  my_courses: any[];
  // tslint:disable-next-line:variable-name
  phone_number: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  type: any;
  photo: string;
}

export class User2 {
  // tslint:disable-next-line:variable-name
  access_token: string;
  // tslint:disable-next-line:variable-name
  token_type: string;
  // tslint:disable-next-line:variable-name
  expires_in: number;
  user: User;
}

export interface SlideUser {
  slide_id: number;
  status: string;
  course_id?: number;
  unit_id?: number;
  response_user?: string;
}
