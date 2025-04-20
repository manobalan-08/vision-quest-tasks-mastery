
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { quotes } from "@/data/quotes";
import { useAppContext } from "@/context/AppContext";
import { Quote, BookOpen } from "lucide-react";

export function Quotes() {
  const { getRandomQuoteIndex } = useAppContext();
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  useEffect(() => {
    setQuoteIndex(getRandomQuoteIndex());
    
    // Change quote every 30 seconds
    const interval = setInterval(() => {
      setQuoteIndex(getRandomQuoteIndex());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [getRandomQuoteIndex]);
  
  const currentQuote = quotes[quoteIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <BookOpen className="mr-2 h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-bold">Inspiration & Quotes</h2>
      </div>
      
      <Card className="overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img 
                src={currentQuote.image} 
                alt={currentQuote.author} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-center">
              <Quote className="h-8 w-8 mb-4 opacity-50" />
              <p className="text-lg md:text-xl font-medium mb-4 italic">
                "{currentQuote.text}"
              </p>
              <p className="text-sm md:text-base font-bold">— {currentQuote.author}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
