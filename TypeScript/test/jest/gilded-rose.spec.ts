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

  it('Should work for "Aged Brie" ', () => {
    const item = {
      name: "Aged Brie",
      sellIn: 2,
      quality: 43
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(44);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(45);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(47);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(49);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(-3);
    expect(items[0].quality).toBe(50);
  });

  it('Should work for "Backstage Passes" ', () => {
    const ticket = {name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 46}

    const gildedRose = new GildedRose([
      new Item(ticket.name, ticket.sellIn, ticket.quality),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name); //Name should always remain the same
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(47);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(49);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(8);
    expect(items[0].quality).toBe(50);
    //Update to day of sale
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(50);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

});
