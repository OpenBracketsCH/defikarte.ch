import { useForm } from 'react-hook-form';
import { AedData } from '../../../../../model/app';
import { TextField } from '../../../../../components/ui/text-field/TextField';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../components/ui/button/Button';

export const AedForm = () => {
  const { t } = useTranslation();
  const { register } = useForm<AedData>();

  return (
    <div className="absolute z-[10000] h-auto w-[555px] rounded-2xl bottom-6 top-6 right-6 bg-primary-100-white shadow-custom-lg shadow-green-shadow-64">
      <h1 className="border-b p-4 border-primary-05-green-05">{t('createAed')}</h1>
      <form className="flex flex-col justify-start px-4 pt-5 pb-4 gap-4">
        <TextField
          label="Test"
          type="text"
          placeholder="test"
          tooltip={{
            title: 'Mehr informationen',
            content:
              'Lorem ipsum dolor sit amet, consetetur esa sadipscing elitr, sed diam nonumy eirmod est tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Vero eos et accusam et justo duo dolores. ',
            link: 'https://quartierpizza.ch',
          }}
          {...register('name', { required: true })}
        />
        <TextField
          label="Test"
          type="text"
          placeholder="test"
          tooltip={{
            title: 'Mehr informationen',
            content:
              'Lorem ipsum dolor sit amet, consetetur esa sadipscing elitr, sed diam nonumy eirmod est tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Vero eos et accusam et justo duo dolores. ',
            link: 'https://quartierpizza.ch',
          }}
          {...register('name', { required: true })}
        />
        <TextField
          label="This is a form field"
          type="text"
          placeholder="test"
          tooltip={{
            title: 'Mehr informationen',
            content:
              'Lorem ipsum dolor sit amet, consetetur esa sadipscing elitr, sed diam nonumy eirmod est tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Vero eos et accusam et justo duo dolores. ',
            link: 'https://quartierpizza.ch',
          }}
          {...register('name', { required: true })}
        />
        <TextField
          label="This is another form field"
          type="text"
          placeholder="test"
          {...register('name', { required: true })}
        />
        <Button type="submit" variant="primary" size="large" className='w-fit'>
          {t('submit')}
        </Button>
      </form>
    </div>
  );
};
