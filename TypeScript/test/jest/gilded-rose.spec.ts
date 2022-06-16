import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Should work for simple items ', () => {
    const item = {
      name: "+5 Dexterity Vest",
      sellIn: 1,
      quality: 4
    }

    const gildedRose = new GildedRose([new Item(item.name, item.sellIn, item.quality)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(3);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(1);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item.name);
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(0);
  });

  it('Should work for legendary items', () => {
    const item0 = {
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 10,
      quality: 80
    }
    const item1 = {
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: -10,
      quality: 80
    }

    const gildedRose = new GildedRose([
      new Item(item0.name, item0.sellIn, item0.quality),
      new Item(item1.name, item1.sellIn, item1.quality)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(item0.name);
    expect(items[0].sellIn).toBe(item0.sellIn);
    expect(items[0].quality).toBe(item0.quality);
    expect(items[1].name).toBe(item1.name);
    expect(items[1].sellIn).toBe(item1.sellIn);
    expect(items[1].quality).toBe(item1.quality);
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
    const ticket = {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 11,
      quality: 5
    }

    const gildedRose = new GildedRose([
      new Item(ticket.name, ticket.sellIn, ticket.quality),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name); //Name should always remain the same
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(6);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(8);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(8);
    expect(items[0].quality).toBe(10);

    //Update until days left is 3 to test
    gildedRose.updateQuality(); //7 days
    gildedRose.updateQuality(); //6 days
    gildedRose.updateQuality(); //5 days
    gildedRose.updateQuality(); //4 days
    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(22);

    //Update until days left is 0 to test
    gildedRose.updateQuality(); //2 days
    gildedRose.updateQuality(); //1 days
    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(31);

    //Watch the quality drop to 0, after the event
    items = gildedRose.updateQuality();
    expect(items[0].name).toBe(ticket.name);
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

});
