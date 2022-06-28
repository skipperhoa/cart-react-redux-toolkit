import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { ENDPOINT } from '../../constains';
const Home = () => {
  const {token,userId,success} = useSelector(state=>state.login);
  const [id,setId] = useState(userId);
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState({})
  useEffect(() => {
      let mounted = true;
      setLoading(true)
      getUser().then(res=>res.json())
      .then(result =>{
          if(mounted){
            console.log(result)
            setUser(JSON.parse(result.data))
            setLoading(false);
          }
      })
      return()=>mounted=false;
  }, [])

  const getUser= async ()=>{
        return await fetch(ENDPOINT+`/users/${userId}`,{
          method:'POST',
          headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
        });      
  }
  return (
    <div className='container mx-auto mt-5'>
        <h1>UserID:{userId}</h1>
        <h2>Token:{token}</h2>
        <div className='w-full'>
            <h1>Name : {user.name}</h1>
            <h1>Email : {user.email}</h1>
        </div>
    </div>
  )
}

export default Home