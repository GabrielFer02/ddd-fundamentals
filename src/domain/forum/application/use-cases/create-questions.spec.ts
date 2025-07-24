import { Question } from '../../enterprise/entities/question.js';
import { QuestionsRepository } from '../repositories/questions-repository.js';
import { CreateQuestionUseCase } from './create-question.js';

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
};

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  });

  expect(question.id).toBeTruthy();
});
