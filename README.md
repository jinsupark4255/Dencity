# Dencity

이 서비스는 서울시 공공데이터를 사용하여 서울의 여러 장소의 혼잡도, 날씨, 미세먼지 농도를 보여줍니다.
**데모페이지** --> likelion-hackathon.vercel.app

<img src="https://postimg.cc/9zY12X3w">

- 서울시 장소
  1. 가산디지털단지역
  2. 강남역
  3. 서울역
  4. 성수 카페거리
  5. 시청광장
  6. 신촌,이대역
  7. 여의도
  8. 잠실종합운동장
  9. 창덕궁,종묘
  10. 홍대입구역 9번 출구

## 요구사항

- 서울시 장소
  - 버튼을 클릭, 터치하여 10개의 서울 지역 중 한군데를 선택한다.

    
- Map
  - 서울시 장소 중 한군데를 선택하면 해당 위치를 카카오맵을 사용하여 보여준다.
  - 기본적으로 드래그나 줌인아웃은 가능하지만 클릭하여 정보를 알 수는 없다.


- 혼잡도
  - 실시간 인구
    - 여유
    - 보통
    - 약간 혼잡
    - 혼잡

      
- 연령대별 비율
  - 10대 이하
  - 20대
  - 30대
  - 40대
  - 50대
  - 60대 이상

    
- 성별 비율
  - 남성 / 여성


## Trouble Shooting

### 1. 카카오 로그인

카카오 로그인을 사용하여 개인 정보를 저장하려고 했다.
하지만 카카오 로그인을 하려면 localhost를 등록해야 했고 배포를 할때에는 배포 url을 입력해야 하는데 해당 방법을 몰랐어서 시간이 꽤 걸렸다.

### 캐러셀 라이브러리

1. React-Slick
2. React-Material-Ui-Carousel
3. React Responsive Carousel

제일 정리가 잘 되어있고 사람들이 가장 많이 사용하는 1번 React-Slick을 통해 구현하였다.

그렇게 구현하던중 문제점이 발생하였다.

```js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainCarousel(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
```

구조는 이렇게 되어있고, settings에는 dots를 표시할건지, 슬라이드를 한 번에 넘길때 몇개를 넘길지, 몇개를 보여줄지, 슬라이드를 넘기는 속도 등등 엄청 다양한 옵션이 있다.

`Slider`태그로 감싸져있는 `div`태그들 안에 `img`태그를 넣는 방식이 일반적인데 내가 기존에 구현하려는 방식은



위와 같이 `img`태그를 배경으로 삼아 그 안에서 `flex`를 여러번 사용하여 레이아웃을 배치하였는데 캐러셀에서는 `div`태그가 그 역할을 한다.

그러나 div태그에 여러 버튼들과 문구들을 넣으려니 들어가지 않았고, css 속성도 먹히지 않아서 고민하면서 GPT에 물어보니 답변은

`react-slick`의 다양한 메서드를 이용하라고 알려준다.

결국, 요소들을 하나의 컴포넌트 안에서 정렬하는 것은 불가능하고 따로 배치하여 `position`을 `absolute`값을 주어서 해결하였다.

하지만 그닥 올바른 방법이 아닌 것 같다고 느낄만큼 불편하다는 느낌이 들었다. 좀 더 깔끔한 방법을 찾으려면 차라리 라이브러리 없이 직접 구현하여 커스텀 하는 방향이 더 쉬울 것 같다는 생각이 들었다.

근데 여전히 문제는 초기에 슬라이드를 넘길때 아주 미세하게 깜빡인다는 점과 슬라이드를 넘기면서 전의 이미지와 다음의 이미지가 부드럽게 이어져야 하는데 다음의 이미지가 나오고 또 다음의 이미지가 겹쳐서 나오는 문제가 있다.

문제를 해결하는 방식을 하나씩 살펴보자

### 슬라이드를 깜빡이지 않고 부드럽게 넘기기

react-slick 라이브러리의 특성상 이미지 슬라이드는 라이브러리가 제공하는 기능에 의해 자동으로 변경된다.

