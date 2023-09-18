import React, { useContext } from "react";
import {Context} from "../App"
import useInput from "./hook/useInput"


const Write = () => {
    const [{word, content, category}, onChange, reset] = useInput({
        word : '',
        content : '',
        category : 'HTML'
    });
    const {onCreate} = useContext(Context);
    const onCreateBTN =()=>{
        if(word === undefined){
            alert('단어를 입력해주세요.')
            return;
        }
        if(content === undefined){
            alert('내용을 입력해주세요.')
            return;
        }

        const Cate = category === undefined ? 'HTML' : category
        onCreate(word, content, Cate)
        reset()
    }

    
    return ( 
        <div className="Write w1200">
            <h1>프론트엔드 단어 등록</h1>
            <div className="writeWrap">
                <div className="wordWrap">
                    <input onChange={onChange} name="word" type="text" value={word} placeholder="단어"/>
                    <select name="category" value={category} onChange={onChange}>
                        <option defaultValue={'HTML'}>HTML</option>
                        <option value={'CSS'}>CSS</option>
                        <option value={'JS'}>JS</option>
                        <option value={'NODE'}>NODE</option>
                        <option value={'REACT'}>REACT</option>
                    </select>
                </div>
                <div className="textWrap">
                    <textarea onChange={onChange} name="content" value={content} placeholder="설명글"></textarea>
                </div>
                <div className="WriteSubmitWrap">
                    <button onClick={onCreateBTN}>저장</button>
                </div>
            </div>
        </div>
     );
}
 
export default React.memo(Write);