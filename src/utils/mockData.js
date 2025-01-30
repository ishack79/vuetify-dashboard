export const generateMockFlightData = (count = 100) => {
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
      'date': `${date}-${getDayOfWeek(date)}`,
      'KAL|International|PAX': kal.intPax,
      'AAR|International|PAX': aar.intPax,
      'LCC|International|PAX': lcc.intPax,
      'KAL|International|CGO': kal.intCgo,
      'AAR|International|CGO': aar.intCgo,
      'LCC|International|CGO': lcc.intCgo,
      'KAL|International|sum': kal.intSum,
      'AAR|International|sum': aar.intSum,
      'LCC|International|sum': lcc.intSum,
      'KAL|Domestic|PAX': kal.domPax,
      'AAR|Domestic|PAX': aar.domPax,
      'LCC|Domestic|PAX': lcc.domPax,
      'KAL|Domestic|CGO': kal.domCgo,
      'AAR|Domestic|CGO': aar.domCgo,
      'LCC|Domestic|CGO': lcc.domCgo,
      'KAL|Domestic|sum': kal.domSum,
      'AAR|Domestic|sum': aar.domSum,
      'LCC|Domestic|sum': lcc.domSum,
      'KAL|Domestic|TSUM': kal.totalSum,
      'AAR|Domestic|TSUM': aar.totalSum,
      'LCC|Domestic|TSUM': lcc.totalSum,
      '-|Foreign|PAX': foreign.pax,
      '-|Foreign|CGO': foreign.cgo,
      '-|Foreign|sum': foreign.sum,
      'ETC': etc,
      'F|S|U|M': totalSum
    };
  });
};

export const getFlightTableHeaders = () => {
  return [
    { field: 'date', label: 'DATE| | ', id: 0, exclude_if_empty: false, mapping: 'yyyy-mm-dd-DAY', searchable: true },
    { field: 'KAL|International|PAX', label: 'KAL|INTERNATIONAL|PAX', id: 1, exclude_if_empty: false },
    { field: 'AAR|International|PAX', label: 'AAR|INTERNATIONAL|PAX', id: 1, exclude_if_empty: false },
    { field: 'LCC|International|PAX', label: 'LCC|INTERNATIONAL|PAX', id: 1, exclude_if_empty: false },
    { field: 'KAL|International|CGO', label: 'KAL|INTERNATIONAL|CGO', id: 2, exclude_if_empty: false },
    { field: 'AAR|International|CGO', label: 'AAR|INTERNATIONAL|CGO', id: 2, exclude_if_empty: false },
    { field: 'LCC|International|CGO', label: 'LCC|INTERNATIONAL|CGO', id: 2, exclude_if_empty: false },
    { field: 'KAL|International|sum', label: 'KAL|INTERNATIONAL|SUM', id: 3, exclude_if_empty: false, bold: true },
    { field: 'AAR|International|sum', label: 'AAR|INTERNATIONAL|SUM', id: 3, exclude_if_empty: false, bold: true },
    { field: 'LCC|International|sum', label: 'LCC|INTERNATIONAL|SUM', id: 3, exclude_if_empty: false, bold: true },
    { field: 'KAL|Domestic|PAX', label: 'KAL|DOMESTIC|PAX', id: 4, exclude_if_empty: false },
    { field: 'AAR|Domestic|PAX', label: 'AAR|DOMESTIC|PAX', id: 4, exclude_if_empty: false },
    { field: 'LCC|Domestic|PAX', label: 'LCC|DOMESTIC|PAX', id: 4, exclude_if_empty: false },
    { field: 'KAL|Domestic|CGO', label: 'KAL|DOMESTIC|CGO', id: 5, exclude_if_empty: false },
    { field: 'AAR|Domestic|CGO', label: 'AAR|DOMESTIC|CGO', id: 5, exclude_if_empty: false },
    { field: 'LCC|Domestic|CGO', label: 'LCC|DOMESTIC|CGO', id: 5, exclude_if_empty: false },
    { field: 'KAL|Domestic|sum', label: 'KAL|DOMESTIC|SUM', id: 6, exclude_if_empty: false, bold: true },
    { field: 'AAR|Domestic|sum', label: 'AAR|DOMESTIC|SUM', id: 6, exclude_if_empty: false, bold: true },
    { field: 'LCC|Domestic|sum', label: 'LCC|DOMESTIC|SUM', id: 6, exclude_if_empty: false, bold: true },
    { field: 'KAL|Domestic|TSUM', label: 'KAL|SUM| ', id: 7, exclude_if_empty: false, bold: true },
    { field: 'AAR|Domestic|TSUM', label: 'AAR|SUM| ', id: 7, exclude_if_empty: false, bold: true },
    { field: 'LCC|Domestic|TSUM', label: 'LCC|SUM| ', id: 7, exclude_if_empty: false, bold: true },
    { field: '-|Foreign|PAX', label: 'FOREIGN|PAX| ', id: 8, exclude_if_empty: false },
    { field: '-|Foreign|CGO', label: 'FOREIGN|CGO| ', id: 9, exclude_if_empty: false },
    { field: '-|Foreign|sum', label: 'FOREIGN|SUM| ', id: 10, exclude_if_empty: false, bold: true },
    { field: 'ETC', label: 'ETC| | ', id: 11, exclude_if_empty: false },
    { field: 'F|S|U|M', label: 'SUM| | ', id: 12, exclude_if_empty: false, bold: true }
  ];
};

const getDayOfWeek = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[new Date(date).getDay()];
};