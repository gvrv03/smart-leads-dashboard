'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLeadByIdApi } from '@/api/leads.api';
import { useLeads } from '@/hooks/useLeads';
import { useAuthStore } from '@/store/auth.store';
import { ILead, ICreateLeadDTO } from '@/types/lead.types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LeadDetailCard } from '@/components/leads/LeadDetailCard';
import { LeadForm } from '@/components/leads/LeadForm';
import { DeleteLeadDialog } from '@/components/leads/DeleteLeadDialog';
import { FadeIn } from '@/components/ui/motion';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { ArrowLeft, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { updateLead, deleteLead } = useLeads();

  const [lead, setLead] = useState<ILead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const id = params.id as string;

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await getLeadByIdApi(id);
        setLead(data);
      } catch {
        setError('Failed to load lead details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleUpdate = async (data: ICreateLeadDTO) => {
    try {
      await updateLead(id, data);
      const updated = await getLeadByIdApi(id);
      setLead(updated);
      toast.success('Lead updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLead(id);
      toast.success('Lead deleted successfully');
      router.push('/leads');
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <Skeleton className="h-9 w-24" />
        <Card className="shadow-sm overflow-hidden">
          <div className="bg-muted/30 px-6 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Card className="shadow-sm border-destructive/20">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-destructive">Error</p>
              <p className="text-sm text-muted-foreground">{error || 'Lead not found.'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <FadeIn direction="up" duration={0.4}>
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Leads
          </Button>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsFormOpen(true)} className="gap-2">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)} className="gap-2">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Lead Detail */}
        <LeadDetailCard lead={lead} />

        {/* Dialogs */}
        <LeadForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleUpdate}
          lead={lead}
        />

        <DeleteLeadDialog
          open={isDeleteOpen}
          lead={lead}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </FadeIn>
  );
}
