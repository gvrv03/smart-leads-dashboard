import { Request, Response, NextFunction } from 'express';
import { FilterQuery } from 'mongoose';
import { Lead, ILeadDocument } from '../models/Lead.model';
import { sendSuccess, sendError } from '../utils/response.utils';
import { generateCSV } from '../utils/csv.utils';
import { ICreateLeadDTO, IUpdateLeadDTO, ILeadFilters } from '../types/lead.types';

export const getLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      status,
      source,
      search,
      sort = 'latest',
      page = 1,
      limit = 10,
    } = req.query as unknown as ILeadFilters;

    const query: FilterQuery<ILeadDocument> = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(limitNum),
      Lead.countDocuments(query),
    ]);

    sendSuccess(res, {
      leads,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      sendError(res, 'Lead not found.', 404);
      return;
    }

    sendSuccess(res, lead);
  } catch (error) {
    next(error);
  }
};

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, status, source } = req.body as ICreateLeadDTO;

    const lead = await Lead.create({ name, email, status, source });
    sendSuccess(res, lead, 201, 'Lead created successfully.');
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body as IUpdateLeadDTO;

    const lead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      sendError(res, 'Lead not found.', 404);
      return;
    }

    sendSuccess(res, lead, 200, 'Lead updated successfully.');
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: string };

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      sendError(res, 'Lead not found.', 404);
      return;
    }

    sendSuccess(res, lead, 200, 'Lead status updated successfully.');
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      sendError(res, 'Lead not found.', 404);
      return;
    }

    sendSuccess(res, null, 200, 'Lead deleted successfully.');
  } catch (error) {
    next(error);
  }
};

export const exportLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, source, search, sort = 'latest' } = req.query as unknown as ILeadFilters;

    const query: FilterQuery<ILeadDocument> = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;
    const leads = await Lead.find(query).sort({ createdAt: sortOrder });

    const csv = generateCSV(leads);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

export const getLeadStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { from, to } = req.query as { from?: string; to?: string };

    const dateFilter: FilterQuery<ILeadDocument> = {};
    if (from || to) {
      dateFilter.createdAt = {};
      if (from) dateFilter.createdAt.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        dateFilter.createdAt.$lte = toDate;
      }
    }

    const [statusStats, sourceStats, total, dailyStats] = await Promise.all([
      Lead.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$source', count: { $sum: 1 } } },
      ]),
      Lead.countDocuments(dateFilter),
      Lead.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const statusMap: Record<string, number> = { New: 0, Contacted: 0, Qualified: 0, Lost: 0 };
    statusStats.forEach((s: { _id: string; count: number }) => {
      statusMap[s._id] = s.count;
    });

    const sourceMap: Record<string, number> = { Website: 0, Instagram: 0, Referral: 0 };
    sourceStats.forEach((s: { _id: string; count: number }) => {
      sourceMap[s._id] = s.count;
    });

    sendSuccess(res, {
      total,
      byStatus: statusMap,
      bySource: sourceMap,
      daily: dailyStats.map((d: { _id: string; count: number }) => ({
        date: d._id,
        count: d.count,
      })),
    });
  } catch (error) {
    next(error);
  }
};
