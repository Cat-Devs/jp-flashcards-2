import Image from 'next/image';

interface Props {
  imageData: string;
}

export const CardImage = ({ imageData }: Props) => {
  const dataUrl = `data:image/jpeg;base64,${imageData}`;
  return <Image src={dataUrl} alt="Japanese Image" width={400} height={400} />;
};
