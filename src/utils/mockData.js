const GROUND_HANDLERS = ['AAP', 'KAS', 'SHP', 'JAS'];
const STANDS = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
const CONTROLLERS = ['John Smith', 'Jane Doe', 'Bob Wilson', 'Alice Brown'];
const REMARKS = ['DELAY', 'MAINT', 'TECH', 'WX', ''];

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const generateISODateTime = () => {
  const date = new Date();
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  date.setHours(hours, minutes, 0);
  return date.toISOString().slice(0, 19); // Format: YYYY-MM-DDTHH:mm:ss
};

const getDayOfWeek = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[new Date(date).getDay()];
};

export const generateMockFlightData = (count = 600) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date().toISOString().split('T')[0];
    return {
      date: `${date}-${getDayOfWeek(date)}`,
      groundHandler: GROUND_HANDLERS[Math.floor(Math.random() * GROUND_HANDLERS.length)],
      standFirst: STANDS[Math.floor(Math.random() * STANDS.length)],
      standSecond: STANDS[Math.floor(Math.random() * STANDS.length)],
      initialAssumeTime: generateISODateTime(),
      ofbt: generateISODateTime(),
      onbt: generateISODateTime(),
      movementTime: generateRandomTime(),
      lvp: Math.random() > 0.5 ? 'Y' : 'N',
      callsign: `FL${1000 + i}`,
      etd: generateISODateTime(),
      name: CONTROLLERS[Math.floor(Math.random() * CONTROLLERS.length)],
      rmk: REMARKS[Math.floor(Math.random() * REMARKS.length)]
    };
  });
};

export const getFlightTableHeaders = () => {
  return [
    {
      field: "date",
      label: "DATE",
      mapping: "yyyy-mm-dd-DAY"
    },
    {
      field: "groundHandler",
      label: "G-H",
      searchable: true,
      bold: true
    },
    {
      field: "standFirst",
      label: "OFF",
      searchable: true
    },
    {
      field: "standSecond",
      label: "ON",
      searchable: true
    },
    {
      field: "initialAssumeTime",
      label: "REQ TIME",
      mapping: "yyyy-mm-ddThh:mm:ss->hh:mm"
    },
    {
      field: "ofbt",
      label: "OFBT",
      mapping: "yyyy-mm-ddThh:mm:ss->hh:mm"
    },
    {
      field: "onbt",
      label: "ONBT",
      mapping: "yyyy-mm-ddThh:mm:ss->hh:mm"
    },
    {
      field: "movementTime",
      label: "MOVEMENT TIME",
      mapping: "no-empty hh:mm",
      bold: true
    },
    {
      field: "lvp",
      label: "LVP",
      searchable: true
    },
    {
      field: "callsign",
      label: "DEP FLT",
      searchable: true
    },
    {
      field: "etd",
      label: "ETD",
      mapping: "yyyy-mm-ddThh:mm:ss->hh:mm"
    },
    {
      field: "name",
      label: "CIC",
      searchable: true,
      bold: true
    },
    {
      field: "rmk",
      label: "RMK",
      searchable: true
    }
  ];
};