import { toKana } from 'wanakana';
import { textToSpeech } from '@/lib/text-to-speech';
import { getCardData } from '@/lib/queries';
import { VariationEnum } from '@/components/types';
import { Card } from '@/components/Card';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { cardId: string } }) {
  const { data } = await getCardData(params.cardId);

  if (!data?.card) {
    return <div>No card found</div>;
  }

  const audioData = await textToSpeech(`${toKana(data.card.romaji || '')}. ${toKana(data.card.sample || '')}`);

  return (
    <Card data={data.card} frontVariation={VariationEnum.A} backVariation={VariationEnum.B} audioData={audioData} />
  );
}
