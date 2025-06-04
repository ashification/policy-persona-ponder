
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, User, Edit3 } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  description: string;
  demographics: string;
}

interface PersonaCardProps {
  persona: Persona;
  onUpdate: (updates: Partial<Persona>) => void;
  onRemove: () => void;
}

export const PersonaCard = ({ persona, onUpdate, onRemove }: PersonaCardProps) => {
  const [isEditing, setIsEditing] = useState(!persona.name);

  const handleSave = () => {
    if (persona.name.trim()) {
      setIsEditing(false);
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            {isEditing ? (
              <Input
                value={persona.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Persona name"
                className="text-sm font-medium"
                autoFocus
              />
            ) : (
              <h3 className="font-medium text-gray-900">{persona.name || 'Unnamed Persona'}</h3>
            )}
          </div>
          <div className="flex gap-1">
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Description
          </label>
          <Textarea
            value={persona.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe this persona's role, interests, and situation..."
            className="mt-1 text-sm"
            rows={3}
            disabled={!isEditing && persona.name}
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Demographics
          </label>
          <Textarea
            value={persona.demographics}
            onChange={(e) => onUpdate({ demographics: e.target.value })}
            placeholder="Age, income, location, education, family status..."
            className="mt-1 text-sm"
            rows={2}
            disabled={!isEditing && persona.name}
          />
        </div>
        
        {isEditing && (
          <Button onClick={handleSave} size="sm" className="w-full">
            Save Persona
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
