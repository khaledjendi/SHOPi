export class Price {
    constructor(public amount?: number, public formattedPrice?: string, public currencyAbbr?: string, public currency?: string) {
        this.amount = amount;
        this.formattedPrice = formattedPrice;
        this.currencyAbbr = currencyAbbr === "SEK" ? "kr": currencyAbbr;
        this.currency = currency;
    }

    public static getDisountPrice(originalPrice: number, disount: number, currencyAbbr: string) {
        if(!originalPrice || !disount) return;
        return (originalPrice - (originalPrice * (disount / 100))) + " " + currencyAbbr;
    }
}