import { Either, right } from '@/core/either.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js';

import { Answer } from '../../enterprise/entities/answer.js';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return right({
      answer,
    });
  }
}
