import "./Detail.css";

type Props = {
  hidden: boolean;
  data: any;
};

export const Detail = ({ hidden, data }: Props) => {
  if (!data) {
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

  console.log(dataList);

  return (
    <div className="detail-detail" >
      {dataList}
    </div>
  );
};
