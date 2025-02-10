export const generateMockFlightData = (count = 20) => {
  return Array.from({ length: count }, () => {
    const date = new Date().toISOString().split('T')[0];
    const generateRandomNumber = (max = 100) => Math.floor(Math.random() * max);
    
    // Helper to create consistent sums
    const createAirlineData = () => {
      const intPax = generateRandomNumber(200);
      const intCgo = generateRandomNumber(20);
      const intSum = intPax + intCgo;
      const domPax = generateRandomNumber(50);
      const domCgo = generateRandomNumber(10);
      const domSum = domPax + domCgo;
      const totalSum = intSum + domSum;
      
      return {
        intPax,
        intCgo,
        intSum,
        domPax,
        domCgo,
        domSum,
        totalSum
      };
    };

    const kal = createAirlineData();
    const aar = createAirlineData();
    const lcc = createAirlineData();
    const foreign = {
      pax: generateRandomNumber(200),
      cgo: generateRandomNumber(20)
    };
    foreign.sum = foreign.pax + foreign.cgo;
    
    const etc = generateRandomNumber(10);
    const totalSum = kal.totalSum + aar.totalSum + lcc.totalSum + foreign.sum + etc;

    return {
      'DATE| | ': `${date}-${getDayOfWeek(date)}`,
      'KAL|INTERNATIONAL|PAX': kal.intPax,
      'AAR|INTERNATIONAL|PAX': aar.intPax,
      'LCC|INTERNATIONAL|PAX': lcc.intPax,
      'KAL|INTERNATIONAL|CGO': kal.intCgo,
      'AAR|INTERNATIONAL|CGO': aar.intCgo,
      'LCC|INTERNATIONAL|CGO': lcc.intCgo,
      'KAL|INTERNATIONAL|SUM': kal.intSum,
      'AAR|INTERNATIONAL|SUM': aar.intSum,
      'LCC|INTERNATIONAL|SUM': lcc.intSum,
      'KAL|DOMESTIC|PAX': kal.domPax,
      'AAR|DOMESTIC|PAX': aar.domPax,
      'LCC|DOMESTIC|PAX': lcc.domPax,
      'KAL|DOMESTIC|CGO': kal.domCgo,
      'AAR|DOMESTIC|CGO': aar.domCgo,
      'LCC|DOMESTIC|CGO': lcc.domCgo,
      'KAL|DOMESTIC|SUM': kal.domSum,
      'AAR|DOMESTIC|SUM': aar.domSum,
      'LCC|DOMESTIC|SUM': lcc.domSum,
      'KAL|SUM| ': kal.totalSum,
      'AAR|SUM| ': aar.totalSum,
      'LCC|SUM| ': lcc.totalSum,
      'FOREIGN|PAX| ': foreign.pax,
      'FOREIGN|CGO| ': foreign.cgo,
      'FOREIGN|SUM| ': foreign.sum,
      'ETC| | ': etc,
      'SUM| | ': totalSum
    };
  });
};

export const getFlightTableHeaders = () => {
  return [
    { field: 'DATE| | ', label: 'DATE| | ', searchable: true },
    { field: 'KAL|INTERNATIONAL|PAX', label: 'KAL|INTERNATIONAL|PAX', searchable: false },
    { field: 'AAR|INTERNATIONAL|PAX', label: 'AAR|INTERNATIONAL|PAX', searchable: false },
    { field: 'LCC|INTERNATIONAL|PAX', label: 'LCC|INTERNATIONAL|PAX', searchable: false },
    { field: 'KAL|INTERNATIONAL|CGO', label: 'KAL|INTERNATIONAL|CGO', searchable: false },
    { field: 'AAR|INTERNATIONAL|CGO', label: 'AAR|INTERNATIONAL|CGO', searchable: false },
    { field: 'LCC|INTERNATIONAL|CGO', label: 'LCC|INTERNATIONAL|CGO', searchable: false },
    { field: 'KAL|INTERNATIONAL|SUM', label: 'KAL|INTERNATIONAL|SUM', searchable: false, bold: true },
    { field: 'AAR|INTERNATIONAL|SUM', label: 'AAR|INTERNATIONAL|SUM', searchable: false, bold: true },
    { field: 'LCC|INTERNATIONAL|SUM', label: 'LCC|INTERNATIONAL|SUM', searchable: false, bold: true },
    { field: 'KAL|DOMESTIC|PAX', label: 'KAL|DOMESTIC|PAX', searchable: false },
    { field: 'AAR|DOMESTIC|PAX', label: 'AAR|DOMESTIC|PAX', searchable: false },
    { field: 'LCC|DOMESTIC|PAX', label: 'LCC|DOMESTIC|PAX', searchable: false },
    { field: 'KAL|DOMESTIC|CGO', label: 'KAL|DOMESTIC|CGO', searchable: false },
    { field: 'AAR|DOMESTIC|CGO', label: 'AAR|DOMESTIC|CGO', searchable: false },
    { field: 'LCC|DOMESTIC|CGO', label: 'LCC|DOMESTIC|CGO', searchable: false },
    { field: 'KAL|DOMESTIC|SUM', label: 'KAL|DOMESTIC|SUM', searchable: false, bold: true },
    { field: 'AAR|DOMESTIC|SUM', label: 'AAR|DOMESTIC|SUM', searchable: false, bold: true },
    { field: 'LCC|DOMESTIC|SUM', label: 'LCC|DOMESTIC|SUM', searchable: false, bold: true },
    { field: 'KAL|SUM| ', label: 'KAL|SUM| ', searchable: false, bold: true },
    { field: 'AAR|SUM| ', label: 'AAR|SUM| ', searchable: false, bold: true },
    { field: 'LCC|SUM| ', label: 'LCC|SUM| ', searchable: false, bold: true },
    { field: 'FOREIGN|PAX| ', label: 'FOREIGN|PAX| ', searchable: false },
    { field: 'FOREIGN|CGO| ', label: 'FOREIGN|CGO| ', searchable: false },
    { field: 'FOREIGN|SUM| ', label: 'FOREIGN|SUM| ', searchable: false, bold: true },
    { field: 'ETC| | ', label: 'ETC| | ', searchable: false },
    { field: 'SUM| | ', label: 'SUM| | ', searchable: false, bold: true }
  ];
};

