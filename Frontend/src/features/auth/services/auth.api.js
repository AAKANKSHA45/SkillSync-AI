import axios from 'axios';


const api = axios.create({ //creating axios instance so that repeated code can be witten one time only  
    baseURL: "http://localhost:3000",
    withCredentials: true //Allow Axios to send cookies("Include the authentication cookies with this request) along with requests and accept cookies from the backend.Beacuse by default, axios can't send cokkies with req to backend 

})

export async function register({username , email , password}){

    try{
        const response = await api.post("/api/auth/register" ,{
            username , email , password
        })
        return response.data


    }catch(err){
        console.log(err)

    }
}



export async function login({email , password}){
    try{
        const response = await api.post("/api/auth/login" , {
            email , password
        })

        return response.data

    }catch(err){
        console.log(err);
    }
}


export async function logout() {
    try{
        const response = await api.get("/api/auth/logout")

        return response.data


    }catch(err){
        console.log(err);

    }
    
}


export async function getMe(){
    try{
        const response = await api.get("/api/auth/get-me")
        
        return response.data

    }catch(err){
        console.log(err)

    }
    
}





// ----------------------more repeatitive code so above syntax is used :-------------------------------------------
// export async function register({username , email , password}){

//     try{
//         const response = await axios.post("http://localhost:3000/api/auth/register" ,{
//             username , email , password
//         },{
//             withCredentials: true
//         })
//         return response.data


//     }catch(err){
//         console.log(err)

//     }
// }



// export async function login({email , password}){
//     try{
//         const response = await axios.post("http://localhost:3000/api/auth/login" , {
//             email , password
//         },{
//             withCredentials: true 
//         })

//         return response.data

//     }catch(err){
//         console.log(err);
//     }
// }


// export async function logout() {
//     try{
//         const response = await axios.get("http://localhost:3000/api/auth/logout",{
//             withCredentials: true
//         })

//         return response.data


//     }catch(err){
//         console.log(err);

//     }
    
// }


// export async function getMe(){
//     try{
//         const response = await axios.get("http://localhost:3000/api/auth/get-me" , {
//             withCredentials: true
//         })
        
//         return response.data

//     }catch(err){
//         console.log(err)

//     }
    
// }