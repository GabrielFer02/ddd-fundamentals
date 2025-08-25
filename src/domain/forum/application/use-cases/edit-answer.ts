import { Either, left, right } from '@/core/either.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository.js';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js';
import { Answer } from '@/domain/forum/enterprise/entities/answer.js';

import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js';
import { AnswersRepository } from '../repositories/answers-repository.js';

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    );

    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.attachments = answerAttachmentList;
    answer.content = content;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
