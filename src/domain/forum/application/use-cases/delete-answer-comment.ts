import { Either, left, right } from '@/core/either.js';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository.js';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId,
    );

    if (!answerComment) {
      return left('Answer comment not found.');
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed');
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
