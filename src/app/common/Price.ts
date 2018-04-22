export class Price {
    constructor(public amount?: number, public formattedPrice?: string, public currencyAbbr?: string, public currency?: string) {
        this.amount = amount;
        this.formattedPrice = formattedPrice;
        this.currencyAbbr = currencyAbbr === "SEK" ? "kr": currencyAbbr;
        this.currency = currency;
    }

    public static getDisountPrice(originalPrice: number, disount: number, currencyAbbr: string, decimals?: number) {
        if(!originalPrice || !disount) return;
        decimals = decimals ? decimals : 0;
        return (originalPrice - (originalPrice * (disount / 100))).toFixed(decimals) + " " + currencyAbbr;
    }
}