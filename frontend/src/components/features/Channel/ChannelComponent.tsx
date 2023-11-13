import { ChannelItemsWrapper, ChannelItem } from './ChannelComponent.styled';

type OwnProps = {
  channelSizes: number[];
  handleChannelClick: (channelNumber: number) => void;
};

export const ChannelComponent = (props: OwnProps) => {
  const { channelSizes, handleChannelClick } = props;

  return (
    <ChannelItemsWrapper>
      {channelSizes.map((size, index) => {
        const channelNumber = index + 1;
        return (
          <ChannelItem
            key={`channel-${channelNumber}`}
            onClick={() => {
              handleChannelClick(channelNumber);
            }}
          >
            <p
              style={{ fontSize: '28px', color: '#E08080', marginRight: '5%' }}
            >
              채널 {channelNumber}{' '}
            </p>
            <p>인원수 {size}/100</p>
          </ChannelItem>
        );
      })}
    </ChannelItemsWrapper>
  );
};
