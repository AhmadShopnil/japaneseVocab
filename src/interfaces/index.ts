export interface TUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface TLesson {
  id: string;
  name: string;
  lessonNumber: number;
  vocabularyCount: number;
}

export interface Vocabulary {
  id: string;
  japaneseWord: string;
  pronunciation: string;
  meaning: string;
  usageContext: string;
  lessonId: string;
}

export interface Tutorial {
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
