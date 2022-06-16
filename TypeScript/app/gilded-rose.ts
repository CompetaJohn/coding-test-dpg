export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  quality: {
    min: number;
    max: number;
  }

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.quality = {min: 0, max: 50};
  }

  isLegendaryItem(name: string):boolean {
    return name === 'Sulfuras, Hand of Ragnaros';
  }

  isConjuredItem(name: string):boolean {
    return name === 'Conjured Mana Cake';
  }

  isBackstagePass(name: string):boolean {
    return name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  isAgedBrie(name: string):boolean {
    return name === 'Aged Brie';
  }

  isBelowMaxQuality(quality: number): boolean {
    return quality < this.quality.max;
  }

  isBelowMinQuality(quality: number): boolean {
    return quality < this.quality.min;
  }

  calculateNewSellInDate(item: Item): number {
    return !this.isLegendaryItem(item.name)? item.sellIn - 1 : item.sellIn;
  }

  calculateDegradedQuality(item: Item): number {
    if (this.isLegendaryItem(item.name)) {
      return item.quality;
    }

    const quality = !this.isConjuredItem(item.name)? item.quality -1 : item.quality -2;
    return this.isBelowMinQuality(quality)? this.quality.min : quality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].sellIn = this.calculateNewSellInDate(this.items[i]);

      if (!this.isAgedBrie(this.items[i].name) && !this.isBackstagePass(this.items[i].name)) {
        this.items[i].quality = this.calculateDegradedQuality(this.items[i]);
      } else {
        if (this.isBelowMaxQuality(this.items[i].quality)) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.isBackstagePass(this.items[i].name)) {
            if (this.isBelowMaxQuality(this.items[i].quality) && this.items[i].sellIn < 10) {
              this.items[i].quality = this.items[i].quality + 1;
            }
            if (this.isBelowMaxQuality(this.items[i].quality) && this.items[i].sellIn < 5) {
              this.items[i].quality = this.items[i].quality + 1;
            }
          }
        }
      }
      if (this.items[i].sellIn < 0) {
        if (!this.isAgedBrie(this.items[i].name)) {
          if (!this.isBackstagePass(this.items[i].name)) {
            this.items[i].quality = this.calculateDegradedQuality(this.items[i]);
          } else {
            this.items[i].quality = this.quality.min;
          }
        } else {
          if (this.isBelowMaxQuality(this.items[i].quality)) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
