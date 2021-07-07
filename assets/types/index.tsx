// Na vsetky objednavky z API
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


// Na moje pole objednavok po zavolani detailu objednavok
export interface ordersDetail {
    cod_currency_code: string
    cod_price: number
    cod_reference?: any
    creationTime: string
    id?: number
    insurance?: any
    receiver_city: string
    receiver_company: string
    receiver_email: string
    receiver_house_number: number
    receiver_name: string
    receiver_phone: any
    receiver_state_code: string
    receiver_street: string
    receiver_zip: number
    reference_number: number  
}