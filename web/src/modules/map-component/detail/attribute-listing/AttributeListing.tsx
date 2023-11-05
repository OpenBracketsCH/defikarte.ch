import './AttributeListing.css';

type Props = {
  icon: JSX.Element;
  label: string;
  value: string;
};

export const AttributeListing = (props: Props) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div>{props.icon}</div>
      <div style={{ padding: '0 1rem' }}>
        <label style={{ fontSize: '14px', fontWeight: '400' }}>{props.label}</label>
        <p style={{ margin: 0, fontWeight: '500', fontSize: '16px' }}>{props.value ?? 'n/A'}</p>
      </div>
    </div>
  );
};
