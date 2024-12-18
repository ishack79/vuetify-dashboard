const AIRCRAFT_TYPES = ['A320', 'B737', 'A380', 'B777', 'A350', 'B787'];
const GROUND_HANDLERS = ['AAP', 'KAS', 'SHP', 'JAS'];
const RUNWAYS = ['01L', '01R', '19L', '19R'];

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const generateMockFlightData = (count = 600) => {
  return Array.from({ length: count }, (_, i) => ({
    date: new Date().toISOString().split('T')[0],
    flight: `FL${1000 + i}`,
    onbt: generateRandomTime(),
    ofbt: generateRandomTime(),
    time: generateRandomTime(),
    lvp: Math.random() > 0.5 ? 'Y' : 'N',
    type: AIRCRAFT_TYPES[Math.floor(Math.random() * AIRCRAFT_TYPES.length)],
    groundHandler: GROUND_HANDLERS[Math.floor(Math.random() * GROUND_HANDLERS.length)],
    ao: generateRandomTime(),
    rwy: RUNWAYS[Math.floor(Math.random() * RUNWAYS.length)],
    ic: generateRandomTime(),
    pb: generateRandomTime()
  }));
};

export const getFlightTableHeaders = () => {
  return [
    { title: 'DATE', key: 'date', align: 'start' },
    { title: 'CALLSIGN', key: 'flight', align: 'start' },
    { title: 'G-H', key: 'groundHandler', align: 'center' },
    { title: 'TYP', key: 'type', align: 'center' },
    { title: 'I-C', key: 'ic', align: 'center' },
    { title: 'ONBT', key: 'onbt', align: 'center' },
    { title: 'OFBT', key: 'ofbt', align: 'center' },
    { title: 'P-B', key: 'pb', align: 'center' },
    { title: 'A-O', key: 'ao', align: 'center' },
    { title: 'RWY', key: 'rwy', align: 'center' },
    { title: 'ETD', key: 'time', align: 'end' },
    { title: 'LVP', key: 'lvp', align: 'center' }
  ];
};