import iconCloseDarkGreen from '../../../assets/icons/icon-close-dark-green.svg';
import { IconButton } from '../icon-button/IconButton';
import cn from 'classnames';
import toast, { Toast } from 'react-hot-toast';

type CustomToastProps = {
  toastInstance: Toast;
  message?: string;
  title?: string;
  icon?: string;
  onClose?: () => void;
};

export const CustomToast = ({ toastInstance, message, title, icon }: CustomToastProps) => {
  const containerClass = cn(
    'flex items-start p-3 max-w-xs w-full bg-primary-100-white shadow-green-custom shadow-custom rounded-2xl z-[10000] ',
    {
      'animate-enter': toastInstance.visible,
      'animate-leave': !toastInstance.visible,
    }
  );

  return (
    <div className={containerClass}>
      <div className="flex-shrink-0">
        <img src={icon} />
      </div>
      <div className="ps-3 pe-2 text-primary-100-green-04">
        <h4 className="font-semibold pb-1">{title}</h4>
        <p className="text-wrap">{message}</p>
      </div>
      <IconButton
        icon={iconCloseDarkGreen}
        onClick={() => toast.dismiss(toastInstance.id)}
        variant="white"
        className="flex-shrink-0"
      />
    </div>
  );
};
