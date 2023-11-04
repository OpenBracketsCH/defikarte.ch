import "./Detail.css";

type Props = {
  data: any;
};

export const Detail = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return null;
  }
  const dataList = Object.keys(data).map((key: any, index: number) => {
    if (key === "geometry") {
      return null;
    }
    return (
      <div key={index}>
        <label>{key}</label>
        <p>{JSON.stringify(data[key])}</p>
      </div>
    );
  });

  return <div className="detail-detail">{dataList}</div>;
};
