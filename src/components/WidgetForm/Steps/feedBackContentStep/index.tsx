import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { CloseButton } from "../../../CloseButton";
import { feedbackTypes, IFeedBackType } from "../..";
import { ArrowLeft } from "phosphor-react";
import { ScreenShotButton } from "../../../ScreenShotButton";
import { toast } from "react-toastify";
import { api } from "../../../../configs/axios";
import { Loading } from "../../../Loading";

interface IFeedBackContentStepProps {
  title: IFeedBackType;
  restartFeddback: () => void;
  infoSubmitForm: (info: boolean) => void;
}

interface IFormProps {
  feedback: string;
}

export function FeedBackContentStep({
  title,
  restartFeddback,
  infoSubmitForm,
}: IFeedBackContentStepProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<IFormProps>();
  const feedbackTypeInfo = feedbackTypes[title];

  const onSubmit: SubmitHandler<IFormProps> = async ({ feedback }) => {
    infoSubmitForm(true);
    setIsSendingFeedback(true);
    if (!feedback) {
      toast.error("Preenchas os campos", {
        draggable: true,
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    try {
      await api.post("feedback", {
        comment: feedback,
        screenshot: image,
        type: feedbackTypeInfo.title.toUpperCase(),
      });
      setIsSendingFeedback(false);
    } catch (e) {
      console.log(e);
    }

    reset();
    setImage(null);
  };

  return (
    <>
      <header>
        <button
          type='button'
          className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'
          onClick={restartFeddback}
        >
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='text-xl leading-6 flex items-center gap-2'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className='w-4'
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form className='my-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none scrolllbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin '
          placeholder='Conte com detalhes oque está acontecendo...'
          {...register("feedback")}
        />
        <footer className='flex gap-2 mt-2'>
          <ScreenShotButton image={image} changeImage={setImage} />
          <button
            type='submit'
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-500
            '
            disabled={!watch("feedback") || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
