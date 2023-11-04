import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import './Detail.css';
import FilledButton from '../../../components/buttons/filled-button/FilledButton';
import { FaX } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

type Props = {
  data: Feature<Point>[] | null;
  closeAction?: () => void;
};

export const Detail = ({ data, closeAction }: Props) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) {
    return null;
  }
  const dataList = Object.keys(data).map((key: any, index: number) => {
    if (key === 'geometry') {
      return null;
    }
    return (
      <div key={index}>
        <label>{key}</label>
        <p>{JSON.stringify(data[key])}</p>
      </div>
    );
  });

  return (
    <div className="detail-detail mobile">
      {dataList}
      <div>
        <FilledButton
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
