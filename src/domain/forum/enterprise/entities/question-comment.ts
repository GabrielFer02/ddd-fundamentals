import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { Optional } from '@/core/types/optional.js';

import { Comment, CommentProps } from './comment.js';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return questionComment;
  }
}
