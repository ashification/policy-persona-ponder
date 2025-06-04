import { useState } from 'react';
import { PersonaCard } from '@/components/PersonaCard';
import { PolicySection } from '@/components/PolicySection';
import { ConsequencesPanel } from '@/components/ConsequencesPanel';
import { Button } from '@/components/ui/button';
import { Plus, Brain } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  description: string;
  demographics: string;
}

interface Policy {
  title: string;
  description: string;
  amendments: string[];
  sourceUrl?: string;
}

const Index = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [policy, setPolicy] = useState<Policy>({
    title: '',
    description: '',
    amendments: [],
    sourceUrl: ''
  });
  const [consequences, setConsequences] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addPersona = () => {
    const newPersona: Persona = {
      id: Date.now().toString(),
      name: '',
      description: '',
      demographics: ''
    };
    setPersonas([...personas, newPersona]);
  };

  const updatePersona = (id: string, updates: Partial<Persona>) => {
    setPersonas(personas.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removePersona = (id: string) => {
    setPersonas(personas.filter(p => p.id !== id));
  };

  const analyzeConsequences = async () => {
    if (!policy.title || personas.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockConsequences = [
      `For ${personas[0]?.name || 'Young Professionals'}: Increased burden of compliance documentation may reduce time available for core work activities`,
      `For ${personas[1]?.name || 'Small Business Owners'}: Administrative costs could disproportionately impact businesses with limited resources`,
      `For ${personas[2]?.name || 'Elderly Citizens'}: Digital-first implementation may create accessibility barriers`,
      `Positive: Enhanced transparency could increase public trust in government processes`,
      `Unintended: May create new bureaucratic bottlenecks during transition period`
    ];
    
    setConsequences(mockConsequences);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Policy Impact Analyzer</h1>
          </div>
          <p className="text-gray-600 mt-2">Analyze unintended consequences of government policies through persona-based evaluation</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Personas Column */}
          <div className="bg-white rounded-lg shadow-sm border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personas</h2>
              <Button onClick={addPersona} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Persona
              </Button>
            </div>
            
            <div className="space-y-4">
              {personas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No personas added yet.</p>
                  <p className="text-sm mt-1">Click "Add Persona" to get started.</p>
                </div>
              ) : (
                personas.map(persona => (
                  <PersonaCard
                    key={persona.id}
                    persona={persona}
                    onUpdate={(updates) => updatePersona(persona.id, updates)}
                    onRemove={() => removePersona(persona.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Policy Column */}
          <div className="bg-white rounded-lg shadow-sm border p-6 overflow-y-auto">
            <PolicySection policy={policy} onUpdate={setPolicy} />
          </div>

          {/* Consequences Column */}
          <div className="bg-white rounded-lg shadow-sm border p-6 overflow-y-auto">
            <ConsequencesPanel
              consequences={consequences}
              isAnalyzing={isAnalyzing}
              onAnalyze={analyzeConsequences}
              canAnalyze={policy.title.length > 0 && personas.length > 0}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
