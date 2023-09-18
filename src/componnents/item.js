import { useState, useRef, useContext } from "react";
import { Context } from "../App"

const Item = ({id, word, content, createDate, category}) => {
    const {onRemove, onEdit} = useContext(Context)
    // 불러올 내용 = useContext(불러올 원본)
    const textEdit = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [editExplain, setEditExplain] = useState(content);
    const editFunc =()=>{
        setIsEdit(!isEdit)
    }
    const changeFunc = (e)=>{
        setEditExplain(e.target.value)
    }
    const removeFunc = ()=>{
        if(window.confirm(`${word}를 삭제하시겠습니까?`)){
            onRemove(id)
        }
    }
    const saveFunc = ()=>{
        if(editExplain.length < 5){
            alert('설명글은 5자 이상으로 작성해야합니다.')
            textEdit.current.focus();
            return;
        }
        onEdit(id, editExplain)
        setIsEdit(!isEdit) 
    }
    return ( 
        <div className="Item">
            <div>
                <dl>
                    <dt className="title"><h1>{word}</h1><span>({category})</span></dt>
                    {isEdit ?
                    <textarea className="editExplainTxt" spellCheck="false" ref={textEdit} value={editExplain} onChange={changeFunc}></textarea>
                    : <dt className="content"><p>{content}</p><span>등록일 : {createDate}</span></dt> 
                    }
                </dl>
                <div>
                    {isEdit ? 
                    (<div className="itemBtnWrap">
                        <div className="SaveBTN" onClick={saveFunc}></div><div className="CancelBTN" onClick={editFunc}></div>
                    </div>):
                    (<div className="itemBtnWrap">
                        <div className="EditBTN" onClick={editFunc}></div><div className="RemoveBTN" onClick={removeFunc}></div>
                    </div>) 
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Item;