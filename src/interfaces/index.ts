/* eslint-disable @typescript-eslint/no-explicit-any */
// export interface TUser {
//   id: string;
//   name: string;
//   email: string;
//   role: "user" | "admin";
// }

export type TUserResponse = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  profileImage?: string;
};
export interface TVocabularyResponse {
  _id: string;
  word: string;
  pronunciation: string;
  whenToSay: string;
  lessonNo: string;
  lessonId?: object;
  adminEmail: string;
}

export interface TLesson {
  _id: string;
  name: string;
  lessonNo: number;
  vocabularies?: any;
}

export interface TVocabulary {
  _id: string;
  word: string;
  pronunciation: string;
  whenToSay: string;
  lessonNo: string;
  lessonId?: string;
  adminEmail: string;
}

export interface TTutorial {
  id: string;
  title: string;
  videoId: string;
  description: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TSidebarItem {
  name: string;
  path: string;
  icon: any;
}

export type TUserJwtPayload = {
  userId: string;
  role: string;
  email: string;
};
