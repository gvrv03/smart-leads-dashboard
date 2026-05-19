import { Request, Response, NextFunction } from 'express';
import { Lead } from '../models/Lead.model';
import { sendSuccess, sendError } from '../utils/response.utils';

interface CsvRow {
  name: string;
  email: string;
  status: string;
  source: string;
}

const VALID_STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'];
const VALID_SOURCES = ['Website', 'Instagram', 'Referral'];

export const importLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      sendError(res, 'No file uploaded.', 400);
      return;
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const lines = csvContent.split(/\r?\n/).filter((line) => line.trim());

    if (lines.length < 2) {
      sendError(res, 'CSV file must have a header row and at least one data row.', 400);
      return;
    }

    // Parse header
    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const nameIdx = headers.indexOf('name');
    const emailIdx = headers.indexOf('email');
    const statusIdx = headers.indexOf('status');
    const sourceIdx = headers.indexOf('source');

    if (nameIdx === -1 || emailIdx === -1 || statusIdx === -1 || sourceIdx === -1) {
      sendError(
        res,
        'CSV must have columns: Name, Email, Status, Source',
        400
      );
      return;
    }

    // Parse rows
    const rows: CsvRow[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      const name = cols[nameIdx]?.trim();
      const email = cols[emailIdx]?.trim();
      const status = cols[statusIdx]?.trim();
      const source = cols[sourceIdx]?.trim();

      if (!name || !email || !status || !source) {
        errors.push(`Row ${i + 1}: Missing required fields.`);
        continue;
      }

      if (name.length < 2) {
        errors.push(`Row ${i + 1}: Name must be at least 2 characters.`);
        continue;
      }

      if (!email.includes('@')) {
        errors.push(`Row ${i + 1}: Invalid email format.`);
        continue;
      }

      if (!VALID_STATUSES.includes(status)) {
        errors.push(`Row ${i + 1}: Invalid status "${status}". Must be one of: ${VALID_STATUSES.join(', ')}`);
        continue;
      }

      if (!VALID_SOURCES.includes(source)) {
        errors.push(`Row ${i + 1}: Invalid source "${source}". Must be one of: ${VALID_SOURCES.join(', ')}`);
        continue;
      }

      rows.push({ name, email, status, source });
    }

    if (rows.length === 0) {
      sendError(res, `No valid rows found. Errors: ${errors.join('; ')}`, 400);
      return;
    }

    // Insert valid rows
    const inserted = await Lead.insertMany(rows);

    sendSuccess(
      res,
      {
        imported: inserted.length,
        failed: errors.length,
        errors: errors.slice(0, 10), // Return first 10 errors
        total: lines.length - 1,
      },
      201,
      `Successfully imported ${inserted.length} leads.`
    );
  } catch (error) {
    next(error);
  }
};

// Simple CSV line parser that handles quoted fields
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
