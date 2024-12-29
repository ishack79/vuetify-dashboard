import ExcelJS from 'exceljs';

export const exportToExcel = async (headers, data, filename = 'export.xlsx') => {
  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  // Add header row
  worksheet.columns = headers.map(header => ({ header: header.title, key: header.key }));

  // Add data rows
  data.forEach(item => {
    const row = {};
    headers.forEach(header => {
      row[header.key] = item[header.key];
    });
    worksheet.addRow(row);
  });

  // Write to file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};