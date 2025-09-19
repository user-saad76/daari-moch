
import { useState ,useEffect} from "react"

  export const useFetch = (url)=>{
    const [data,setData] = useState(null)
    const [error,setError]  = useState(null)
    const [loading,setLoading] = useState(false)


  useEffect(() => {
    const getData = async () => {
       setLoading(true)
     try{
          const res = await fetch(url)
        const data = await res.json();
       setData(data);
        setLoading(false)
     }catch (error){
        setError(error.message || "Something went wrong")
       
     }finally{
           setLoading(false)
     }
    };
   getData();
  }, [url])

  return {
     data,
     error,
     loading
  }
   
}