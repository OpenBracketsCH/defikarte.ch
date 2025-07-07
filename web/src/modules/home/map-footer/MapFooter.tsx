import { useMediaQuery } from 'react-responsive';
import iconChevronDownMiddleGreenM from '../../../assets/landingpages/home/icon-chevron-down-middle-green-m.svg';
import iconChevronDownMiddleGreenS from '../../../assets/landingpages/home/icon-chevron-down-middle-green-s.svg';
import { IconButton } from '../../../components/ui/icon-button/IconButton';

type MapFooterProps = {
  onNextViewClick: () => void;
};

export const MapFooter = ({ onNextViewClick }: MapFooterProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex items-center justify-center h-[58px] md:h-[75px]">
      <IconButton
        icon={isMobile ? iconChevronDownMiddleGreenS : iconChevronDownMiddleGreenM}
        variant="white"
        size="large"
        onClick={onNextViewClick}
      />
    </div>
  );
};
