// import { LuCalendarDays, LuPhoneCall, LuBuilding2, LuClock } from "react-icons/lu";
// import { TbFlame } from "react-icons/tb";

// function LeadCard({ item }) {
//   return (
//     <div
//       className="flex-1 min-w-[300px] rounded-2xl p-5 flex flex-col gap-4"
//       style={{
//         backgroundColor: "#161616",
//         border: "1px solid rgba(255,255,255,0.06)",
//       }}
//     >

//       {/* ==========================================
//           TOP — Avatar + Name + Priority
//       ========================================== */}
//       <div className="flex items-start justify-between gap-3">

//         {/* Avatar + Online dot */}
//         <div className="flex items-center gap-3">
//           <div className="relative shrink-0">
//             <img
//               src={item.avatar}
//               alt={item.name}
//               className="w-14 h-14 rounded-full object-cover"
//               onError={(e) => {
//                 e.target.src = "https://placehold.co/56x56/1a1a1a/444?text=U";
//               }}
//             />
//             {item.isOnline && (
//               <span
//                 className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2"
//                 style={{
//                   backgroundColor: "#10B981",
//                   borderColor: "#161616",
//                 }}
//               />
//             )}
//           </div>

//           {/* Name + Phone */}
//           <div>
//             <h3 className="text-white font-bold text-lg leading-tight">
//               {item.name}
//             </h3>
//             <p className="text-gray-400 text-sm mt-0.5">
//               {item.phone}
//             </p>
//           </div>
//         </div>

//         {/* Priority Badge */}
//         <span
//           className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shrink-0"
//           style={{
//             backgroundColor: "#2E0A0A",
//             color: "#F87171",
//             border: "1px solid #F8717130",
//           }}
//         >
//           <TbFlame size={12} />
//           {item.priority}
//         </span>

//       </div>

//       {/* ==========================================
//           INTERESTED PROPERTY
//       ========================================== */}
//       <div
//         className="rounded-xl p-4 flex flex-col gap-3"
//         style={{ backgroundColor: "#1E1E1E" }}
//       >

//         <p className="text-gray-500 text-xs font-medium">
//           Interested Property
//         </p>

//         {/* Property Name + Price */}
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <LuBuilding2 size={14} style={{ color: "#60A5FA" }} />
//             <span
//               className="font-semibold text-sm"
//               style={{ color: "#60A5FA" }}
//             >
//               {item.property.name}
//             </span>
//           </div>
//           <span className="text-white font-bold text-sm shrink-0">
//             {item.property.price}
//           </span>
//         </div>

//         {/* Last Contact + Stage */}
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex items-center gap-1.5 text-gray-500 text-xs">
//             <LuClock size={12} />
//             {item.lastContact}
//           </div>

//           <span
//             className="text-xs font-semibold px-3 py-1 rounded-full"
//             style={{
//               backgroundColor: "#2A2A2A",
//               color: "#C88A1A",
//               border: "1px solid rgba(200,138,26,0.3)",
//             }}
//           >
//             {item.stage}
//           </span>
//         </div>

//       </div>

//       {/* ==========================================
//           BUTTONS
//       ========================================== */}
//       <div className="flex gap-3 mt-1">

//         <button
//           className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl transition hover:opacity-80"
//           style={{ backgroundColor: "#3D2A0A" }}
//         >
//           <LuCalendarDays size={15} style={{ color: "#C88A1A" }} />
//           Schedule
//         </button>

//         <button
//           className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl transition hover:opacity-80"
//           style={{ backgroundColor: "#0A2E1A" }}
//         >
//           <LuPhoneCall size={15} style={{ color: "#10B981" }} />
//           Contact
//         </button>

//       </div>

//     </div>
//   );
// }

// export default LeadCard;


import { LuCalendarDays, LuPhoneCall } from "react-icons/lu";
import { TbFlame } from "react-icons/tb";

function LeadCard({ item, onClick }) {
  return (
    <div
      onClick={onClick} // ✅ this is what's missing
      className="flex-1 min-w-[300px] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer transition hover:border-white/20"
      style={{
        backgroundColor: "#161616",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >

      {/* Top — Avatar + Name + Priority */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/56x56/1a1a1a/444?text=U";
              }}
            />
            {item.isOnline && (
              <span
                className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2"
                style={{ backgroundColor: "#10B981", borderColor: "#161616" }}
              />
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {item.name}
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">{item.phone}</p>
          </div>
        </div>

        {/* Priority Badge */}
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: "#2E0A0A",
            color: "#F87171",
            border: "1px solid #F8717130",
          }}
        >
          <TbFlame size={12} />
          {item.priority}
        </span>
      </div>

      {/* Interested Property */}
      <div
        className="rounded-xl p-4 flex flex-col gap-3"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        <p className="text-gray-500 text-xs font-medium">Interested Property</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm" style={{ color: "#60A5FA" }}>
            {item.property?.name}
          </span>
          <span className="text-white font-bold text-sm shrink-0">
            {item.property?.price}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-500 text-xs">{item.lastContact}</span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: "#2A2A2A",
              color: "#C88A1A",
              border: "1px solid rgba(200,138,26,0.3)",
            }}
          >
            {item.stage}
          </span>
        </div>
      </div>

      {/* Buttons — stop propagation so they don't open modal */}
      <div className="flex gap-3 mt-1">
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl transition hover:opacity-80"
          style={{ backgroundColor: "#3D2A0A" }}
        >
          <LuCalendarDays size={15} style={{ color: "#C88A1A" }} />
          Schedule
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl transition hover:opacity-80"
          style={{ backgroundColor: "#0A2E1A" }}
        >
          <LuPhoneCall size={15} style={{ color: "#10B981" }} />
          Contact
        </button>
      </div>

    </div>
  );
}

export default LeadCard;