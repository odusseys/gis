import moment from "moment";
import frLocale from "moment/locale/fr";

export const formatDate = m => {
  m.locale("fr", frLocale);
  return m.format("dddd D MMMM");
};

export const getEventGroups = events => {
  const todayMoment = moment();
  const today = formatDate(todayMoment);
  const tomorrow = formatDate(moment().add(1, "days"));
  let currentGroupName = today;
  let currentGroupEvents = [];
  const result = [];
  for (let e of events) {
    let date = moment(e.start_date);
    //adjust date to account for events starting shortly after midnight
    date.subtract(3, "hours");
    if (moment(date).isBefore(todayMoment)) {
      date = todayMoment;
    }
    const group = formatDate(date);
    if (group !== currentGroupName) {
      if (currentGroupEvents.length) {
        result.push({ group: currentGroupName, events: currentGroupEvents });
      }
      currentGroupName = group;
      currentGroupEvents = [];
    }
    currentGroupEvents.push(e);
  }
  if (currentGroupEvents.length) {
    result.push({ group: currentGroupName, events: currentGroupEvents });
  }
  return result.map(({ group, events }) => {
    const groupRenamed =
      group === today ? "Aujourd'hui" : group === tomorrow ? "Demain" : group;
    return { group: groupRenamed, events };
  });
};

export const mapGroupsToItems = eventGroups => {
  const res = [];
  for (let { group, events } of eventGroups) {
    res.push({ type: "GROUP", name: group });
    for (let e of events) {
      res.push({ type: "EVENT", event: e });
    }
  }
  return res;
};

export const getItems = events => mapGroupsToItems(getEventGroups(events));

export const extractDistinctDates = events => {
  const dates = events.map(({ start_date }) =>
    moment(start_date).format("YYYY-MM-DD")
  );
  return Array.from(new Set(dates));
};

export const filterByDate = (events, date) => {
  return events.filter(
    ({ start_date }) => moment(start_date).format("YYYY-MM-DD") === date
  );
};