따라서 지금보고 있는 이미지를 따로 `useState`로 관리되는 변수를 통해 제어하여야 한다.

```js
const [id, setId] = useState(0);

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // 애니메이션이 진행 중 일때
  beforeChange: (current, next) => {
    if (current - next === -5 || current - next === 1) {
      setId((prevId) => (prevId === 0 ? 5 : prevId - 1));
    } else {
      setId((prevId) => (prevId + 1) % 6);
    }
  },
  nextArrow: (
    <NextButton>
      <img src="/img/next.png" alt="" />
    </NextButton>
  ),
  prevArrow: (
    <BackButton>
      <img src="/img/back.png" alt="" />
    </BackButton>
  ),
};
```

`setId`는 `useState` 변경 함수 답게 상태 변경이 즉시 발생하는 것이 아니라 비동기적으로 처리된다. 즉, 상태 변경 요청을 한 후, 리액트가 상태를 업데이트하고 리렌더링을 수행하는 데에는 약간의 시간이 걸린다.

`beforeChange는` 슬라이드가 바뀌기 전에 호출되므로, 클릭 이벤트로 인해 상태가 변경되기 전에 호출된다.

`beforeChange` 함수는 (current,next)인자를 가지고 current : 이전 슬라이드의 인덱스, next : 다음 슬라이드의 인덱스를 나타내므로 beforeChange 내부에서 setId를 호출하면, 슬라이드가 실제로 바뀌기 전에 id 상태가 업데이트되는 것을 보장할 수 있다.

### img를 어둡게 처리하기

img를 어둡게 처리하는 방법에는 크게 두가지 방식이 존재한다.

img태그의 흐림 속성을 직접 적용하는 방법과 **div태그에 background 이미지를 삽입하고, 흐림 속성을 적용하는 방법**이 있다.

이전에는 후자의 방법을 이용하여서 똑같이 img 태그 바깥의 div태그에 background에 이미지를 넣고 속성을 적용해보자.

```js
const Background = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.img});
  background-size: cover;
  height: 800px;
`;

export default function SelectBackgroundStyledComponents({ img }) {
  return <Background img={img} />;
}
```

추가적으로 캐러셀에서 제공하는 prev, next버튼을 지우고 싶다면

```
export const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 1;
    display: none;
  }
`;
```

위와 같이 제거해 줘야 한다.

### 2. 이벤트 처리 방식과 클로저 함수

```js
import { useState } from "react";

function ResMenuGroup({ selected, target, id, foodtarget2, averageprice }) {
  let priceflag;
  return (
    <ResMenuWrapper>
      {Object.entries(target[0][1].menu).map(([key, value], index) => {
        const foodregex = /(tteokbokki|pork)/gi;
        priceflag = foodregex.test(value.name.toLowerCase());
        return (
          <MenuAverageContainer
            onClick={() => {
              if (priceflag) {
                //
              } else {
                //
              }
            }}
          ></MenuAverageContainer>
        );
      })}
    </ResMenuWrapper>
  );
}
export default ResMenuGroup;
```

반복문안에서 변하는 `priceflag`를 전역적으로 선언하였다.

하지만 원하는 결과값이 나오지 않았고 확인해보니 항상 false값을 가지는 것을 발견하였다.

```js
import { useState } from "react";

function ResMenuGroup({ selected, target, id, foodtarget2, averageprice }) {
  return (
    <ResMenuWrapper>
      {Object.entries(target[0][1].menu).map(([key, value], index) => {
        const foodregex = /(tteokbokki|pork)/gi;
        let priceflag = foodregex.test(value.name.toLowerCase());
        return (
          <MenuAverageContainer
            onClick={() => {
              if (priceflag) {
                //
              } else {
                //
              }
            }}
          ></MenuAverageContainer>
        );
      })}
    </ResMenuWrapper>
  );
}
export default ResMenuGroup;
```

그리고 `priceflag`를 전역적으로 선언하지 않고 안에서 선언해봤더니 값이 조건에 맞게 true or false에 맞게 이벤트가 잘 동작되었다.

이유가 뭘까?

## 참고자료

https://velog.io/@owlsuri/React-slick-Custom
