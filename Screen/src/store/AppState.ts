export type User = {
    idnum:number
    name:string
    age:string
    email:string
    password:string
    bk_id:number
    bk_name:string
}

export type AppState={
    loggedIn:boolean
    loggedUser:User
}