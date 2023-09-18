import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header>
            <h1><Link to='/'>프론트엔드 사전</Link></h1>
            <nav>
                <ul>
                    <li><Link to='/'>메인</Link></li>
                    <li><Link to='/write'>작성</Link></li>
                    <li><Link to='/search'>검색</Link></li>
                </ul>
            </nav>
        </header>
     );
}
 
export default Header;