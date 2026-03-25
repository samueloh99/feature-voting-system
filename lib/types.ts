export type Feature = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: { votes: number };
  userVoted: boolean;
};
