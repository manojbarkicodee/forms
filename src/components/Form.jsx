import React,{useState} from 'react'
import axios from "axios"
const Form = () => {
    let[data,setdata]=useState({})
    let getdata=(e)=>{
        // console.log(e)
        let {value,name,checked,type,files}=e.target
setdata({...data,[name]:value})
if(type==="checkbox"){
    setdata({...data,[name]:checked})
}
else if(type==="file"){
    setdata({...data,[name]:files})
}
else if(type==="number"){
    setdata({...data,[name]:Number(value)})
}

else{
    setdata({...data,[name]:value})
}
    }
    let handle=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3004/formdata', {
           ...data
          })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
// console.log(data)
// settabulardata([...tabulardata,data])
    }
    // console.log(data)
  return (
    <div>
        <form className="form" onSubmit={handle}>
            <input onChange={(e)=>getdata(e)} name="name" placeholder='Enter name' type="text" />
            <br />
            <input onChange={(e)=>getdata(e)} name="age" placeholder='Enter age' type="number" />
            <br />
            <input onChange={(e)=>getdata(e)} name="address" placeholder='Enter address' type="text" />
            <br />
            <select onChange={(e)=>getdata(e)} name="department" id="">
                <option value="Production">production</option>
                <option value="Quality">quality</option>
                <option value="Dispatch">dispatch</option>
            </select>
            <br></br>
            <input onChange={(e)=>getdata(e)} name="salary" placeholder='Enter salary' type="number" />
            <br />
            <label htmlFor="">Male</label><input onChange={getdata} name="male" type="checkbox" />
            <br />
            <label htmlFor="">Female</label><input onChange={getdata} name="female" type="checkbox" />
            <br />
            <input onChange={(e)=>getdata(e)} name="file" type="file" />
            <br />
            <input type="submit" value="submit" />
        </form>
    </div>
  )
}

export default Form