import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Should work for simple items ', () => {
    const item = {
      name: "+5 Dexterity Vest",
      sellIn: 10,
      quality: 20
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(item.sellIn - 1);
    expect(items[0].quality).toBe(item.quality-1);
  });

  it('Should work for legendary items that are in date', () => {
    const item = {
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 10,
      quality: 80
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(item.sellIn);
    expect(items[0].quality).toBe(item.quality);
  });

  it('Should work for legendary items that are out of  date', () => {
    const item = {
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: -10,
      quality: 80
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(item.sellIn);
    expect(items[0].quality).toBe(item.quality);
  });

  it('Should work for "Aged Brie" in date ', () => {
    const item = {
      name: "Aged Brie",
      sellIn: 10,
      quality: 40
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(item.sellIn - 1);
    expect(items[0].quality).toBe(item.quality + 1);
  });

  it('Should work for "Aged Brie" past sellIn date ', () => {
    const item = {
      name: "Aged Brie",
      sellIn: -1,
      quality: 40
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(item.sellIn - 1);
    expect(items[0].quality).toBe(item.quality + 2);
  });
});
