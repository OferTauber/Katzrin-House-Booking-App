import staticInfo from '../../../static-info';

export default function StaticInfo() {
  const dataItems = staticInfo.map((dataItem) => {
    return (
      <div className="static-data-item">
        <div className="static-data-item-title">{dataItem.title}:</div>
        <div className="static-data-item-content">{dataItem.content}</div>
      </div>
    );
  });

  return <div>{dataItems}</div>;
}
