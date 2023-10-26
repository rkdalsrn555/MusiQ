import React, { useEffect } from 'react';
import ShareIcon from '../../../../assets/svgs/ShareIcon.svg';
import LogoImg from '../../../../assets/svgs/logo.svg';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const ShareButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => {
      window.Kakao.init('ecc669106b8e769bf8174197c461f583');
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    window.Kakao.Link.sendDefault(
      {
        objectType: 'feed',
        content: {
          title: '나 10문제 다 맞춤 ㅅㄱ',
          description: '친구의 기록에 도전해보세요',
          imageUrl:
            'https://blog.kakaocdn.net/dn/KSL1k/btqymMhre8M/P0L8qfkVwKgrFvkyac4Ns0/img.jpg',
          link: {
            mobileWebUrl: 'http://localhost:3000/',
            webUrl: 'http://localhost:3000/',
          },
        },
      },
      (res: any) => {
        // 에러 띄우기
        console.log(res);
      },
      (error: any) => {
        console.error(error);
      }
    );
  };
  return (
    <button type="button" onClick={handleShare}>
      <img src={ShareIcon} alt="Share Icon" />
    </button>
  );
};
