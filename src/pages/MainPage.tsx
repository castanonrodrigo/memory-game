import { Card } from '../components/Card/Card';
import { Dialog } from '../components/Dialog/Dialog';
import { useMemoryGame } from '../hooks/useMemoryGame';

import nbaLogo from '../assets/nba-logo-transparent-300x300.png';

export const MainPage = () => {
  const {
    cards,
    cardsOpened,
    chooseCard,
    cardsMatched,
    moves,
    reset,
    gameFinished,
  } = useMemoryGame([
    {
      imageURL:
        'https://loodibee.com/wp-content/uploads/nba-philadelphia-76ers-logo-300x300.png',
      altText: 'Philadelphia 76ers logo',
    },
    {
      imageURL:
        'https://loodibee.com/wp-content/uploads/nba-miami-heat-logo-300x300.png',
      altText: 'Miami Heat logo',
    },
    {
      imageURL:
        'https://loodibee.com/wp-content/uploads/nba-golden-state-warriors-logo-2020-300x300.png',
      altText: 'Golden State Warriors logo',
    },
    {
      imageURL:
        'https://loodibee.com/wp-content/uploads/nba-boston-celtics-logo-300x300.png',
      altText: 'Boston Celtics logo',
    },
    {
      imageURL:
        'https://loodibee.com/wp-content/uploads/nba-brooklyn-nets-logo-300x300.png',
      altText: 'Brooklyn Nets logo',
    },
    {
      imageURL:
        'https://loodibee.com/wp-content/uploads/nba-los-angeles-lakers-logo-300x300.png',
      altText: 'Los Angeles Lakers logo',
    },
  ]);

  return (
    <>
      <Dialog
        opened={gameFinished}
        onAction={() => reset()}
        title='Game Finished!'
        actionButtonTitle='New Game'
        description={`Your final score is: ${moves}`}
      />
      <div className='flex flex-col p-10 bg-slate-800 min-h-screen w-full'>
        <div className='text-white flex flex-col items-center justify-start gap-5'>
          <button
            onClick={() => reset()}
            className='border-2 hover:opacity-75 transition-all duration-200 border-white px-4 py-2 rounded'
          >
            New Game
          </button>
          <span>Moves: {moves}</span>
        </div>
        {gameFinished ? null : (
          <div className='grid sm:grid-cols-4 sm:grid-rows-3 grid-cols-3 grid-rows-4 gap-2 sm:w-10/12 md:w-3/4 lg:w-1/2 m-auto items-stretch justify-center'>
            {cards.map((cardData) => (
              <Card
                key={cardData.id}
                imageURL={cardData.imageURL}
                altText={cardData.altText}
                backImageURL={nbaLogo}
                backImageAltText='NBA Logo'
                onClick={() => chooseCard(cardData.id)}
                opened={cardsOpened.includes(cardData.id)}
                visible={!cardsMatched.includes(cardData.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
