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
}