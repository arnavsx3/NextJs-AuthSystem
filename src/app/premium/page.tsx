"use client";

import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    storage: "500 MB",
    features: ["500 MB storage", "Max 5 MB per photo"],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Premium",
    price: "$4",
    period: "per month",
    storage: "50 GB",
    features: ["50 GB storage", "Max 25 MB per photo", "Priority support"],
    cta: "Upgrade Now",
    disabled: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    storage: "500 GB",
    features: ["500 GB storage", "Unlimited photo size", "Priority support"],
    cta: "Go Pro",
    disabled: false,
  },
];

export default function PremiumPage() {
     const router = useRouter();
 return (
   <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-12">
     <h1 className="text-3xl font-bold mb-2">Choose a Plan</h1>
     <p className="text-gray-400 mb-10 text-sm">
       Upgrade for more storage and features.
     </p>

     <div className="flex flex-col md:flex-row gap-5 w-full max-w-3xl">
       {plans.map((plan) => (
         <div
           key={plan.name}
           className="flex-1 rounded-2xl p-6 flex flex-col gap-4 border border-gray-600 bg-gray-700">
           <div>
             <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
               {plan.name}
             </p>
             <p className="text-3xl font-bold">
               {plan.price}{" "}
               <span className="text-sm text-gray-400 font-normal">
                 / {plan.period}
               </span>
             </p>
             <p className="text-blue-400 font-medium mt-1">
               {plan.storage} storage
             </p>
           </div>

           <ul className="flex flex-col gap-1.5 flex-1">
             {plan.features.map((f) => (
               <li
                 key={f}
                 className="text-sm text-gray-300 flex items-center gap-2">
                 <span className="text-blue-400">✓</span> {f}
               </li>
             ))}
           </ul>

           <button
             disabled={plan.disabled}
             onClick={() => !plan.disabled && router.push("/")}
             className={`w-full py-2.5 rounded-lg text-sm font-semibold transition
                ${
                  plan.disabled
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}>
             {plan.cta}
           </button>
         </div>
       ))}
     </div>
   </div>
 );
}
