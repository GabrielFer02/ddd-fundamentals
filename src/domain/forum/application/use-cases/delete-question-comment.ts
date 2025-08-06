import { Either, left, right } from '@/core/either.js';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository.js';

import { NotAllowedError } from './errors/not-allowed-error.js';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId,
    );

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
