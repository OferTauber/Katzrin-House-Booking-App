import { useGlobalContext } from '../../../utils/context';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { updatePantry } from '../../../utils/axios';

export default function Pantry({ data }) {
  const { user, usersList } = useGlobalContext();
  const [dataToEdit, setDataToEdit] = useState('');
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date(2019123548795));

  useEffect(() => {
    if (data && data.items) {
      setDataToEdit(data.items.join('\n'));
      setLastUpdateTime(new Date(data.update));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.updatedBy && usersList && usersList[0]) {
      if (user.id + '' === data.updatedBy + '') {
        setLastUpdatedBy('את/ה');
      } else {
        const temp = usersList[0].find((userFromList) => {
          return userFromList.id + '' === data.updatedBy + '';
        });
        setLastUpdatedBy(temp.name_he);
      }
    }
  }, [data, usersList, user.id]);

  void user;

  const onCancele = () => {
    setDataToEdit(data.items.join('\n'));
  };

  const onSave = () => {
    updatePantry(dataToEdit.split('\n'), new Date(), user.id);
    setLastUpdatedBy('את/ה');
    setLastUpdateTime(new Date());
  };

  return (
    <>
      <textarea
        rows={data && data.items ? data.items.length + 4 : 1}
        value={dataToEdit}
        onChange={(e) => setDataToEdit(e.target.value)}
      />
      <div className="controllers">
        <p>עדכון אחרון:</p>
        <p>{moment(lastUpdateTime).format('YYYY-MM-DD')}</p>
        <p>עודכן ע"י</p>
        <p>{lastUpdatedBy}</p>
        <div className="buttons">
          <div className="btn save-list list-btn" onClick={onSave}>
            שמירה
          </div>
          <div className="btn cancele-list list-btn" onClick={onCancele}>
            ביטול
          </div>
        </div>
      </div>
    </>
  );
}
