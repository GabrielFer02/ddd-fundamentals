import { makeAnswer } from 'test/factories/make-answer.js';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js';

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer.js';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
        }),
      );
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
