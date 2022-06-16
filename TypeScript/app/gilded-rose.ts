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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  isLegendaryItem(name: string):boolean {
    return name === 'Sulfuras, Hand of Ragnaros';
  }

  isBackstagePass(name: string):boolean {
    return name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  isAgedBrie(name: string):boolean {
    return name === 'Aged Brie';
  }

  isBelowMaxQuality(quality: number): boolean {
    return quality < 50;
  }

  isAboveMinQuality(quality: number): boolean {
    return quality > 0;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.isAgedBrie(this.items[i].name) && !this.isBackstagePass(this.items[i].name)) {
        if (this.isAboveMinQuality(this.items[i].quality) && !this.isLegendaryItem(this.items[i].name)) {
            this.items[i].quality = this.items[i].quality - 1;
        }
      } else {
        if (this.isBelowMaxQuality(this.items[i].quality)) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.isBackstagePass(this.items[i].name)) {
            if (this.isBelowMaxQuality(this.items[i].quality) && this.items[i].sellIn < 11) {
              this.items[i].quality = this.items[i].quality + 1;
            }
            if (this.isBelowMaxQuality(this.items[i].quality) && this.items[i].sellIn < 6) {
              this.items[i].quality = this.items[i].quality + 1;
            }
          }
        }
      }
      if (!this.isLegendaryItem(this.items[i].name)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (!this.isAgedBrie(this.items[i].name)) {
          if (!this.isBackstagePass(this.items[i].name)) {
            if (this.isAboveMinQuality(this.items[i].quality) && !this.isLegendaryItem(this.items[i].name)) {
              this.items[i].quality = this.items[i].quality - 1;
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
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
