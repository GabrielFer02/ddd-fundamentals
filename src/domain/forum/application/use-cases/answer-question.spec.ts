import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js';

import { Answer } from '../../enterprise/entities/answer.js';
import { AnswerQuestionUseCase } from './answer-question.js';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
