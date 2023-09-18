import Item from "./item";
import { StateContext } from "../App"
import { useContext, useState } from "react";
const sortList =[
    {value : 'All', name : '전체'},
    {value : 'HTML', name : 'HTML'},
    {value : 'CSS', name : 'CSS'},
    {value : 'JS', name : 'JS'},
    {value : 'NODE', name : 'NODE'},
    {value : 'REACT', name : 'REACT'}
]

const SortSelect = ({value, onChange, sortList})=>{
    return(
        <select className="SortList" value={value} onChange={(e)=>onChange(e.target.value)}>
            {sortList.map((sort)=>(
                <option value={sort.value}>{sort.name}</option>
            ))}
        </select>
    )
}

const List = () => {
    const datas = useContext(StateContext);
    const [sort, setSort] = useState('All'); 
    const getSortList = ()=>{
        const sortcallBack = (item)=>{
            if(sort === "HTML"){
                return item.category === "HTML"
            }else if(sort === "CSS"){
                return item.category === "CSS"
            }else if(sort === "JS"){
                return item.category === "JS"
            }else if(sort === "NODE"){
                return item.category === "NODE"
            }else{
                return item.category === "REACT"
            }        
        }
        const copyList = JSON.parse(JSON.stringify(datas))
        const sortList = sort === 'All' ? copyList : copyList.filter((item)=>sortcallBack(item))
        return sortList;
    }

    return ( 
        <div className="List w1200">
            <div className="ListTitleWrap">
                <h1>단어 리스트</h1>
                <div className="SortWrap">분류 : <SortSelect value={sort} onChange={setSort} sortList={sortList}/></div>
            </div>
            <div>
                <ul>
                    {getSortList().map((data)=>
                        <Item key={data.id} {...data}/>
                    )}
                </ul>
            </div>
        </div>
     );
}
 
export default List;