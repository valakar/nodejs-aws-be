export const Tiers = {
    mighty: 'Mighty',
    strong: 'Strong',
    fair: 'Fair',
    poor: 'Poor',
}

export type Product = {
    id?: string,
    title: string,
    price: number,
    count: number,
    image?: string,
    description?: string,
    tier?: string,
    score?: number
};
