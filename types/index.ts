export type Question = {
  question: string;
  options: string[];
  correct: string;
};

export type Player = {
  id: string;
  name: string;
  wallet: string;
  score: number;
  rank: number;
};

export type Room = {
  id: string;
  topic: string;
  status: 'waiting' | 'started' | 'finished';
  players: Player[];
  questions: Question[];
  createdBy: string;
  startTime?: string;
};
