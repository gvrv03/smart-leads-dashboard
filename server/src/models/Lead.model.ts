import mongoose, { Document, Schema } from 'mongoose';
import { LeadStatus, LeadSource } from '../types/lead.types';

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website', 'Instagram', 'Referral'],
      required: [true, 'Source is required'],
    },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ email: 1 });

export const Lead = mongoose.model<ILeadDocument>('Lead', leadSchema);
