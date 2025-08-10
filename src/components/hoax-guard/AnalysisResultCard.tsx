import type { AnalysisResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Bot, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

const getLabelProps = (label: 'hoax' | 'tidak_hoax' | 'tidak_pasti') => {
  switch (label) {
    case 'hoax':
      return {
        text: 'Hoax',
        Icon: XCircle,
        badgeProps: { variant: 'destructive' as const },
        progressClass: '[&>div]:bg-destructive',
      };
    case 'tidak_hoax':
      return {
        text: 'Not Hoax',
        Icon: CheckCircle,
        badgeProps: { variant: 'default' as const, className: 'bg-accent text-accent-foreground hover:bg-accent/90' },
        progressClass: '[&>div]:bg-accent',
      };
    case 'tidak_pasti':
    default:
      return {
        text: 'Uncertain',
        Icon: HelpCircle,
        badgeProps: { variant: 'secondary' as const },
        progressClass: '[&>div]:bg-yellow-500', // Using a specific color for uncertainty
      };
  }
};

export function AnalysisResultCard({ result }: { result: AnalysisResult }) {
  const { label, confidence, rationale, references } = result;
  const { text, Icon, badgeProps, progressClass } = getLabelProps(label);

  return (
    <Card className="w-full mt-8 animate-in fade-in duration-500 shadow-lg">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-4">
            <div className='flex items-center gap-2'>
                <Bot className="w-8 h-8 text-primary" />
                <span className="text-2xl">AI Analysis Result</span>
            </div>
            <Badge {...badgeProps} className={`text-lg px-4 py-1 ${badgeProps.className || ''}`}>
                <Icon className="w-5 h-5 mr-2" />
                {text}
            </Badge>
        </CardTitle>
        <CardDescription>
          The AI has analyzed the content with a confidence level of {Math.round(confidence * 100)}%.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {result.type === 'image' && result.imageUrl && (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Analyzed Image</h3>
                 <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden border bg-muted/50">
                    <Image
                        src={result.imageUrl}
                        alt="Analyzed image"
                        fill
                        style={{objectFit: 'contain'}}
                    />
                </div>
            </div>
        )}
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Confidence Score</h3>
          <div className="flex items-center gap-4">
            <Progress value={confidence * 100} className={`w-full h-3 ${progressClass}`} />
            <span className="font-bold text-lg">{Math.round(confidence * 100)}%</span>
          </div>
        </div>
        
        <Separator />

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Rationale</h3>
          <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{rationale}</p>
        </div>

        {result.type === 'image' && result.ocr_text && (
            <>
                <Separator />
                <div className="space-y-2">
                <h3 className="font-semibold text-lg">Text Found in Image (OCR)</h3>
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 bg-primary/10 p-4 rounded-r-md">
                    {result.ocr_text}
                </blockquote>
                </div>
            </>
        )}
        
        {references && references.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">References</h3>
              <ul className="list-disc pl-5 space-y-2">
                {references.map((ref, index) => (
                  <li key={index}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
