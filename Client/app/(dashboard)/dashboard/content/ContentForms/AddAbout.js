// "use client"
// import Form_title_button from '@/app/helpers/Form_title_button';
// import Spinner from '@/app/helpers/Spinner';
// import React, { useState } from 'react'

// export default function AddAbout() {
//     const initialData = {
//         heading: "",
//         subHeading: "",
//         aboutPhoto: "",
//         mission: "",
//         vission: "",
//         whyChoose: [],
//         team: []
//     }
//     const [formData, setFormData] = useState(initialData);
//     const [team, setTeam] = useState([
//         { name: "", position: "", photo: "" }
//     ]);
//     const [posting, setPosting] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//     };

//     const handleTeamChange = (index, field, value) => {
//         const updatedTeam = [...team];
//         updatedTeam[index][field] = value;
//         setTeam(updatedTeam);
//     };
//     // Handler for adding a new team member
//     const addTeamMember = () => {
//         setTeam([...team, { name: "", position: "", photo: "" }]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData)
//     }

//     return (
//         <div className="w-full bg-gray-100 p-5">
//             <div className="bg-white py-5 px-2 w-full md:w-[50%] m-auto ">

//                 <Form_title_button text={"About Page"} />
//                 <form action="">
//                     <div className="mb-4">
//                         <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
//                             Heading
//                         </label>
//                         <input
//                             type="text"
//                             id="heading"
//                             name="heading"
//                             className="input w-full border border-gray-300 rounded-md p-2 mt-1"
//                             placeholder="Write a Heading"
//                             value={formData.heading}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="subHeading" className="block text-sm font-medium text-gray-700">
//                             Sub Heading
//                         </label>
//                         <input
//                             type="text"
//                             id="subHeading"
//                             name="subHeading"
//                             className="input w-full border border-gray-300 rounded-md p-2 mt-1"
//                             placeholder="Write a Sub Heading"
//                             value={formData.subHeading}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
//                             mission
//                         </label>
//                         <input
//                             type="text"
//                             id="mission"
//                             name="mission"
//                             className="input w-full border border-gray-300 rounded-md p-2 mt-1"
//                             placeholder="Write Mission"
//                             value={formData.mission}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="vission" className="block text-sm font-medium text-gray-700">
//                             vission
//                         </label>
//                         <input
//                             type="text"
//                             id="vission"
//                             name="vission"
//                             className="input w-full border border-gray-300 rounded-md p-2 mt-1"
//                             placeholder="Write Vission"
//                             value={formData.vission}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     {team.map((member, index) => (
//                         <div key={index} className="team-member">
//                             <input
//                                 type="text"
//                                 placeholder="Name"
//                                 value={member.name}
//                                 onChange={(e) => handleTeamChange(index, "name", e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Position"
//                                 value={member.position}
//                                 onChange={(e) =>
//                                     handleTeamChange(index, "position", e.target.value)
//                                 }
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Photo URL"
//                                 value={member.photo}
//                                 onChange={(e) => handleTeamChange(index, "photo", e.target.value)}
//                             />
//                             <button type="button" onClick={() => removeTeamMember(index)}>
//                                 Remove
//                             </button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={addTeamMember}>
//                         Add Team Member
//                     </button>


//                     <button
//                         // disabled={status === 102}
//                         type="submit"
//                         className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
//                     >
//                         {
//                             posting ? <Spinner /> : " Add Info"
//                         }
//                     </button>

//                 </form>
//             </div>
//         </div>
//     )
// }


import React from 'react'

export default function AddAbout() {
    return (
        <div>Under Proccesing</div>
    )
}
