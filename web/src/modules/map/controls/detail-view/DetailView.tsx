import cn from 'classnames';
import { Feature, Point } from 'geojson';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import iconAccessDarkGreen from '../../../../assets/icons/icon-access-dark-green.svg';
import iconAccessGrey from '../../../../assets/icons/icon-access-grey.svg';
import iconCloseDarkGreen from '../../../../assets/icons/icon-close-dark-green.svg';
import iconEditDarkGreen from '../../../../assets/icons/icon-edit-dark-green.svg';
import iconHouseDarkGreen from '../../../../assets/icons/icon-house-dark-green.svg';
import iconHouseGrey from '../../../../assets/icons/icon-house-grey.svg';
import iconNavigationDarkGreen from '../../../../assets/icons/icon-navigation-dark-green.svg';
import iconNavigationGrey from '../../../../assets/icons/icon-navigation-grey.svg';
import iconNavigationWhite from '../../../../assets/icons/icon-navigation-white.svg';
import iconTimeWhite from '../../../../assets/icons/icon-time-white.svg';
import { Button } from '../../../../components/ui/button/Button';
import { IconButton } from '../../../../components/ui/icon-button/IconButton';
import { Tag } from '../../../../components/ui/tag/Tag';
import { distanceBetweenPoints } from '../../../../services/coordinate-calculation.service';
import { isOpenNow } from '../../../../services/opening-hours.service';
import { FeaturePropsList } from './property-list/FeaturePropsList';

type DetailViewProps = {
  feature: Feature | null;
  onClose: () => void;
  userLocation: GeolocationPosition | null;
};

export const DetailView = ({ feature, onClose, userLocation }: DetailViewProps) => {
  const { t } = useTranslation();
  const [propsVisible, setPropsVisible] = useState(false);
  if (!feature || !feature?.properties) {
    return null;
  }

  const props = feature.properties || {};
  const coords = (feature.geometry as Point)?.coordinates;
  const isOpen = isOpenNow(props.opening_hours);
  const isOutdoor = props.indoor === 'no';
  const isAccess = props.access === 'yes';
  const distance = userLocation
    ? distanceBetweenPoints(
        {
          lat: userLocation?.coords.latitude,
          lon: userLocation.coords.longitude,
        },
        {
          lat: coords[1],
          lon: coords[0],
        }
      )
    : null;
  const isSmallerThan1000 = distance && distance < 1000;
  const distanceText =
    distance &&
    t('distanceAway', {
      distance: isSmallerThan1000 ? distance.toFixed(0) : (distance / 1000).toFixed(1),
      unit: isSmallerThan1000 ? 'm' : 'km',
    });
  const name = props['defibrillator:location'] ?? props.description ?? props.operator ?? 'n/A';

  const containerClass = cn(
    'absolute',
    'flex',
    'flex-col',
    'items-start',
    'bottom-4',
    'top-auto',
    'md:bottom-16',
    'md:right-6',
    'mx-4',
    'md:mx-0',
    'inset-x-0',
    'md:inset-auto',
    'md:w-[304px]',
    'md:h-[500px]',
    'inset-y-0',
    'max-h-[calc(100vh-theme(space.8))]',
    'md:max-h-[calc(100vh-theme(space.20))]',
    'xl:h-[576px]',
    'bg-primary-100-white',
    'rounded-2xl',
    'shadow-lg',
    'shadow-green-shadow-64'
  );
  return (
    <div className={containerClass} style={{ zIndex: 100000 }}>
      <div className="px-4 py-3 flex justify-between w-full items-start border-b border-primary-05-green-05">
        <p className="text-wrap text-sm font-normal leading-[150%] text-primary-100-green-04 w-full md:w-60">
          {name}
        </p>
        <IconButton
          icon={iconCloseDarkGreen}
          variant="white"
          title={t('close')}
          onClick={() => {
            setPropsVisible(false);
            onClose();
          }}
        />
      </div>
      <div className="px-4 pt-4 overflow-auto gap-6 flex flex-col w-full">
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
          {distance && (
            <Tag
              variant={isOpen ? 'tint' : 'secondary'}
              icon={isOpen ? iconNavigationDarkGreen : iconNavigationGrey}
            >
              {distanceText}
            </Tag>
          )}
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
        <FeaturePropsList
          feature={feature}
          isOpen={isOpen}
          className={cn({ hidden: !propsVisible, 'md:flex': !propsVisible })}
        />
        <IconButton
          title={t('edit')}
          icon={iconEditDarkGreen}
          variant={isOpen ? 'tint' : 'secondary'}
          className={cn(
            'md:hidden',
            'w-full',
            'flex',
            'justify-end',
            'items-end',
            'pt-1',
            'pb-4',
            'pe-4',
            { hidden: !propsVisible, 'md:flex': !propsVisible }
          )}
        />
      </div>
      <div className="pt-6 pb-4 px-4 flex-grow flex w-full items-end">
        <div className="flex justify-between items-center w-full flex-row-reverse h-10">
          <IconButton
            title={t('edit')}
            icon={iconEditDarkGreen}
            variant={isOpen ? 'tint' : 'secondary'}
            className="hidden md:visible md:flex"
          />
          <Button
            className="md:hidden"
            variant="secondary"
            onClick={() => setPropsVisible(s => !s)}
          >
            {propsVisible ? t('hide') : t('details')}
          </Button>
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
