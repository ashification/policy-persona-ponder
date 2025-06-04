
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Brain, Loader2 } from 'lucide-react';

interface ConsequencesPanelProps {
  consequences: string[];
  isAnalyzing: boolean;
  onAnalyze: () => void;
  canAnalyze: boolean;
}

export const ConsequencesPanel = ({ 
  consequences, 
  isAnalyzing, 
  onAnalyze, 
  canAnalyze 
}: ConsequencesPanelProps) => {
  const getConsequenceIcon = (consequence: string) => {
    if (consequence.toLowerCase().includes('positive') || consequence.toLowerCase().includes('enhanced')) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  };

  const getConsequenceStyle = (consequence: string) => {
    if (consequence.toLowerCase().includes('positive') || consequence.toLowerCase().includes('enhanced')) {
      return 'border-l-4 border-l-green-500 bg-green-50';
    }
    return 'border-l-4 border-l-amber-500 bg-amber-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Impact Analysis</h2>
        </div>
        
        <Button 
          onClick={onAnalyze}
          disabled={!canAnalyze || isAnalyzing}
          className="gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Analyze Impact
            </>
          )}
        </Button>
      </div>

      {!canAnalyze && !isAnalyzing && consequences.length === 0 && (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Ready to Analyze</h3>
            <p className="text-gray-600 text-sm">
              Add at least one persona and a policy title to begin the impact analysis.
            </p>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-3 animate-spin" />
            <h3 className="font-medium text-blue-900 mb-2">Analyzing Impact</h3>
            <p className="text-blue-700 text-sm">
              Evaluating potential consequences across all personas...
            </p>
          </CardContent>
        </Card>
      )}

      {consequences.length > 0 && !isAnalyzing && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 mb-4">Potential Unintended Consequences</h3>
          {consequences.map((consequence, index) => (
            <Card key={index} className={`transition-all duration-200 hover:shadow-sm ${getConsequenceStyle(consequence)}`}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {getConsequenceIcon(consequence)}
                  <p className="text-sm text-gray-700 leading-relaxed">{consequence}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Analysis based on provided personas and policy details. Results are for informational purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
