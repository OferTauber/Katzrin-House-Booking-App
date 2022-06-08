import { useGlobalContext } from '../../../utils/context';
import moment from 'moment';
import { useState } from 'react';
import { postUpdate } from '../../../utils/axios';

export default function Updates({ data, setData }) {
  const { user, usersList } = useGlobalContext();
  const [newUpdate, setNewUpdate] = useState('');

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

  const updatesJsx = data.map((update, index) => {
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

  const onPostNewUpdate = () => {
    const update = {
      createdAt: new Date(),
      createdBy: user.id,
      content: newUpdate,
    };
    console.log(update);
    setNewUpdate('');

    void postUpdate;
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

      {updatesJsx}
    </>
  );
}
