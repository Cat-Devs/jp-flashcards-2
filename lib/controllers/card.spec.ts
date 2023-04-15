import { getCard, getCards } from './card';
import * as client from '../client';
import { CardItem } from '../models/card';

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

    it('should throw an error when the card is not found', async () => {
      const testCardId = 'another-id';
      const mockSend = jest.fn().mockReturnValue({});
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockSend,
      } as any);

      expect.assertions(1);
      await expect(getCard(testCardId)).rejects.toThrowError(`Failed to retrieve card: "${testCardId}"`);
    });
  });

  describe('getCards', () => {
    it('should return a list of cards', async () => {
      const testCard = new CardItem('testCardId');
      const mockScan = jest.fn().mockReturnValue({
        Items: [testCard.toItem()],
      });
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockScan,
      } as any);

      const res = await getCards();

      expect(mockScan).toBeCalled();
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(testCard);
    });

    it('should throw an error when the cards are not found', async () => {
      const mockScan = jest.fn().mockReturnValue({});
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockScan,
      } as any);

      expect.assertions(1);
      await expect(getCards()).rejects.toThrowError(`Failed to retrieve cards`);
    });
  });
});
