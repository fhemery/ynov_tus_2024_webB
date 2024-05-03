import { Item, GildedRose } from './gilded-rose';

describe('Gilded Rose', () => {
  it('should return nothing if no item provided', () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items).toEqual([]);
  });

  it('should preserve the item name', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  describe('Regular items', () => {
    it('should decrease regular item quality', () => {
      const gildedRose = new GildedRose([new Item('foo', 50, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(9);
    });

    it('should decrease regular item quality twice as fast when sellIn is negative', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(8);
    });

    it('should not decrease regular item quality below 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 50, 0)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });

    it('should decrease regular item sellIn', () => {
      const gildedRose = new GildedRose([new Item('foo', 50, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(49);
    });
  });

  describe('Regarding sulfuras', () => {
    it('should not change sulfuras sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 50, 80)]);
      const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(50);
    });

    it('should not change sulfuras quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 50, 80)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(80);
    });
  });

  describe('Aged Brie', () => {
    it('should increase Aged Brie quality', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 50, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(11);
    });

    it('should increase Aged Brie quality twice as fast when sellIn is negative', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(12);
    });

    it('should not increase Aged Brie quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 50, 50)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(50);
    });

    it('should decrease Aged Brie sellIn', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 50, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(49);
    });
  });

  describe('Backstage pass', () => {
    it('should increase Backstage pass quality by 1 when sellIn is above 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(11);
    });

    it('should increase Backstage pass quality by 2 when sellIn is 10 or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(12);
    });

    it('should increase Backstage pass quality by 3 when sellIn is 5 or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(13);
    });

    it('should drop Backstage pass quality to 0 when sellIn is negative', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(0);
    });

    it('should decrease Backstage pass sellIn', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 50, 10)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(49);
    });
  });
});
