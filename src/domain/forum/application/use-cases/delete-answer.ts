import { Either, left, right } from '@/core/either.js';

import { AnswersRepository } from '../repositories/answers-repository.js';
import { NotAllowedError } from './errors/not-allowed-error.js';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}
