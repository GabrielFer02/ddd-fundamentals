import { makeAnswer } from 'test/factories/make-answer.js';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js';

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';

import { EditAnswerUseCase } from './edit-answer.js';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteúdo teste',
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    });
  });

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: 'author-2',
        content: 'Conteúdo teste',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
