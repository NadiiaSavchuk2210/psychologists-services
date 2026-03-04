import type { Psychologist } from '../../model/types/psychologist';

interface Props {
  data: Psychologist;
}

const PsychologistCard = ({ data }: Props) => {
  console.log(data);

  return <div>{data.id}</div>;
};

export default PsychologistCard;
