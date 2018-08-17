import api from 'gis/api';

const getEventGroup = e => {
  const date = Date.parse(e.start_date);
  const now = Date.now();
  if (date.getTime() < now.getTime()) {
    return null;
  }
  const timeDiff = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (diffDays === 0) {
    return 'TODAY';
  } else if (diffDays === 1) {
    return 'TOMORROW';
  } else {
    date.setHours(0, 0, 0, 0);
    return date.toDateString();
  }
};

export const getEvents = async () => {
  const events = await api.events.list();
  return events;
  const groups = {};
  events.forEach(e => {
    const group = getEventGroup(e);
    if (group) {
      let list = groups[group];
      if (!list) {
        list = [];
        groups[group] = list;
      }
      list.push(e);
    }
  });
  even;
};
