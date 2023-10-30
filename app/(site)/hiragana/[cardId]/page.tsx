import { Card } from '@/components/Card';
import { VariationEnum } from '@/components/types';
import { textToSpeech } from '@/lib/text-to-speech';
import { getCardData } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { cardId: string } }) {
  const { data } = await getCardData(params.cardId);

  if (!data?.card) {
    return <div>No card found</div>;
  }

  const audioData = await textToSpeech(`${data.card.romaji}. ${data.card.sample}`);

  return (
    <Card data={data.card} frontVariation={VariationEnum.C} backVariation={VariationEnum.A} audioData={audioData} />
  );
}
