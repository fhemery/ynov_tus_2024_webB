export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

interface UpdateStrategy {
    updateItem(item: Item): void;
}

class RegularItemUpdateStrategy implements UpdateStrategy {
    updateItem(item: Item): void {
        if (item.quality > 0) {
            item.quality -= 1
        }
        item.sellIn -= 1;

        if (item.sellIn < 0 && item.quality > 0) {
            item.quality -= 1
        }
    }
}

class ConjuredItemUpdateStrategy implements UpdateStrategy {
    updateItem(item: Item): void {
        // new code
    }

}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const itemName = item.name;

            // let strategy = null;
            // switch(item.name) {
            //    case AGED_BRIE:
            //        strategy = new AgedBrieUpdateStrategy();
            //        break;
            // ...
            // }
            // strategy.update();

            if (itemName === SULFURAS) {
                continue;
            }

            if (itemName === AGED_BRIE) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
                item.sellIn = item.sellIn - 1;

                if (item.sellIn < 0) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }

                continue;
            }

            if (itemName === BACKSTAGE_PASS) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                    if (itemName == BACKSTAGE_PASS) {
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                    }
                }
                item.sellIn = item.sellIn - 1;

                if (item.sellIn < 0) {
                    item.quality = item.quality - item.quality
                }

                continue;
            }

            const strategy = new RegularItemUpdateStrategy();
            strategy.updateItem(item);
        }

        return this.items;
    }
}
