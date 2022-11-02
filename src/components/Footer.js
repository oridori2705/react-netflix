import React from 'react'
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLinkTitle>넷플릭스 대한민국</FooterLinkTitle>
          <FooterLinkContent>
            <FooterLink href="https://help.netflix.com/ko/node/412">
              넷플릭스 소개
            </FooterLink>
            <FooterLink href="https://help.netflix.com/ko">
              고객 센터
            </FooterLink>
            <FooterLink href="https://help.netflix.com/ko/">
              미디어 센터
            </FooterLink>
            <FooterLink href="https://help.netflix.com/ko/">
              이용 약관
            </FooterLink>
          </FooterLinkContent>
          <FooterDescContainer>
                <FooterDescRights>
                    Netflix Rights Reserved.
                </FooterDescRights>
          </FooterDescContainer>
        </FooterLinkContainer>
      </FooterContent>
    </FooterContainer>
  )
}


const FooterContainer = styled.div`
    display: flex;
    justify-content: center; //전체 공간에서 가운데로 이동시켜준다
    align-items: center; //전체공간에서의 상하에서 가운데로 이동시켜준다.
    padding: 40px 0; //(위, 아래, 좌, 우) 값을 넣는다
    border-top: 1px solid rgb(25.25.25); //약간의 실선을 만들어 구분선으로 보이게한다.
    width : 100%;
    position : relative;
    z-index: 100;
    //@media max-width: 769 뜻은 769px보다 줄어들 때 어떻게 다르게 스타일링 해줄지를 정하는 것
    @media (max-width: 769px) { 
    padding: 20px 20px; //위에서의 padding을 덮어씌워서 사용된다.
    padding-bottom: 30px; 
    }

`
const FooterContent = styled.div``; //통일성을 위해서 만들어줌

const FooterLinkContainer = styled.div`
  width: 500px;

  @media (max-width: 768px) {//768px보다 작아졌을때
    width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  color: gray;
  font-size: 17px;
`;

const FooterLinkContent = styled.div`
  display: flex;
  //space-between 예를 들어 3개의 element가 있으면 좌 중앙 우 로 뛰엄뛰엄 있게하는 기능이다.
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 35px;

  @media (max-width: 768px) {
    margin-top: 26px;
  }
`;

const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 110px;
  margin-bottom: 21px;
  text-decoration: none; //마우스를 올리기전에는 텍스트에 밑줄이 안그어지게

  &:hover { // 마우스를 올리면
    text-decoration: underline; //마우스를 올리면 텍스트에 밑줄이 그어짐
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const FooterDescContainer = styled.div`
  margin-top: 30px; 
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const FooterDescRights = styled.h2`
  color: white;
  font-size: 14px;
  text-align: center;
`;
