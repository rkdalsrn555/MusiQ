import React, { FC, useEffect } from 'react';
import ShareIcon from '../../../../assets/svgs/ShareIcon.svg';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareButtonProps {
  correctAnswerCnt: number;
}

export const ShareButton: FC<ShareButtonProps> = ({ correctAnswerCnt }) => {

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
          title: `나 ${correctAnswerCnt}개나 맞췄지렁이`,
          description: '친구의 기록에 도전해보세요',
          imageUrl: 'https://i3.ruliweb.com/img/22/02/07/17ed283669719ea12.jpg',
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
