import axios from "axios"

export const moviesApi = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
    headers: {
       Authorization : "Bearer " + process.env.REACT_APP_TMDBKEY
    }
});

export const fetchToken = async () => {
    try {
        const {data} = await moviesApi.get(`authentication/token/new`)
        if(data.success) {
            const token = data.request_token;  
            /* 
                Temporary request token added to Local Storage
            */
            localStorage.setItem("token",token)
            /* 
                Assigning this value, redirects the browser to the specified URL
                window.location.origin = The root domain of your app
                www.google.com  
            */
            window.location.href = `https://www.themoviedb.org/authenticate/${localStorage.getItem("token")}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log("Could not fetch Request Token ", error)
    }
}  

export const fetchSessionID = async() => {
    try {
        // You could data.success here to check if the response, is in the way we want.
        const {data: {session_id}} = await moviesApi.post(`authentication/session/new`, {
            request_token: localStorage.getItem("token")
        });
        localStorage.setItem("session_id", session_id)
        console.log(session_id)
        return session_id;
    } catch(error) {    
        console.log("Could not fetch Session ID", error)
    }
}
 
