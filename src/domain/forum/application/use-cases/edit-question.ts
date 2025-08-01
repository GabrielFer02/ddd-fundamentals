import { Question } from '@/domain/forum/enterprise/entities/question.js';

import { QuestionsRepository } from '../repositories/questions-repository.js';

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
