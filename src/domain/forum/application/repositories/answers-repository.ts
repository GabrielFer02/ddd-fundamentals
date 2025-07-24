import { Answer } from '../forum/enterprise/entities/answer.js';

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
}
