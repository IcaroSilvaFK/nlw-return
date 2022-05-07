import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "../Loading";

interface IScreenShotButtonProps {
  image: string | null;
  changeImage: (image: string | null) => void;
}

export function ScreenShotButton({
  changeImage,
  image,
}: IScreenShotButtonProps) {
  const [isTakingScreenShoot, setIsTakingScreenShoot] = useState(false);

  async function handleTackeScreenshot() {
    setIsTakingScreenShoot(true);
    const canvas = await html2canvas(
      document.querySelector("html") as HTMLElement
    );

    const base64image = canvas.toDataURL("image/png");
    changeImage(base64image);
    setIsTakingScreenShoot(false);
  }

  if (image) {
    return (
      <button
        type='button'
        className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
        onClick={() => changeImage(null)}
      >
        <Trash weight='fill'></Trash>
      </button>
    );
  }

  return (
    <button
      type='button'
      className='p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 trnasition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500'
      onClick={handleTackeScreenshot}
    >
      {isTakingScreenShoot ? (
        <Loading />
      ) : (
        <Camera className='w-6 h-6 text-zinc-100' />
      )}
    </button>
  );
}
