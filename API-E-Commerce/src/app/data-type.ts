export interface SignUp{
    name:string,
    pwd:string,
    email: string,
    id:number
}
export interface Products{
    productName:string,
    productColor:string,
    productDesc:string,
    productImage:string,
    productCategory:string,
    productPrice:number,
    id:number,
    quantity:undefined| number,
    productId:undefined| number
}

export interface Cart{
    productName:string,
    productColor:string,
    productDesc:string,
    productImage:string,
    productCategory:string,
    productPrice:number,
    id:number | undefined,
    quantity:undefined| number,
    productId:number,
    userId:number
}