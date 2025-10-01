import classNames from 'classnames';
import { Feature } from 'geojson';
import { useTranslation } from 'react-i18next';
import iconAccessCircleGreen from '../../../../../assets/icons/icon-access-circle-green.svg';
import iconAccessCircleGrey from '../../../../../assets/icons/icon-access-circle-grey.svg';
import iconHouseCircleGreen from '../../../../../assets/icons/icon-house-circle-green.svg';
import iconHouseCircleGrey from '../../../../../assets/icons/icon-house-circle-grey.svg';
import iconInfoCircleGreen from '../../../../../assets/icons/icon-info-circle-green-s.svg';
import iconInfoCircleGrey from '../../../../../assets/icons/icon-info-circle-grey.svg';
import iconPhoneCircleGreen from '../../../../../assets/icons/icon-phone-circle-green.svg';
import iconPhoneCircleGrey from '../../../../../assets/icons/icon-phone-circle-grey.svg';
import iconProfileCircleGreen from '../../../../../assets/icons/icon-profile-circle-green.svg';
import iconProfileCircleGrey from '../../../../../assets/icons/icon-profile-circle-grey.svg';
import iconStairsCircleGreen from '../../../../../assets/icons/icon-stairs-circle-green.svg';
import iconStairsCircleGrey from '../../../../../assets/icons/icon-stairs-circle-grey.svg';
import iconTimeCircleGreen from '../../../../../assets/icons/icon-time-circle-green.svg';
import iconTimeCircleGrey from '../../../../../assets/icons/icon-time-circle-grey.svg';
import { ItemProperty } from './item-property/ItemProperty';

type FeaturePropsListProps = {
  feature: Feature;
  isOpen: boolean;
  className?: string;
};

export const FeaturePropsList = ({ feature, isOpen, className }: FeaturePropsListProps) => {
  const { t } = useTranslation();
  const props = feature.properties || {};
  const containerClass = classNames(className, 'flex', 'flex-col', 'gap-3');
  return (
    <div className={containerClass}>
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
          value={t(props.access)}
        />
      )}
      {props.indoor && (
        <ItemProperty
          icon={isOpen ? iconHouseCircleGreen : iconHouseCircleGrey}
          title={t('isIndoor')}
          value={t(props.indoor)}
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
  );
};
