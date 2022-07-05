import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { ENDPOINT } from '../../constains';
import { useGetInfoMutation } from '../../services';
const Home = () => {
  const {token,userId,success} = useSelector(state=>state.login);
  const [user,setUser] = useState({})
  const [getInfo,{isLoading}] = useGetInfoMutation();
  useEffect(() => {
      let fet_api = true;
      const getInfoUser =  async () => {
          const call = await getInfo(userId,token)
              .then(result=>{
                if(fet_api){
                    console.log("result",result)
                    setUser(JSON.parse(result.data));
                }
                
              })
              .catch((error)=>console.error("get info user",error));   
      }

      //call get user
      getInfoUser();
      return()=>fet_api = false;
  }, [])

  /*
  const getUser= async ()=>{
        return await fetch(ENDPOINT+`/users/${userId}`,{
          method:'POST',
          headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
        });      
  }*/
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