import { useTranslation } from 'react-i18next';
import { FaCheck, FaX } from 'react-icons/fa6';
import './SelectPosition.css';
import FilledButton from '../../../components/buttons/filled-button/FilledButton';
import FilledTonalButton from '../../../components/buttons/filled-tonal-button/FilledTonalButton';
import FilledIconButton from '../../../components/buttons/filled-icon-button/FilledIconButton';
import FilledTonalIconButton from '../../../components/buttons/filled-tonal-icon-button/FilledTonalIconButton';

type Props = {
  hidden: boolean;
  onSubmitPosition: () => void;
};

export const SelectPosition = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div hidden={props.hidden} className="select-position-button-container">
      <FilledIconButton onClick={() => props.onSubmitPosition()}>
        <FaCheck />
      </FilledIconButton>
      <FilledTonalIconButton role="secondary">
        <FaX />
      </FilledTonalIconButton>
    </div>
  );
};
