import { Feature } from 'geojson';
import { useTranslation } from 'react-i18next';
import iconAccessCircleGreen from '../../../../assets/icons/icon-access-circle-green.svg';
import iconAccessCircleGrey from '../../../../assets/icons/icon-access-circle-grey.svg';
import iconAccessDarkGreen from '../../../../assets/icons/icon-access-dark-green.svg';
import iconAccessGrey from '../../../../assets/icons/icon-access-grey.svg';
import iconCloseDarkGreen from '../../../../assets/icons/icon-close-dark-green.svg';
import iconEditDarkGreen from '../../../../assets/icons/icon-edit-dark-green.svg';
import iconHouseCircleGreen from '../../../../assets/icons/icon-house-circle-green.svg';
import iconHouseCircleGrey from '../../../../assets/icons/icon-house-circle-grey.svg';
import iconHouseDarkGreen from '../../../../assets/icons/icon-house-dark-green.svg';
import iconHouseGrey from '../../../../assets/icons/icon-house-grey.svg';
import iconInfoCircleGreen from '../../../../assets/icons/icon-info-circle-green-s.svg';
import iconInfoCircleGrey from '../../../../assets/icons/icon-info-circle-grey.svg';
import iconNavigationDarkGreen from '../../../../assets/icons/icon-navigation-dark-green.svg';
import iconNavigationGrey from '../../../../assets/icons/icon-navigation-grey.svg';
import iconNavigationWhite from '../../../../assets/icons/icon-navigation-white.svg';
import iconPhoneCircleGreen from '../../../../assets/icons/icon-phone-circle-green.svg';
import iconPhoneCircleGrey from '../../../../assets/icons/icon-phone-circle-grey.svg';
import iconProfileCircleGreen from '../../../../assets/icons/icon-profile-circle-green.svg';
import iconProfileCircleGrey from '../../../../assets/icons/icon-profile-circle-grey.svg';
import iconStairsCircleGreen from '../../../../assets/icons/icon-stairs-circle-green.svg';
import iconStairsCircleGrey from '../../../../assets/icons/icon-stairs-circle-grey.svg';
import iconTimeCircleGreen from '../../../../assets/icons/icon-time-circle-green.svg';
import iconTimeCircleGrey from '../../../../assets/icons/icon-time-circle-grey.svg';
import iconTimeWhite from '../../../../assets/icons/icon-time-white.svg';
import { Button } from '../../../../components/ui/button/Button';
import { IconButton } from '../../../../components/ui/icon-button/IconButton';
import { Tag } from '../../../../components/ui/tag/Tag';
import { isOpenNow } from '../../../../services/opening-hours.service';
import ItemProperty from './item-property/ItemProperty';

type DetailViewProps = {
  feature: Feature | null;
  onClose: () => void;
};

export const DetailView = ({ feature, onClose }: DetailViewProps) => {
  const { t } = useTranslation();
  if (!feature || !feature?.properties) {
    return null;
  }

  const props = feature.properties || {};
  const isOpen = isOpenNow(props.opening_hours);
  const isOutdoor = props.indoor === 'no';
  const isAccess = props.access === 'yes';
  const isSmallerThan1000 = props.distance < 1000;
  const distance = isSmallerThan1000 ? props.distance : (props.distance / 1000).toFixed(1);
  const distanceText = t('distanceAway', {
    distance: distance,
    unit: isSmallerThan1000 ? 'm' : 'km',
  });
  const name = props['defibrillator:location'] ?? props.description ?? props.operator ?? 'n/A';
  return (
    <div
      className="absolute bottom-16 right-6 flex flex-col items-start  w-[304px] h-[576px] bg-primary-100-white rounded-2xl shadow-lg shadow-green-shadow-64"
      style={{ zIndex: 100000 }}
    >
      <div className="px-4 py-3 flex justify-between w-full items-start border-b border-primary-05-green-05">
        <p className="text-wrap text-sm font-normal leading-[150%] text-primary-100-green-04 w-60">
          {name}
        </p>
        <IconButton icon={iconCloseDarkGreen} variant="white" onClick={() => onClose()} />
      </div>
      <div className="px-4 pt-4 overflow-auto gap-6 flex flex-col">
        <div className="flex flex-wrap items-start justify-start gap-1.5">
          {isOpen && (
            <Tag variant="primary" icon={iconTimeWhite}>
              {t('open')}
            </Tag>
          )}
          {!isOpen && (
            <Tag variant="orange" icon={iconTimeWhite}>
              {t('closed')}
            </Tag>
          )}
          <Tag
            variant={isOpen ? 'tint' : 'secondary'}
            icon={isOpen ? iconNavigationDarkGreen : iconNavigationGrey}
          >
            {distanceText}
          </Tag>
          {props.access && (
            <Tag
              variant={isOpen ? 'tint' : 'secondary'}
              icon={isOpen ? iconAccessDarkGreen : iconAccessGrey}
            >
              {isAccess ? t('public') : t('private')}
            </Tag>
          )}
          {props.indoor && (
            <Tag
              variant={isOpen ? 'tint' : 'secondary'}
              icon={isOpen ? iconHouseDarkGreen : iconHouseGrey}
            >
              {isOutdoor ? t('outdoor') : t('indoor')}
            </Tag>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {props.opening_hours && (
            <ItemProperty
              icon={isOpen ? iconTimeCircleGreen : iconTimeCircleGrey}
              title={t('openingHours')}
              value={props.opening_hours}
            />
          )}
          {props.access && (
            <ItemProperty
              icon={isOpen ? iconAccessCircleGreen : iconAccessCircleGrey}
              title={t('access')}
              value={props.access}
            />
          )}
          {props.indoor && (
            <ItemProperty
              icon={isOpen ? iconHouseCircleGreen : iconHouseCircleGrey}
              title={t('isIndoor')}
              value={props.indoor}
            />
          )}
          {props.level && (
            <ItemProperty
              icon={isOpen ? iconStairsCircleGreen : iconStairsCircleGrey}
              title={t('level')}
              value={props.level}
            />
          )}
          {props.description && (
            <ItemProperty
              icon={isOpen ? iconInfoCircleGreen : iconInfoCircleGrey}
              title={t('description')}
              value={props.description}
            />
          )}
          {props.operator && (
            <ItemProperty
              icon={isOpen ? iconProfileCircleGreen : iconProfileCircleGrey}
              title={t('operator')}
              value={props.operator}
            />
          )}
          {props.operator_phone && (
            <ItemProperty
              icon={isOpen ? iconPhoneCircleGreen : iconPhoneCircleGrey}
              title={t('operatorPhone')}
              value={props.operator_phone}
            />
          )}
        </div>
      </div>
      <div className="pt-6 pb-4 px-4 flex-grow flex w-full items-end">
        <div className="flex justify-between w-full flex-row-reverse h-10">
          <IconButton icon={iconEditDarkGreen} variant={isOpen ? 'tint' : 'secondary'} />
          {isOpen && (
            <Button variant="primary" icon={iconNavigationWhite}>
              {t('navigate')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
