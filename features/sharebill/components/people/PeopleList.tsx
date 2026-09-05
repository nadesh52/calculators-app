// "use client";
// export function AvailableList({ selectedPeople, availablePeople }: any) {
//   return (
//     <ul className="flex flex-wrap gap-2">
//       {availablePeople?.map((person: any) => (
//         <li key={person.id}>
//           <button
//             className="btn bg-success/60 text-white"
//             onClick={() => selectedPeople(person)}
//           >
//             {person.name}
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export function SelectedList({ removePeople, selectedPeople }: any) {
//   return (
//     <ul className="flex flex-wrap gap-2">
//       {selectedPeople?.map((person: any) => (
//         <li key={person.id}>
//           <button
//             className="btn bg-error/60 text-white"
//             onClick={() => removePeople(person)}
//           >
//             {person.name}
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }
