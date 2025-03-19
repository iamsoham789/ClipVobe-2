import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { toast } from 'react-hot-toast';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function createSubscription(userId, plan) {
  try {
    //  Replace with your actual Supabase function call to create a subscription
    // This is a placeholder, adapt to your Supabase schema and functions
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{ user_id: userId, plan: plan, status: 'active', expires_at: new Date(Date.now() + 2592000000) }]) // Adding expiry date (1 month)

    if (error) {
      console.error('Error creating subscription:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error creating subscription:', error);
    return false;
  }
}


function Pricing() {
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
      {/* ... other pricing plan components ... */}
    </div>
  );
}

export default Pricing;