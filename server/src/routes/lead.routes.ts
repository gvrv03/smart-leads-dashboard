import { Router } from 'express';
import multer from 'multer';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  exportLeads,
  getLeadStats,
} from '../controllers/lead.controller';
import { importLeads } from '../controllers/import.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createLeadSchema, updateLeadSchema, updateLeadStatusSchema, leadFiltersSchema } from '../validators/lead.validator';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed.'));
    }
  },
});

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Export, import, and stats must be before :id route to avoid conflict
router.get('/export', requireRole('admin'), exportLeads);
router.get('/stats', getLeadStats);
router.post('/import', requireRole('admin'), upload.single('file'), importLeads);

router.get('/', validate(leadFiltersSchema, 'query'), getLeads);
router.get('/:id', getLeadById);
router.post('/', requireRole('admin'), validate(createLeadSchema), createLead);
router.put('/:id', requireRole('admin'), validate(updateLeadSchema), updateLead);
router.patch('/:id/status', validate(updateLeadStatusSchema), updateLeadStatus);
router.delete('/:id', requireRole('admin'), deleteLead);

export default router;
