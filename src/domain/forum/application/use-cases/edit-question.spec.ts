import { makeQuestion } from 'test/factories/make-question.js';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js';

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';

import { EditQuestionUseCase } from './edit-question.js';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    });
  });

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(() =>
      sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteúdo teste',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
