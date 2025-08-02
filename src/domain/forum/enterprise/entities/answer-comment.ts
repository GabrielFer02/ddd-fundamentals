import { Entity } from '@/core/entities/entity.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { Optional } from '@/core/types/optional.js';

import { Comment, CommentProps } from './comment.js';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return answerComment;
  }
}
