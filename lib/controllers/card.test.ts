import { getCard } from './card';
import * as client from '../client';

jest.mock('../client');

describe('Card', () => {
  describe('getCard', () => {
    it('should return a card', async () => {
      const testCardId = 'test-id';
      const mockSend = jest.fn().mockReturnValue({
        Item: { id: testCardId },
      });
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockSend,
      } as any);
      const res = await getCard(testCardId);

      expect(mockSend).toBeCalled();
      expect(res.id).toBe(testCardId);
    });
  });
});
