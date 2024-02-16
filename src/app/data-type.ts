export interface SignUp{
    name:string,
    email:string,
    password:string,
}
export interface Login{
    email:string,
    password:string,
}

export interface product{
    productName:string;
    price:number;
    color:string;
    category:string;
    description:string;
    productUrl:string;
    id:any;
    quantity:number | undefined;
    productId: undefined | string
}
export interface cart{
    category:string;
    color:string;
    description:string;
    id:number | undefined;
    price:number;
    productId:number;
    productName:string;
    productUrl:string;
    quantity:number | undefined;
    userId: string;
}
export interface paymentSummary{
    price:number;
    discount:number;
    gst:number;
    delevery:number;
    total:number;
}
export interface order{
    TotalPayable: number;
    name:string;
    address:string;
    mobileNumber:string;
    userId:string;
    id:string;
}