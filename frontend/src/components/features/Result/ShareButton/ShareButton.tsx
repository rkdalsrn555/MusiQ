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
    // 맞춘 개수에 따라 다르게 대사를 출력해주자
    let titleMessage = ''; // titleMessage를 동적으로 설정할 변수

    // correctAnswerCnt 값에 따라 titleMessage 변경
    if (correctAnswerCnt >= 1 && correctAnswerCnt <= 3) {
      titleMessage = `아쉽게도 ${correctAnswerCnt}개밖에 못 맞혔어요. 😢`;
    } else if (correctAnswerCnt >= 4 && correctAnswerCnt <= 7) {
      titleMessage = `우와! ${correctAnswerCnt}개나 맞혔어요! 🎉`;
    } else if (correctAnswerCnt >= 8 && correctAnswerCnt <= 10) {
      titleMessage = `대단해요! ${correctAnswerCnt}개나 맞혔어요! 🚀`;
    } else {
      titleMessage = '하나도 못 맞혔어요... 도와주세요😭';
    }

    window.Kakao.Link.sendDefault(
      {
        objectType: 'feed',
        content: {
          title: titleMessage,
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
