'use client';
import { useGetCardQuery } from '@/gql/graphql';
import { Card } from '@/components/Card';

export default function Post() {
  const { data, loading, error } = useGetCardQuery({
    variables: {
      cardId: 'a65df',
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch card data</div>;
  if (!data?.card) return <div>No card found</div>;

  const { card } = data;

  return (
    <div>
      page
      <Card data={card} />
    </div>
  );
}
