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
