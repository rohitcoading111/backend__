import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api/url",               
});

const shortUrl = async (longUrl) => { 
  try {
    const response = await api.post('/shorten', { url: longUrl }); 
    return response.data; 
  } catch (error) {
    console.error("Error shortening the URL:", error);
    throw error;
  }
};

const getAllUrls = async ()=>{
    try {
        const res = await api.get("/allurls");
        return res.data
    } catch (error) {
         console.error("Error fetching URLs:", error);
         throw error;
    }
}

export {
    shortUrl,
    getAllUrls
}
export default api;
