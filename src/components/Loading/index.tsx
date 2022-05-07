import { CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className='w-6 h-6 flex justify-center items-center overflow-hidden'>
      <CircleNotch weight='bold' className='2-4 h-4 animate-spin' />
    </div>
  );
}
