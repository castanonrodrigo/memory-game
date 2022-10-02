import { useEffect, useReducer } from 'react';
import { shuffleArray } from '../utils/shuffleArray';

interface Card {
  id: number;
  imageURL: string;
  altText: string;
}

interface GameState {
  cards: Card[];
  moves: number;
  cardsOpened: number[];
  cardsMatched: number[];
}

enum GameActionOptions {
  CHOOSE_CARD,
  RESET,
  CHECK_FOR_MATCH,
}

type Action = {
  type: GameActionOptions;
  payload?: any;
};

const generateCardsList = (
  imageURLs: { imageURL: string; altText: string }[]
): Card[] => {
  const cardsList = imageURLs.map((data, index) => ({
    id: index + 1,
    imageURL: data.imageURL,
    altText: data.altText,
  }));
  return [
    ...cardsList,
    ...cardsList.map((card, index) => ({
      ...card,
      id: cardsList.length + index + 1,
    })),
  ];
};

export const useMemoryGame = (
  imageURLs: { imageURL: string; altText: string }[]
) => {
  const initialState = {
    cards: shuffleArray(generateCardsList(imageURLs)),
    moves: 0,
    cardsOpened: [],
    cardsMatched: [],
  };

  const getCardById = (cards: Card[], id: number) =>
    cards.find((card) => card.id === id);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cards, cardsMatched, cardsOpened, moves } = state;

  function reducer(state: GameState, action: Action): GameState {
    const { cards, cardsOpened, cardsMatched, moves } = state;
    const { payload, type } = action;

    switch (type) {
      case GameActionOptions.RESET:
        return {
          ...state,
          cards: shuffleArray(cards),
          moves: 0,
          cardsOpened: [],
          cardsMatched: [],
        };
      case GameActionOptions.CHECK_FOR_MATCH:
        if (
          getCardById(cards, cardsOpened[0])?.imageURL ===
          getCardById(cards, cardsOpened[1])?.imageURL
        ) {
          return {
            ...state,
            cardsOpened: [],
            cardsMatched: [...cardsMatched, ...cardsOpened],
          };
        } else {
          return { ...state, cardsOpened: [] };
        }
      case GameActionOptions.CHOOSE_CARD:
        if (cardsMatched.includes(payload)) {
          return state;
        }
        if (cardsOpened.length === 2) {
          return state;
        } else if (cardsOpened.length === 1) {
          if (cardsOpened.includes(payload)) {
            return state;
          } else {
            return {
              ...state,
              cardsOpened: [...cardsOpened, payload],
              moves: moves + 1,
            };
          }
        } else {
          return { ...state, cardsOpened: [payload] };
        }
      default:
        return state;
    }
  }

  useEffect(() => {
    if (cardsOpened.length === 2) {
      setTimeout(
        () => dispatch({ type: GameActionOptions.CHECK_FOR_MATCH }),
        500
      );
    }
  }, [cardsOpened]);

  const chooseCard = (cardId: number) =>
    dispatch({ type: GameActionOptions.CHOOSE_CARD, payload: cardId });

  const reset = () => dispatch({ type: GameActionOptions.RESET });

  return {
    reset,
    chooseCard,
    cardsOpened,
    cardsMatched,
    moves,
    cards,
    gameFinished: cardsMatched.length === cards.length,
  };
};
