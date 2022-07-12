import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Tabular = ({tabulardata,settabulardata}) => {
    let [page,setpage]=useState(1)
    // let page2=useRef(1)
    let total=useRef(0)
    useEffect(() => {
// if(id){
     axios.get(`http://localhost:3004/formdata?_page=${page}&_limit=5`).then((res)=>{
       console.log(res.data)
       total.current=res.headers["x-total-count"]
     settabulardata(res.data)})

// }
    },[page])
    let Ondelete=(id)=>{
        console.log(id)
        axios.delete(`http://localhost:3004/formdata/${id}`).then((res)=>console.log(res.data))
        let deleteddata=tabulardata.filter((el,index)=>el.id!==id)
        settabulardata(deleteddata)
            }
            
            let onfilter=(e)=>{
let value=e.target.value
console.log(value)

axios.get(`http://localhost:3004/formdata?department=${value}&_sort=salary&_order=asc`).then((res)=>{ 
    console.log(res.data)
    // total.current=res.headers["x-total-count"]
     settabulardata(res.data)
})
// axios.get(`http://localhost:3004/formdata?`).then((res)=>settabulardata(res.data))
            }
            // console.log(tabulardata)
            let prev="<<"
            let next=">>"
  return (
    <div className='table'>
        <select onChange={(e)=>onfilter(e)} >
            <option value="Production">Production</option>
            <option value="Quality">Quality</option>
            <option value="Dispatch">Dispath</option>
        </select>
        <table>
            <thead>
            <tr>
                <th>NAME</th>
                <th>AGE</th>
                <th>ADDRESS</th>
                <th>DEPARTMENT</th>
                <th>GENDER</th>
                <th>SALARY</th>
            </tr>
            </thead>
            <tbody>
     {      
tabulardata.map((el)=>(
    <tr key={el.id}>
        <td>{el.name}</td>
        <td>{el.age}</td>
        <td>{el.address}</td>
        <td>{el.department}</td>
        <td>{el.female && "Female"} {el.male && "Male"}</td>
        <td>{el.salary}</td>
        <td><button onClick={()=>Ondelete(el.id)}>delete</button></td>
    </tr>
    
))
  }          
            </tbody>
        </table>

        <button disabled={page<=1} onClick={()=>{setpage(page-1)
       
        }}>{prev}</button><button disabled={page*5>total.current} onClick={()=>{
            
            setpage(page+1)}}>{next}</button>
    </div>
  )
}

export default Tabular