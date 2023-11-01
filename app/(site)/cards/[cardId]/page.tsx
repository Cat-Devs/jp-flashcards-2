import { toKana } from 'wanakana';
import { textToSpeech } from '@/lib/text-to-speech';
import { getCardData } from '@/lib/queries';
import { VariationEnum } from '@/components/types';
import { Card } from '@/components/Card';
import { logHelper } from '@/lib/helpers/log';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ params }: { params: { cardId: string } }) {
  const { data } = await getCardData(params.cardId);

  if (!data?.card) {
    return <div>No card found</div>;
  }

  logHelper(
    'info',
    'Card Page data',
    { id: data.card.id, image: data.card.image && data.card.image.substring(0, 10) },
    '...'
  );
  const audioData = await textToSpeech(`${toKana(data.card.romaji || '')}. ${toKana(data.card.sample || '')}`);
  logHelper('info', 'Card Page audioData', audioData?.[0], '...');

  return (
    <Card data={data.card} frontVariation={VariationEnum.A} backVariation={VariationEnum.B} audioData={audioData} />
  );
}
