import React, { useState } from 'react';
import "./nav.css"
import { ReactComponent as Image1 } from './Chaos.svg';
import { ReactComponent as Image2 } from './Weather.svg';
import { ReactComponent as Image3 } from './Dust.svg';
import { ReactComponent as Image4 } from './Community.svg';
import backgroundImage from './kakao_map.png';

function Map() {
  const [color, setColor] = useState({n: 'white', n2: 'white', n3: 'white', n4: 'white'});
  const [fillColor, setFillColor] = useState({n: 'white', n2: 'white', n3: 'white', n4: 'white'});
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const handleClick = (box) => {
    setColor({...color, [box]: 'orange'});
    setFillColor({...fillColor, [box]: 'orange'});
    setTimeout(() => {
      setColor({...color, [box]: 'white'});
      setFillColor({...fillColor, [box]: 'white'});
    }, 200);
  };

  const handleDropdownClick1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  }

  const handleDropdownClick2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  }

  return (
    <div className='mapscale'>
        <img src = {backgroundImage} alt = "background" style={{width:"100%",height:"100%"}}/>
      <div className = 't_nav'>
        <div className='t1'>벡터</div>
        <div className='t2' onClick={handleDropdownClick1}>
          고궁/문화유산
          {dropdownOpen1 && (
            <div className="dropdown-menu">
              <div className="dropdown-item">1-ㄴㅇㄹㄴㅇㄹㄴㄹㄴㅇㄹㄴㅇㄹ1</div>
              <div className="dropdown-item">1-ㄴㅇㄹㅇㄹ2</div>
              <div className="dropdown-item">1-3ㄴㅇㄹㄴㅇㄹㄴㅇ</div>
            </div>
          )}
        </div>
        <div className='t3' onClick={handleDropdownClick2}>
          경복궁
          {dropdownOpen2 && (
            <div className="dropdown-menu">
              <div className="dropdown-item">2ㄴㅇㄹㄴㅇㄹ-1</div>
              <div className="dropdown-item">2-ㄴㅇㄹㄴㅇㄹㄹ2</div>
              <div className="dropdown-item">2-ㄹㄹㄹㄹㄹㄹㄹ3</div>
            </div>
          )}
        </div>
        <div className='t4'>이미지</div>
        <div className='t5'>혼잡!</div>
      </div>
      <div className='b_nav'>
        <div className='n' style={{backgroundColor: color.n}} onClick={() => handleClick('n')}><Image1 fill={fillColor.n} className="img-size" /><p className='icon_name'>혼잡도</p></div>
        <div className='n2' style={{backgroundColor: color.n2}} onClick={() => handleClick('n2')}><Image2 fill={fillColor.n2} className="img-size2" /><p className='icon_name'>날씨</p></div>
        <div className='n3' style={{backgroundColor: color.n3}} onClick={() => handleClick('n3')}><Image3 fill={fillColor.n3} className="img-size3" /><p className='icon_name'>미세먼지</p></div>
        <div className='n4' style={{backgroundColor: color.n4}} onClick={() => handleClick('n4')}><Image4 fill={fillColor.n4} className="img-size4" /><p className='icon_name'>커뮤니티</p></div>
      </div>
    </div>
  );
}

export default Map;
