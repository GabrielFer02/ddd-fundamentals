import { Question } from '@/domain/forum/enterprise/entities/question.js';

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
}
