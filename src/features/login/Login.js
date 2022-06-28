import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import callApi from '../../api';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { ENDPOINT } from '../../constains';
import { login, selectLogin } from './loginSlice';
const Login= ()=>{
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
 // const {token,userId} = useSelector(selectLogin);
  //or
  const {token,userId} = useSelector((state) => state.login)
  const onSubmit =(data)=>{
      setLoading(true)
      callApi(ENDPOINT+`/users/login/auth`,'POST',data,true).then(res=>res.json())
      .then(result=>{
        if(result.success===1){
          let payload ={
            success:true,
            data:JSON.parse(result.data)
          }
          dispatch(login(payload));
          setLoading(false)
          navigate("/home", { replace: true });
        }
      });
  }
  return (
    <div className='w-full max-w-xl mx-auto'>
        <form className='w-full mt-5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-red-400 text-3xl font-semibold text-center py-5 after:bg-black after:block after:w-10 after:h-1 after:mx-auto after:mt-2'>Login App</h2>
            <input type="text" className='w-full p-2 border my-1 outline-none' name="email" placeholder="Enter email" {...register("email",{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
            <input type="text" className='w-full p-2 border my-1 outline-none' name="password" placeholder="Enter password" {...register("password",{ required: true, minLength:8,maxLength: 30 })}/>
            <button type="submit" className='bg-green-500 p-2 mt-1 text-white rounded-sm w-full'>
              <span className='pr-1'><i className="fas fa-sign-in-alt"></i></span>Submit
              {loading && <small className='pl-2 text-blue-700'><i className="fas fa-spinner animate-spin"></i></small>}
            </button>
        </form>
    </div>
  )
}

export default Login