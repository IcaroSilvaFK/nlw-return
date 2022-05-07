import { useState } from "react";

import { CloseButton } from "../CloseButton";
import {
  FeedBackContentStep,
  FeedBackSuccesccStep,
  FeedBackTypeStep,
} from "./Steps";

import bugImage from "../../assets/largata.png";
import ideaImage from "../../assets/lamapada.png";
import thougghtImage from "../../assets/emoji.png";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImage,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImage,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thougghtImage,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type IFeedBackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<IFeedBackType | null>(null);
  const [feedbackSent, setFeedbackSend] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
  }

  function newFeedback() {
    handleRestartFeedback();
    setFeedbackSend(false);
  }

  if (feedbackSent) {
    return (
      <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto text-slate-100'>
        <header>
          <CloseButton />
        </header>
        <div className='flex flex-col items-center py-10 w-[304px]'>
          <svg
            width='37'
            height='36'
            viewBox='0 0 37 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M36.5 32C36.5 34.209 34.709 36 32.5 36H4.5C2.291 36 0.5 34.209 0.5 32V4C0.5 1.791 2.291 0 4.5 0H32.5C34.709 0 36.5 1.791 36.5 4V32Z'
              fill='#77B255'
            />
            <path
              d='M29.78 6.36202C28.624 5.61102 27.076 5.94002 26.322 7.09802L15.436 23.877L10.407 19.227C9.393 18.289 7.811 18.352 6.874 19.365C5.937 20.379 5.999 21.961 7.013 22.898L14.222 29.564C14.702 30.009 15.312 30.229 15.918 30.229C16.591 30.229 17.452 29.947 18.017 29.09C18.349 28.584 30.517 9.82002 30.517 9.82002C31.268 8.66102 30.938 7.11302 29.78 6.36202Z'
              fill='white'
            />
          </svg>
          <span className='text-xl mt-2'>Agradecemos o feedback</span>

          <button
            className='py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500'
            onClick={newFeedback}
          >
            Quero enviar outro
          </button>
        </div>
        <footer className='text-xs text-neutral-400'>
          Feito com 🖤 pela &nbsp;
          <a href='' className='underline underline-offset-2'>
            Rocketseat
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto text-slate-100'>
      {!feedbackType ? (
        <FeedBackTypeStep setFeedbackType={setFeedbackType} />
      ) : (
        <FeedBackContentStep
          title={feedbackType}
          restartFeddback={handleRestartFeedback}
          infoSubmitForm={setFeedbackSend}
        />
      )}

      <footer className='text-xs text-neutral-400'>
        Feito com 🖤 pela &nbsp;
        <a href='' className='underline underline-offset-2'>
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
