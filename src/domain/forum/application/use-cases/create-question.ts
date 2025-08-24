import { Either, right } from '@/core/either.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { Question } from '@/domain/forum/enterprise/entities/question.js';

import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js';
import { QuestionsRepository } from '../repositories/questions-repository.js';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