export const generateDeicingData = (count = 20) => {
  return Array.from({ length: count }, () => {
    const date = new Date();
    const baseTime = new Date(date.setHours(Math.floor(Math.random() * 24)));
    
    // Helper to generate random time offset
    const getRandomTime = (baseTime, maxMinutesOffset = 60) => {
      const newTime = new Date(baseTime.getTime() + Math.random() * maxMinutesOffset * 60000);
      return newTime.toTimeString().slice(0, 5);
    };

    // Generate sequential times
    const times = {
      std: getRandomTime(baseTime),
      eobt: getRandomTime(baseTime, 30),
      aobt: getRandomTime(baseTime, 45),
      req: getRandomTime(baseTime, 15),
      ic: getRandomTime(baseTime, 50),
      pb: getRandomTime(baseTime, 52),
      pi: getRandomTime(baseTime, 54),
      srt: getRandomTime(baseTime, 55),
      end: getRandomTime(baseTime, 58),
      po: getRandomTime(baseTime, 59),
      aout: getRandomTime(baseTime, 60)
    };

    const airlines = ['KE', 'OZ', 'LJ', 'TW', 'UPS', 'FDX'];
    const aircraftTypes = ['B748', 'B772', 'A333', 'A321', 'B738'];
    const stands = ['831', '832', '833', '834', '835', '841', '842'];
    const handlers = ['KAS', 'SH', 'AAR'];
    const runways = ['16L', '16R', '34L', '34R'];
    const engineStatus = ['ON', 'OFF'];
    const phaseStatus = ['PRE', 'POST', ''];
    const ptStatus = ['P', 'T'];

    return {
      'DATE': `${date.toISOString().split('T')[0]}-${getDayOfWeek(date)}`,
      'FLT': `${airlines[Math.floor(Math.random() * airlines.length)]}${Math.floor(Math.random() * 1000)}`,
      'TYP': aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
      'STAND': stands[Math.floor(Math.random() * stands.length)],
      'PAD': stands[Math.floor(Math.random() * stands.length)],
      'G-H': handlers[Math.floor(Math.random() * handlers.length)],
      'I-C': times.ic,
      'EOBT': times.eobt,
      'AOBT': times.aobt,
      'P-B': times.pb,
      'A-OUT': times.aout,
      'REQ': times.req,
      'P/I': times.pi,
      'SRT': times.srt,
      'END': times.end,
      'P/O': times.po,
      'STD': times.std,
      'DLY': Math.random() > 0.7 ? getRandomTime(new Date(0), 30) : '',
      'RWY': runways[Math.floor(Math.random() * runways.length)],
      'P/T': ptStatus[Math.floor(Math.random() * ptStatus.length)],
      'RMK': Math.random() > 0.8 ? 'Check required' : '',
      'ENGINE': engineStatus[Math.floor(Math.random() * engineStatus.length)],
      'PHASE': phaseStatus[Math.floor(Math.random() * phaseStatus.length)]
    };
  });
};

export const getDeicingTableHeaders = () => {
  return [
    { field: 'DATE', label: 'DATE', searchable: true, mapping: 'yyyy-mm-dd-DAY' },
    { field: 'FLT', label: 'FLT', searchable: true },
    { field: 'TYP', label: 'TYP', searchable: true },
    { field: 'STAND', label: 'STAND', searchable: true },
    { field: 'PAD', label: 'PAD', searchable: true },
    { field: 'G-H', label: 'G-H', searchable: true },
    { field: 'I-C', label: 'I-C', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'EOBT', label: 'EOBT', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'AOBT', label: 'AOBT', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'P-B', label: 'P-B', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'A-OUT', label: 'A-OUT', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'REQ', label: 'REQ', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'P/I', label: 'P/I', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'SRT', label: 'SRT', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'END', label: 'END', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'P/O', label: 'P/O', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'STD', label: 'STD', mapping: 'yyyy-mm-ddThh:mm:ss->hh:mm' },
    { field: 'DLY', label: 'DLY', mapping: 'hh:mm' },
    { field: 'RWY', label: 'RWY', searchable: true },
    { field: 'P/T', label: 'P/T', searchable: true },
    { field: 'RMK', label: 'RMK', searchable: true },
    { field: 'ENGINE', label: 'ENGINE', searchable: true },
    { field: 'PHASE', label: 'PHASE', searchable: true }
  ];
};

const getDayOfWeek = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[new Date(date).getDay()];
};