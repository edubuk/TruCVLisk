
import { Link } from 'react-router-dom';
import { useUserData } from '@/context/AuthContext';

export default function ProfilePopup({openProfile}: {openProfile: boolean}) {
const {userEmail,subscriptionPlan} = useUserData();
console.log("userData",userEmail,subscriptionPlan)
  return (
    <div className={`absolute right-4 top-16 w-72 rounded-lg shadow-lg border border-gray-200 bg-white p-4 z-50 ${openProfile ? 'block' : 'hidden'}`}>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={localStorage.getItem('userImage') as string}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border border-[#006666]"
        />
        <div>
          <p className="text-[#03257e] font-semibold">{localStorage.getItem('userName') as string}</p>
          <p className="text-gray-600 text-sm">{localStorage.getItem('email') as string}</p>
        </div>
      </div>

      <div className="border-t pt-3">
        <p className="text-sm text-[#006666] mb-1">
          <span className="font-semibold">Current Plan:</span>{' '}
          <span className={`font-semibold ${subscriptionPlan === 'Pro' ? 'text-[#03257e]' : 'text-[#f14419]'}`}>
            {subscriptionPlan}
          </span>
        </p>

        {subscriptionPlan === 'Free' && (
          <button
        
            className="mt-3 w-full bg-[#f14419] text-white text-sm font-semibold py-2 px-4 rounded hover:bg-[#d93e18] transition"
          >
            <Link to="/subscription"> 🔓 Upgrade to Pro</Link>
          </button>
        )}

        {subscriptionPlan === 'Pro' && (
          <p className="text-xs text-[#03257e] mt-2">✅ You’re on the Pro plan</p>
        )}
      </div>
    </div>
  );
}
