import { QuestionsRepository } from '../repositories/questions-repository.js';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionUseCaseResponse {
  [key: string]: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
