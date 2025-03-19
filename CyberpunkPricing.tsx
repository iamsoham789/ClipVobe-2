import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface PlanFeature {
  name: string;
  free: string;
  basic: string;
  pro: string;
}

const CyberpunkPricing = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features: PlanFeature[] = [
    { name: "AI Video Titles", free: "5 titles", basic: "40 titles", pro: "100 titles" },
    { name: "AI Video Descriptions", free: "1 description", basic: "10 descriptions", pro: "30 descriptions" },
    { name: "AI Hashtag and Tag Generator", free: "5–10 hashtags", basic: "10 sets", pro: "25 sets" },
    { name: "AI Idea Finder", free: "5 ideas", basic: "10 ideas", pro: "25 ideas" },
    { name: "AI Tweet Generator", free: "1 tweet", basic: "5 tweets", pro: "12 tweets" },
    { name: "AI LinkedIn Post Generator", free: "1 post", basic: "5 posts", pro: "12 posts" },
    { name: "AI Reddit Post Generator", free: "1 post", basic: "5 posts", pro: "12 posts" },
    { name: "AI YouTube Community Post Generator", free: "1 post ", basic: "5 posts", pro: "12 posts " },
    { name: "AI Script Generator (Small, Medium, Large)", free: "-", basic: "2 scripts", pro: "5 scripts" }
  ];

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-clipvobe-dark"
    >
      {/* Background Elements with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-clipvobe-cyan/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-red-600/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0,transparent_60%)]"></div>
      </div>

      {/* Grid lines for cyberpunk effect with subtle animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className={cn(
          "text-center space-y-4 mb-16 opacity-0",
          inView ? "animate-fade-in-up" : ""
        )} style={{ animationDuration: "0.8s" }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white relative inline-block">
            <span className="relative z-10">Pick the Perfect Plan & Start Creating</span>
            <span className="absolute -inset-1 bg-gradient-to-r from-clipvobe-cyan/0 via-clipvobe-cyan/20 to-clipvobe-cyan/0 blur-lg z-0 animate-pulse-strong"></span>
          </h2>
          <p className="text-clipvobe-gray-300 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your content creation needs. All plans include access to our core AI features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div 
            className={cn(
              "pricing-card bg-black/40 backdrop-blur-sm rounded-xl border border-clipvobe-gray-700 overflow-hidden relative group transition-all duration-500 opacity-0",
              inView ? "animate-fade-in-up" : ""
            )}
            style={{ animationDelay: "0.1s", animationDuration: "0.8s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-clipvobe-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border border-clipvobe-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-[1.02] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"></div>

            <div className="p-8 relative">
              <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">$0.00</span>
                <span className="text-clipvobe-gray-400 ml-2">/month</span>
              </div>
              <p className="text-clipvobe-gray-300 mb-6">Perfect for trying out the platform</p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-clipvobe-gray-200 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 0.05}s` }}>
                    <Check className="w-5 h-5 text-clipvobe-cyan shrink-0 mt-0.5" />
                    <span><span className="text-white font-medium">{feature.free}</span> {feature.name}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="outline" 
                className="w-full group-hover:bg-clipvobe-cyan group-hover:text-clipvobe-dark group-hover:border-clipvobe-cyan transition-all duration-500 ripple"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Basic Plan */}
          <div 
            className={cn(
              "pricing-card bg-black/40 backdrop-blur-sm rounded-xl border border-clipvobe-gray-700 overflow-hidden relative group transition-all duration-500 opacity-0",
              inView ? "animate-fade-in-up" : ""
            )}
            style={{ animationDelay: "0.2s", animationDuration: "0.8s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-clipvobe-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border border-clipvobe-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-[1.02] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"></div>

            <div className="p-8 relative">
              <h3 className="text-xl font-bold text-white mb-2">Basic Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">$5</span>
                <span className="text-clipvobe-gray-400 ml-2">/month</span>
              </div>
              <p className="text-clipvobe-gray-300 mb-6">Perfect for hobbyists and new creators</p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-clipvobe-gray-200 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 0.05}s` }}>
                    <Check className="w-5 h-5 text-clipvobe-cyan shrink-0 mt-0.5" />
                    <span><span className="text-white font-medium">{feature.basic}</span> {feature.name}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="outline" 
                className="w-full group-hover:bg-clipvobe-cyan group-hover:text-clipvobe-dark group-hover:border-clipvobe-cyan transition-all duration-500 ripple"
                onClick={async () => {
                  const stripe = await stripePromise;
                  if (!stripe) return;

                  const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      priceId: process.env.VITE_STRIPE_BASIC_PRICE_ID,
                      plan: 'basic'
                    }),
                  });

                  const { sessionId } = await response.json();
                  await stripe.redirectToCheckout({ sessionId });
                }}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Pro Plan (Popular) */}
          <div 
            className={cn(
              "pricing-card bg-black/40 backdrop-blur-sm rounded-xl border border-clipvobe-cyan/30 overflow-hidden relative group transition-all duration-500 opacity-0",
              inView ? "animate-fade-in-up" : ""
            )}
            style={{ animationDelay: "0.3s", animationDuration: "0.8s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-clipvobe-cyan/10 to-transparent opacity-70 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border border-clipvobe-cyan/40 rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-500 scale-[1.01] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.25)]"></div>

            {/* Popular badge with enhanced animation */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-clipvobe-cyan text-clipvobe-dark px-4 py-1 rounded-full text-sm font-semibold z-10 shadow-[0_0_15px_rgba(0,255,255,0.5)] animate-pulse-strong">
              POPULAR
            </div>

            <div className="p-8 relative">
              <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">$15</span>
                <span className="text-clipvobe-gray-400 ml-2">/month</span>
              </div>
              <p className="text-clipvobe-gray-300 mb-6">Ideal for growing YouTube channels</p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-clipvobe-gray-200 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 0.05}s` }}>
                    <Check className="w-5 h-5 text-clipvobe-cyan shrink-0 mt-0.5" />
                    <span><span className="text-white font-medium">{feature.pro}</span> {feature.name}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="primary" 
                className="w-full shadow-[0_0_20px_rgba(0,255,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-500 ripple animate-pulse-strong"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className={cn(
          "mt-16 text-center text-clipvobe-gray-400 opacity-0",
          inView ? "animate-fade-in-up" : ""
        )} style={{ animationDelay: "0.4s" }}>
          <p className="mb-2">Need more? Additional feature credits available for purchase.</p>
          <p>All plans include a 3-day money-back guarantee.</p>
        </div>
      </div>
    </section>
  );
};

export default CyberpunkPricing;