import { MouseEventHandler } from 'react';
import css from './Card.module.css';

interface CardProps {
  imageURL: string;
  altText: string;
  backImageURL: string;
  backImageAltText: string;
  opened: boolean;
  visible: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const Card = ({
  imageURL,
  altText,
  backImageURL,
  backImageAltText,
  opened,
  onClick,
  visible,
}: CardProps) => {
  return (
    <div
      data-state-matched={visible ? 'visible' : 'hidden'}
      className={css.card}
    >
      <img
        alt={altText}
        loading='eager'
        data-state={opened || !visible ? 'opened' : 'closed'}
        src={imageURL}
        className={`${css.cardFace} ${css.cardFaceFront}`}
      />
      <img
        onClick={onClick}
        className={`${css.cardFaceBack} ${css.cardFace}`}
        data-state={opened || !visible ? 'opened' : 'closed'}
        alt={backImageAltText}
        src={backImageURL}
      />
    </div>
  );
};
