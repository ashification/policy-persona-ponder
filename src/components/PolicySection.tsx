
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X, FileText } from 'lucide-react';

interface Policy {
  title: string;
  description: string;
  amendments: string[];
}

interface PolicySectionProps {
  policy: Policy;
  onUpdate: (policy: Policy) => void;
}

export const PolicySection = ({ policy, onUpdate }: PolicySectionProps) => {
  const addAmendment = () => {
    onUpdate({
      ...policy,
      amendments: [...policy.amendments, '']
    });
  };

  const updateAmendment = (index: number, value: string) => {
    const newAmendments = [...policy.amendments];
    newAmendments[index] = value;
    onUpdate({
      ...policy,
      amendments: newAmendments
    });
  };

  const removeAmendment = (index: number) => {
    onUpdate({
      ...policy,
      amendments: policy.amendments.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Government Policy</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Policy Title
          </label>
          <Input
            value={policy.title}
            onChange={(e) => onUpdate({ ...policy, title: e.target.value })}
            placeholder="Enter the policy title..."
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Policy Description
          </label>
          <Textarea
            value={policy.description}
            onChange={(e) => onUpdate({ ...policy, description: e.target.value })}
            placeholder="Describe the current policy, its objectives, and key provisions..."
            rows={6}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">
              Suggested Amendments
            </label>
            <Button onClick={addAmendment} size="sm" variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Amendment
            </Button>
          </div>
          
          <div className="space-y-3">
            {policy.amendments.length === 0 ? (
              <p className="text-gray-500 text-sm italic py-4 text-center">
                No amendments added yet. Click "Add Amendment" to suggest changes.
              </p>
            ) : (
              policy.amendments.map((amendment, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={amendment}
                    onChange={(e) => updateAmendment(index, e.target.value)}
                    placeholder={`Amendment ${index + 1}...`}
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeAmendment(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
