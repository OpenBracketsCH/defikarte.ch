import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { useTranslation } from 'react-i18next';
import { FaHome, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { FaClock, FaFlag, FaList, FaPhone, FaStairs, FaX } from 'react-icons/fa6';
import FilledButton from '../../../components/buttons/filled-button/FilledButton';
import './Detail.css';
import { AttributeListing } from './attribute-listing/AttributeListing';

type Props = {
  data: Feature<Point>[] | null;
  closeAction?: () => void;
};

export const Detail = ({ data, closeAction }: Props) => {
  const { t } = useTranslation();

  data = data ?? [];
  const dataList = Object.keys(data).map((key: any, index: number) => {
    if (!data) {
      return null;
    }
    const properties = data[key].getProperties();
    const name =
      properties['defibrillator:location'] ??
      properties.description ??
      properties.operator ??
      'n/A';
    const emergencyPhone = properties['emergency:phone'] ?? '144';
    return (
      <div key={index} style={{ marginTop: '0.5rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '20px',
              fontWeight: '600',
              textAlign: 'center',
              margin: 0,
              padding: '0 0.5rem',
            }}
          >
            {name}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <FilledButton>{t('navigate')}</FilledButton>
            <FilledButton>
              {t('call')} ({emergencyPhone})
            </FilledButton>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '0 0.5rem',
            marginTop: '0.5rem',
          }}
        >
          <AttributeListing
            icon={<FaMapMarkerAlt className="detail-icon" />}
            label={t('location')}
            value={properties['defibrillator:location']}
          />
          <AttributeListing
            icon={<FaStairs className="detail-icon" />}
            label={t('level')}
            value={properties['level']}
          />
          <AttributeListing
            icon={<FaList className="detail-icon" />}
            label={t('description')}
            value={properties['description']}
          />
          <AttributeListing
            icon={<FaClock className="detail-icon" />}
            label={t('openinghours')}
            value={properties['opening_hours']}
          />
          <AttributeListing
            icon={<FaFlag className="detail-icon" />}
            label={t('operator')}
            value={properties['operator']}
          />
          <AttributeListing
            icon={<FaPhone className="detail-icon" />}
            label={t('operatorphone')}
            value={properties['phone']}
          />
          <AttributeListing
            icon={<FaInfoCircle className="detail-icon" />}
            label={t('access')}
            value={properties['access']}
          />
          <AttributeListing
            icon={<FaHome className="detail-icon" />}
            label={t('indoor')}
            value={properties['indoor']}
          />
        </div>
      </div>
    );
  });

  const hidden = !data || data.length === 0;
  return (
    <div className={`detail-detail mobile ${hidden ? 'hidden' : null}`}>
      {dataList}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilledButton
          className="detail-close-button"
          onClick={() => {
            if (closeAction) {
              closeAction();
            }
          }}
        >
          <FaX style={{ marginRight: '5px' }} />
          {t('close')}
        </FilledButton>
      </div>
    </div>
  );
};
