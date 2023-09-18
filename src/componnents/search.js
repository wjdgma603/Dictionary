import { useState } from 'react'
import Item from './item';



const Search = ({data, searchData}) => {
    const [searchInput, setSearchInput] = useState();
    const inputTxt = (e)=>{
        setSearchInput(e.target.value);
    }
    const searchFunc = ()=>{
        if(searchInput.length <2){
            alert('2글자 이상 입력해주세요.')
            return;
        }
        searchData(searchInput)
    }
    return (    
        <div className="Search w1200">
            <div className='SearchInput'>
                <div className="SearchinputWrap">
                    <input 
                    className='SearchInput'
                    type="text"
                    defaultValue={searchInput}
                    placeholder="Search"
                    onChange={inputTxt}
                    ></input>
                </div>
                <div className="SearchbtnWrap">
                    <button className="SearchBtn" onClick={searchFunc}>검색</button>
                </div>
            </div>
            <div className='SearchItemWrap'>
                 {data.map((dataItem)=>(
                    <Item 
                    key={dataItem.id} 
                    {...dataItem} />
                ))}
            </div>
        </div>
     );
}
 
export default Search;