export interface allOrders {
    adminUrl: string
    cashDeskOrder: boolean
    changeTime?: string
    code: string
    company: string
    creationTime?: string
    customerGuid?: any
    email: string
    fullName: string
    id: number
    paid?: any
    paymentMethod?: any
    phone: any
    price: number
    priceCurrencyCode: string
    priceExchangeRate: number
    priceVat: number
    priceWithVat: number
    priceWithoutVat: number
    remark?: any
    shipping?: any
    status: string
    statusId: number
}