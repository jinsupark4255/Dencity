import React, { useState } from 'react';
import "./nav.css"
import { ReactComponent as Image1 } from './Chaos.svg';
import { ReactComponent as Image2 } from './Weather.svg';
import { ReactComponent as Image3 } from './Dust.svg';
import { ReactComponent as Image4 } from './Community.svg';

function Map() {
  const [color, setColor] = useState({n: 'white', n2: 'white', n3: 'white', n4: 'white'});
  const [fillColor, setFillColor] = useState({n: 'white', n2: 'white', n3: 'white', n4: 'white'});

  const handleClick = (box) => {
    setColor({...color, [box]: 'orange'});
    setFillColor({...fillColor, [box]: 'orange'});
    setTimeout(() => {
      setColor({...color, [box]: 'white'});
      setFillColor({...fillColor, [box]: 'white'});
    }, 200);
  };

  return (
    <div className='mapscale'>
      <div className = 't_nav'>
        <div className='t1'>벡터</div>
        <div className='t2'>고궁/문화유산</div>
        <div className='t3'>경복궁</div>
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
