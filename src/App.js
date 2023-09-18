import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useReducer, createContext, useCallback, useRef, useMemo, useState} from 'react';
import Header from './componnents/layout/header';
import Main from './componnents/main';
import Write from './componnents/write';
import Search from './componnents/search';

export const StateContext = createContext(null);
export const Context = createContext(null);


const initState = {
  inputs : {
    word : '',
    content : "",
    category : 'HTML'
  },
  dictionary : [
    {
      id : 1,
      word : 'getTime',
      content : '인스턴스 메서드는 UTC 1970년 1월 1일 초 자정으로 정의되는 epochDate 이후 해당 날짜의 밀리초 수를 반환합니다.',
      category : 'JS',
      createDate : '2023-09-14'
    },
    {
      id : 2,
      word : 'Background-color',
      content : '요소의 배경색을 설정합니다.',
      category : 'HTML',
      createDate : '2023-09-14'
    },
    {
      id : 3,
      word : 'React',
      content : 'JSX(JavaScript 및 XML)라는 HTML-in-JavaScript 구문을 사용합니다. HTML과 JavaScript 모두에 익숙하면 JSX를 배우고 애플리케이션의 버그가 JavaScript와 관련이 있는지 또는 React의 보다 구체적인 도메인과 관련이 있는지 더 잘 식별하는 데 도움이 됩니다.',
      category : 'REACT',
      createDate : '2023-09-14'
    },
  ]
}

const reducer = (state, action)=>{
  switch(action.type){
    case "change" :{
      return{
        ...state,
        inputs:{
          ...state.inputs,
          [action.name] : action.value
        }
      }
    }
    case "create" :
      return{
        inputs : initState.inputs,
        dictionary : state.dictionary.concat(action.dictionary)

    }
    case "edit" :
      return {
        ...state,
        dictionary : state.dictionary.map((item)=>item.id === action.id ? 
        {...item, content : action.content} : item)
    }
    case "remove" :
      return {
        ...state,
        dictionary : state.dictionary.filter((item)=>item.id !== action.id)
    }
    default : 
    return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  // 변수 [state, 액션함수] = useReducer(reducer 함수, 초기값)\

  const {word, content, category} = state.inputs;
  const userID = useRef(4);
  const onCreate = useCallback((word, content, category)=>{
      const createDate = new Date().toISOString().slice(0,10); 
      dispatch({
        type : 'create',
        dictionary : {word, content, category, createDate, id : userID.current} 
      });
      userID.current += 1
  },[word, content, category])

  const onEdit = (id, content)=>{
    dispatch({
      type : "edit",
      id, content
    })
  }
  const onRemove = (id)=>{
    dispatch({
      type : "remove",
      id
    })
  }

  const memorized = useMemo(()=>{
    return{onCreate, onRemove, onEdit}
  },[])
  const {dictionary} = state;
  const data = dictionary;

  const [result, setResult] = useState([]);
  const searchData = (searchInput)=>{
    const newDict = data.filter((dataItem)=>dataItem.word.toLowerCase().includes(searchInput.toLowerCase()) || 
    dataItem.content.toLowerCase().includes(searchInput.toLowerCase()))
    setResult(newDict)
  }
  return (
    <div className="App">
      <Header/>
      <StateContext.Provider value={dictionary}>
        <Context.Provider value={memorized}>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/write' element={<Write/>}></Route>
            <Route path='/search' element={<Search searchData={searchData} data={result}/>}></Route>
          </Routes>
        </Context.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
