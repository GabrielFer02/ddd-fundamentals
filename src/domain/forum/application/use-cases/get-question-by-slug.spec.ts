import { makeQuestion } from 'test/factories/make-question.js';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js';

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { Question } from '@/domain/forum/enterprise/entities/question.js';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js';

import { GetQuestionBySlugUseCase } from './get-question-by-slug.js';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('example-question') });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'example-question',
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
