export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface PhotoWall {
  photos: string[];
}