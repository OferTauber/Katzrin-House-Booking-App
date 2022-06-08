import { useGlobalContext } from '../../../utils/context';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { postUpdate } from '../../../utils/axios';

export default function Updates({ data, setData }) {
  const { user, usersList } = useGlobalContext();
  const [newUpdate, setNewUpdate] = useState('');
  const [localDataCopy, setLocalDataCopy] = useState([]);

  const findUserNameByUserId = (userIdToFind) => {
    if (usersList && usersList[0] && userIdToFind) {
      if (userIdToFind + '' === user.id + '') return 'את/ה';
      const temp = usersList[0].find((userFromList) => {
        return userFromList.id + '' === userIdToFind + '';
      });

      return temp.name_he;
    } else {
      return;
    }
  };

  useEffect(() => {
    setLocalDataCopy(data);
  }, [data]);

  const mapData = () => {
    if (localDataCopy && localDataCopy[0]) {
      return localDataCopy.map((update, index) => {
        return (
          <div className="update-item" key={index}>
            <div className="update-item-content">{update.content}</div>
            <div className="update-item-meta-data">
              <p>{findUserNameByUserId(update.createdBy)}</p>
              <p>{moment(update.createdAt).format('YYYY-MM-DD')}</p>
            </div>
          </div>
        );
      });
    }
  };

  const onPostNewUpdate = async () => {
    if (!newUpdate) return;
    const update = {
      createdAt: new Date(),
      createdBy: user.id,
      content: newUpdate,
    };
    const prev = [...localDataCopy];
    prev.push(update);
    console.log(update);
    setNewUpdate('');
    await postUpdate(update);
    setTimeout(() => {
      setData();
    }, 400);
  };

  return (
    <>
      <div className="add-new-update update-item">
        <input
          type="text"
          value={newUpdate}
          onChange={(e) => setNewUpdate(e.target.value)}
        />
        <div className="btn" onClick={onPostNewUpdate}>
          הודעה חדשה
        </div>
      </div>

      {mapData()}
    </>
  );
}
