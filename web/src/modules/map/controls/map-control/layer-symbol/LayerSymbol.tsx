interface LayerSymbolProps {
  active: boolean;
  icon: string;
}

export const LayerSymbol = (props: LayerSymbolProps) => {
  return (
    <div>
      <p>{props.active}</p>
    </div>
  );
};
