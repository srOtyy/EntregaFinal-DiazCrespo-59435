export interface ICourse{
    name:string,
    id:string,
    category: string,
    professor: string,
    classes: string[],
    description: string,
    comissions: IComission[]

}
export interface IComission{
    name: string,
    schedules: string,
    id: string,
}

//usar el Student!
export interface IStudent{
    id:string,
    name: string,
    email:string,
    courses: string[],
    token: string,
    admin?: boolean
}