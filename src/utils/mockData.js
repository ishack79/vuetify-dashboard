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

const getDayOfWeek = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[new Date(date).getDay()];
};