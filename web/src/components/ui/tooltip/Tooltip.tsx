import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import iconExternalLinkMiddleGreen from '../../../assets/icons/icon-external-link-middle-green.svg';
import iconQuestionGrey from '../../../assets/icons/icon-question-grey.svg';
import { TooltipData } from '../../../model/app';

type TooltipProps = {
  tooltip?: TooltipData;
};

export const Tooltip = ({ tooltip }: TooltipProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePosition = () => {
      if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        if (tooltipRect.bottom > window.innerHeight) {
          tooltipRef.current.style.bottom = '-25px';
          tooltipRef.current.style.transform = 'none';
        } else if (tooltipRect.top < 200) {
          tooltipRef.current.style.top = '-25px';
          tooltipRef.current.style.transform = 'none';
        } else {
          tooltipRef.current.style.top = '50%';
          tooltipRef.current.style.transform = 'translateY(-50%)';
        }
      }
    };

    if (visible) handlePosition();

    window.addEventListener('resize', handlePosition);
    return () => window.removeEventListener('resize', handlePosition);
  }, [visible]);

  if (!tooltip) {
    return null;
  }

  const title = tooltip.title;
  const content = tooltip.content;
  const link = tooltip.link;
  return (
    <>
      <div
        hidden={!visible}
        className="absolute inset-0 bg-primary-10-black flex items-center justify-center z-1 rounded-2xl"
        onClick={() => setVisible(false)}
      />
      <div className="relative inline-block">
        <button className="cursor-pointer" type="button" onClick={() => setVisible(s => !s)}>
          <img src={iconQuestionGrey} alt="help" />
        </button>
        {visible && (
          <>
            <div className="absolute ms-2 left-full top-0 w-3.5 h-3.5 bg-primary-100-white transform rotate-45 z-100"></div>
            <div
              ref={tooltipRef}
              className="absolute ms-3.5 left-full p-4 w-80 rounded-2xl text-xs leading-[150%] text-primary-100-green-04 bg-primary-100-white z-10 shadow-custom-lg shadow-green-shadow-64"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 mb-3 font-normal">{content}</p>
              {tooltip?.link && (
                <a href={link} className="flex gap-2 text-primary-100-green-03" target="_blank">
                  <img src={iconExternalLinkMiddleGreen} alt="external link" />
                  <span>{t('more')}</span>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
