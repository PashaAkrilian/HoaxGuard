'use client';

import React, { useState, useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleTextAnalysis, handleImageAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { AnalysisResultCard } from './AnalysisResultCard';
import type { AnalysisResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const initialTextState: AnalysisResult | { error?: string } = {};
const initialImageState: AnalysisResult | { error?: string } = {};

function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Analyzing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function AnalysisForm() {
  const { toast } = useToast();
  const [textState, textFormAction] = useActionState(handleTextAnalysis, initialTextState);
  const [imageState, imageFormAction] = useActionState(handleImageAnalysis, initialImageState);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [inputType, setInputType] = useState('url');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const imageDataUriInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textState && 'label' in textState) {
      setResult(textState as AnalysisResult);
    } else if (textState?.error) {
      toast({ variant: 'destructive', title: 'Analysis Error', description: textState.error });
    }
  }, [textState, toast]);

  useEffect(() => {
    if (imageState && 'label' in imageState) {
      setResult(imageState as AnalysisResult);
    } else if (imageState?.error) {
      toast({ variant: 'destructive', title: 'Analysis Error', description: imageState.error });
    }
  }, [imageState, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({ variant: 'destructive', title: 'File too large', description: 'Please upload an image smaller than 4MB.' });
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setFilePreview(dataUri);
        if (imageDataUriInput.current) {
          imageDataUriInput.current.value = dataUri;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    hiddenFileInput.current?.click();
  };
  
  const onTabChange = () => {
    setResult(null);
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="text" className="w-full" onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4" />Text</TabsTrigger>
          <TabsTrigger value="image"><ImageIcon className="mr-2 h-4 w-4" />Image</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <form action={textFormAction} className="space-y-4 pt-4">
            <Label htmlFor="text-input" className="text-lg font-semibold">Enter Text to Analyze</Label>
            <Textarea
              id="text-input"
              name="text"
              placeholder="Paste news articles, social media posts, or any text you want to fact-check..."
              rows={8}
              required
              minLength={10}
              className="text-base"
            />
            <FormSubmitButton>Analyze Text</FormSubmitButton>
          </form>
        </TabsContent>
        <TabsContent value="image">
            <form action={imageFormAction} className="space-y-6 pt-4">
              <input type="hidden" name="inputType" value={inputType} />
              <input type="hidden" name="imageDataUri" ref={imageDataUriInput} />
              
              <RadioGroup defaultValue="url" onValueChange={setInputType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="url" id="url" />
                      <Label htmlFor="url" className="text-lg cursor-pointer">From URL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="upload" />
                      <Label htmlFor="upload" className="text-lg cursor-pointer">Upload File</Label>
                  </div>
              </RadioGroup>
              
              {inputType === 'url' ? (
                <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="text-lg font-semibold">Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" required className="text-base"/>
                </div>
              ) : (
                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Upload Image</Label>
                    <div
                      className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary bg-primary/5"
                      onClick={handleUploadClick}
                    >
                      {filePreview ? (
                        <div className="relative w-full h-full">
                           <Image src={filePreview} alt="Preview" fill style={{ objectFit: 'contain' }} className="p-2"/>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-12 h-12 text-muted-foreground"/>
                          <p className="text-muted-foreground mt-2">Click to browse or drag & drop</p>
                        </>
                      )}
                    </div>
                     {fileName && <p className="text-sm text-center text-foreground/80 mt-1">{fileName}</p>}
                    <Input ref={hiddenFileInput} onChange={handleFileChange} type="file" accept="image/png, image/jpeg, image/webp" className="hidden" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="hint" className="text-lg font-semibold">
                  Hint (Optional)
                </Label>
                <Textarea id="hint" name="hint" placeholder="Provide any context about the image, e.g., 'Is this photo from the 2024 protest?'" rows={3} className="text-base"/>
              </div>

              <FormSubmitButton>Analyze Image</FormSubmitButton>
            </form>
        </TabsContent>
      </Tabs>
      
      {result && <AnalysisResultCard result={result} />}
    </div>
  );
}
