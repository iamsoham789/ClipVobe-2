import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { toast } from 'react-hot-toast';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function resetMonthlyUsage(userId) {
  try {
    // Replace with your actual Supabase function call to reset usage counters
    // This is a placeholder, adapt to your Supabase schema and functions.  Example below assumes a table called 'usage'
    const { error } = await supabase
      .from('usage')
      .update({ usage_count: 0 })
      .eq('user_id', userId);
    if (error) throw error;
  } catch (error) {
    console.error('Error resetting monthly usage:', error);
    throw error; // Re-throw to be caught by createSubscription
  }
}

async function initializeUsageCounters(userId) {
  try {
    // Replace with your actual Supabase function call to initialize usage counters
    // This is a placeholder, adapt to your Supabase schema and functions. Example below assumes a table called 'usage'
    const { error } = await supabase
      .from('usage')
      .insert([{ user_id: userId, usage_count: 0 }]);
    if (error) throw error;
  } catch (error) {
    console.error('Error initializing usage counters:', error);
    throw error; // Re-throw to be caught by createSubscription
  }
}


async function createSubscription(userId, plan) {
  try {
    // Check if user already has a subscription
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingSub) {
      // Update existing subscription
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ 
          plan: plan,
          status: 'active',
          expires_at: new Date(Date.now() + 2592000000),
          renewed_at: new Date()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Reset usage counters
      await resetMonthlyUsage(userId);
    } else {
      // Create new subscription
      const { error: insertError } = await supabase
        .from('subscriptions')
        .insert([{ 
          user_id: userId, 
          plan: plan, 
          status: 'active', 
          expires_at: new Date(Date.now() + 2592000000),
          renewed_at: new Date()
        }]);

      if (insertError) throw insertError;

      // Initialize usage counters
      await initializeUsageCounters(userId);
    }
    return true;
  } catch (error) {
    console.error('Error managing subscription:', error);
    return false;
  }
}


function Pricing() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const loadStripe = async () => {
      const stripe = await import('@stripe/stripe-js');
      setStripePromise(stripe.loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY));
    }
    loadStripe();
  }, []);

  return (
    <div>
      {/* ... other pricing plan components ... */}
      <div className="border p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
        <p className="text-gray-700 mb-4">
          Enjoy essential features for a monthly fee.
        </p>
        <button
          onClick={async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              toast.error('Please sign in first');
              return;
            }
            try {
              const success = await createSubscription(user.id, 'basic');
              if (success) {
                toast.success('Basic plan subscription activated!');
              } else {
                toast.error('Failed to activate subscription');
              }
            } catch (error) {
              toast.error('Error processing subscription');
              console.error(error);
            }
          }}
          className="w-full bg-pink-500 text-black py-2 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Get Started
        </button>
      </div>
      <div className="border p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
        <p className="text-gray-700 mb-4">
          Unlock advanced features with our Pro plan.
        </p>
        <button
          onClick={async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              toast.error('Please sign in first');
              return;
            }

            const stripe = await stripePromise;
            if (!stripe) return;

            const response = await fetch('/api/create-checkout-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                priceId: process.env.VITE_STRIPE_PRO_PRICE_ID,
                plan: 'pro'
              }),
            });

            const { sessionId } = await response.json();
            await stripe.redirectToCheckout({ sessionId });
          }}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </button>
      </div>
      {/* ... other pricing plan components ... */}
    </div>
  );
}

export default Pricing;