import { PaginationParams } from '@/core/repositories/pagination-params.js';
import { Answer } from '@/domain/forum/enterprise/entities/answer.js';

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
