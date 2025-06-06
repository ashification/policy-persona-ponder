
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X, FileText, ExternalLink, Loader2 } from 'lucide-react';

interface Policy {
  title: string;
  description: string;
  amendments: string[];
  sourceUrl?: string;
}

interface PolicySectionProps {
  policy: Policy;
  onUpdate: (policy: Policy) => void;
}

export const PolicySection = ({ policy, onUpdate }: PolicySectionProps) => {
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);

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

  const extractTextFromHtml = (html: string): string => {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove script and style elements
    const scripts = tempDiv.querySelectorAll('script, style, nav, header, footer, aside');
    scripts.forEach(el => el.remove());
    
    // Get all text content and clean it up
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up whitespace and format the text
    return textContent
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n\n') // Preserve paragraph breaks
      .trim();
  };

  const loadFromUrl = async () => {
    if (!policy.sourceUrl) return;
    
    setIsLoadingFromUrl(true);
    
    try {
      // Use a CORS proxy to fetch the webpage content
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(policy.sourceUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch webpage');
      }
      
      const data = await response.json();
      const htmlContent = data.contents;
      
      // Extract text content from the HTML
      const extractedText = extractTextFromHtml(htmlContent);
      
      // Try to extract a title from the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      const titleElement = tempDiv.querySelector('title, h1');
      const extractedTitle = titleElement?.textContent?.trim() || 'Policy Document';
      
      onUpdate({
        ...policy,
        title: extractedTitle,
        description: extractedText
      });
    } catch (error) {
      console.error('Error loading from URL:', error);
      // Fallback to simulate content if CORS proxy fails
      const fallbackContent = {
        title: "Healthcare Accessibility Act 2024",
        description: "Unable to fetch content from the provided URL due to CORS restrictions. Please copy and paste the policy content manually, or try using a different URL format."
      };
      
      onUpdate({
        ...policy,
        title: fallbackContent.title,
        description: fallbackContent.description
      });
    } finally {
      setIsLoadingFromUrl(false);
    }
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
            Policy Source URL (Optional)
          </label>
          <div className="flex gap-2">
            <Input
              value={policy.sourceUrl || ''}
              onChange={(e) => onUpdate({ ...policy, sourceUrl: e.target.value })}
              placeholder="https://example.gov/policy-document"
              className="flex-1"
            />
            <Button 
              onClick={loadFromUrl} 
              disabled={!policy.sourceUrl || isLoadingFromUrl}
              size="sm"
              variant="outline"
              className="gap-2 whitespace-nowrap"
            >
              {isLoadingFromUrl ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              Load Content
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Paste a link to automatically extract all text content from the webpage
          </p>
        </div>

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
