
import React from 'react';
import Button from './ui/button';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  index: number;
}

const PricingTier = ({ name, price, description, features, isPopular, index }: PricingTierProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl border p-6 animate-fade-in opacity-0",
        isPopular 
          ? "border-clipvobe-cyan/30 relative" 
          : "border-white/10",
      )}
      style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-clipvobe-cyan text-clipvobe-dark px-3 py-1 rounded-full text-xs font-semibold">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <div className="text-3xl font-bold text-white mb-2">{price}</div>
        <p className="text-clipvobe-gray-400 text-sm">{description}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-clipvobe-gray-200">
            <Check className="w-5 h-5 text-clipvobe-cyan shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={isPopular ? 'primary' : 'outline'} 
        className="w-full"
      >
        Get Started
      </Button>
    </div>
  );
};

const PricingSection = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0/month",
      description: "To Check",
      features: [
        "Limited Access To title generator",
        "Limited Access To Hashtag and Tags Generator",
        "Limited Access To Description Generator",
        "Limited Access To Script Generator",
        "Limited Access To Idea Generator",
        "No Access To Multi-Platform Post Generator"
      ]
    },
    {
      name: "Basic",
      price: "$5/month",
      description: "Perfect for hobbyists and new creators",
      features: [
        "Access To Title Generator",
        "Access To Description Generator",
        "Access Advanced script writing",
        "Access To Hashtag and Tags Generator",
        "Access To Idea Finder",
        "Limited Access To Multi-Platform Post Generator"
      ],
      isPopular: true
    },
    {
      name: "Pro",
      price: "$15/month",
      description: "For professional content creators",
      features: [
        "",
       "Access To Title Generator",
        "Access To Description Generator",
        "Access Advanced script writing",
        "Access To Hashtag and Tags Generator",
        "Access To Idea Finder",
        "Complete Access To Multi-Platform Post Generator"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-clipvobe-dark relative">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-clipvobe-gray-900 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-clipvobe-gray-300">
            Choose the plan that fits your content creation needs. All plans include access to our core AI features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingTier
              key={index}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              isPopular={tier.isPopular}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center text-clipvobe-gray-400 animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          All plans include a 14-day money-back guarantee. No credit card required to try.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
