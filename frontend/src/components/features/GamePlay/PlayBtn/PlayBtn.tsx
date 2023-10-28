import styled from 'styled-components';

const PlayButtonStyle = styled.button`
  width: 6rem;
  height: 6rem;
  background-color: rgba(106, 223, 96, 0.9);
  border-radius: 1rem;
  border: 2px solid rgba(235, 226, 255, 0.4);
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  z-index: 99;

  &:hover {
    background-color: #58d158;
  }

  &:disabled {
    background-color: #888;
  }
`;

type OwnProps = {
  btnName: string;
  onClickHandler: (e: any) => void;
  isBtnDisabled: boolean;
};

export const PlayBtn = (props: OwnProps) => {
  const { btnName, onClickHandler, isBtnDisabled } = props;

  return (
    <PlayButtonStyle
      type="button"
      onClick={onClickHandler}
      disabled={isBtnDisabled}
    >
      {btnName}
    </PlayButtonStyle>
  );
};
