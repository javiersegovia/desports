import { SquareFrame } from '@components/UI/Frames/SquareFrame'

export interface IJobPosition {
  title: string
  time: string
  location: string
}

export const JobPosition = ({ position }: { position: IJobPosition }) => {
  const { title, time, location } = position

  return (
    <SquareFrame tw="text-left" shadowColor="cyan">
      <div tw="pt-4 pb-14 px-1 xl:px-5">
        <h6 tw="font-mono font-bold text-cyan-400 uppercase">{title}</h6>
        <p>
          <span>{time}</span> - <span>{location}</span>
        </p>
      </div>
    </SquareFrame>
  )
}
