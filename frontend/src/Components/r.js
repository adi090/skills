// // /* eslint-disable react/prop-types */
// // /* eslint-disable no-unused-vars */
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import PropTypes from 'prop-types';
// // import NavBar from './NavBar';
// // import { SkillsVisualization } from './SkillsVisualization';
// // import 'react-vertical-timeline-component/style.min.css';

// // const SkillCheckbox = ({ skill, completed, onToggle }) => (
// //   <div className="flex items-center mb-2">
// //     <div 
// //       onClick={onToggle}
// //       className={w-5 h-5 border-2 rounded mr-2 cursor-pointer ${completed ? 'bg-yellow-400 border-yellow-400' : 'border-gray-400'}}
// //     >
// //       {completed && (
// //         <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //         </svg>
// //       )}
// //     </div>
// //     <span className={${completed ? 'line-through text-gray-500' : 'text-gray-300'}}>{skill}</span>
// //   </div>
// // );

// // SkillCheckbox.propTypes = {
// //   skill: PropTypes.string.isRequired,
// //   completed: PropTypes.bool.isRequired,
// //   onToggle: PropTypes.func.isRequired,
// // };

// // function Analyze() {
// //   const [highlightedSkill, setHighlightedSkill] = useState(null);
// //   const [animatedNumber, setAnimatedNumber] = useState(0);
// //   const [skills, setSkills] = useState([]);
// //   const [skillsData, setSkillsData] = useState({
// //     labels: [],
// //     datasets: [
// //       {
// //         label: 'Your Skills',
// //         data: [],
// //         backgroundColor: 'rgba(251, 191, 36, 0.2)',
// //         borderColor: 'rgba(251, 191, 36, 1)',
// //         pointBackgroundColor: 'rgba(251, 191, 36, 1)',
// //       },
// //       {
// //         label: 'Required Skills',
// //         data: [],
// //         backgroundColor: 'rgba(167, 139, 250, 0.2)',
// //         borderColor: 'rgba(167, 139, 250, 1)',
// //         pointBackgroundColor: 'rgba(167, 139, 250, 1)',
// //       },
// //     ],
// //   });

// //   const [resume, setResume] = useState(null);
// //   const [jobDescription, setJobDescription] = useState(null);
// //   const [analysisResult, setAnalysisResult] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [matchRate, setMatchRate] = useState(0);
// //   const [marketFit, setMarketFit] = useState(0);
// //   const [skillsToImprove, setSkillsToImprove] = useState(0);
// //   const [loadingSkills, setLoadingSkills] = useState({});

// //   useEffect(() => {
// //     const savedAnalysisResult = localStorage.getItem('analysisResult');
// //     const savedSkills = localStorage.getItem('skills');
// //     const savedSkillsData = localStorage.getItem('skillsData');
// //     const savedMatchRate = localStorage.getItem('matchRate');
// //     const savedMarketFit = localStorage.getItem('marketFit');
// //     const savedSkillsToImprove = localStorage.getItem('skillsToImprove');

// //     if (savedAnalysisResult) {
// //       setAnalysisResult(JSON.parse(savedAnalysisResult));
// //       setSkills(JSON.parse(savedSkills));
// //       setSkillsData(JSON.parse(savedSkillsData));
// //       setMatchRate(JSON.parse(savedMatchRate));
// //       setMarketFit(JSON.parse(savedMarketFit));
// //       setSkillsToImprove(JSON.parse(savedSkillsToImprove));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const intervalId = setInterval(() => {
// //       setHighlightedSkill(prevSkill => {
// //         const newSkill = skills[Math.floor(Math.random() * skills.length)]?.name;
// //         return newSkill !== prevSkill ? newSkill : prevSkill;
// //       });
// //     }, 2000);

// //     return () => clearInterval(intervalId);
// //   }, [skills]);

// //   useEffect(() => {
// //     const animationId = setInterval(() => {
// //       setAnimatedNumber(prev => (prev + 1) % 101);
// //     }, 50);

// //     return () => clearInterval(animationId);
// //   }, []);

// //   const handleResumeChange = (e) => {
// //     setResume(e.target.files[0]);
// //   };

// //   const handleJobDescriptionChange = (e) => {
// //     setJobDescription(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     const formData = new FormData();
// //     formData.append('resume', resume);
// //     formData.append('job_description', jobDescription);

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/skill-analyzer', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       const newAnalysisResult = response.data;
// //       setAnalysisResult(newAnalysisResult);

// //       const totalRequiredSkills = newAnalysisResult.skills_required_in_job.length;
// //       const matchingSkillsCount = newAnalysisResult.matching_skills.length;
// //       const newMatchRate = Math.round(((matchingSkillsCount + 1) / totalRequiredSkills) * 100);
// //       setMatchRate(newMatchRate);

// //       const skillsToImproveCount = newAnalysisResult.skills_to_improve.length;
// //       setSkillsToImprove(skillsToImproveCount);

// //       const newMarketFit = Math.round(((skillsToImproveCount + 1) / totalRequiredSkills) * 100);
// //       setMarketFit(newMarketFit);

// //       const newSkills = newAnalysisResult.skills_to_improve.map((skill, index) => ({
// //         id: index + 1,
// //         name: skill,
// //         completed: false,
// //       }));
// //       setSkills(newSkills);

// //       const newSkillsData = {
// //         labels: newAnalysisResult.skills_required_in_job,
// //         datasets: [
// //           {
// //             label: 'Your Skills',
// //             data: newAnalysisResult.skills_required_in_job.map(skill => 
// //               newAnalysisResult.skills_from_resume.includes(skill) ? 5 : 0
// //             ),
// //             backgroundColor: 'rgba(251, 191, 36, 0.2)',
// //             borderColor: 'rgba(251, 191, 36, 1)',
// //             pointBackgroundColor: 'rgba(251, 191, 36, 1)',
// //           },
// //           {
// //             label: 'Required Skills',
// //             data: newAnalysisResult.skills_required_in_job.map(() => 5),
// //             backgroundColor: 'rgba(167, 139, 250, 0.2)',
// //             borderColor: 'rgba(167, 139, 250, 1)',
// //             pointBackgroundColor: 'rgba(167, 139, 250, 1)',
// //           },
// //         ],
// //       };
// //       setSkillsData(newSkillsData);

// //       // Save data to local storage
// //       localStorage.setItem('analysisResult', JSON.stringify(newAnalysisResult));
// //       localStorage.setItem('skills', JSON.stringify(newSkills));
// //       localStorage.setItem('skillsData', JSON.stringify(newSkillsData));
// //       localStorage.setItem('matchRate', JSON.stringify(newMatchRate));
// //       localStorage.setItem('marketFit', JSON.stringify(newMarketFit));
// //       localStorage.setItem('skillsToImprove', JSON.stringify(skillsToImproveCount));

// //     } catch (error) {
// //       console.error('Error during analysis:', error);
// //       // Handle error (e.g., show an error message to the user)
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const toggleSkill = (id) => {
// //     const updatedSkills = skills.map(skill => 
// //       skill.id === id ? { ...skill, completed: !skill.completed } : skill
// //     );
// //     setSkills(updatedSkills);
// //     localStorage.setItem('skills', JSON.stringify(updatedSkills));
// //   };

// //   const sendSkillToBackend = async (e, skillName) => {
// //     e.preventDefault();
// //     console.log('Sending skill:', skillName);
// //     setLoadingSkills(prev => ({ ...prev, [skillName]: true }));
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/recommend_course', 
// //         { resource: skillName },
// //         { headers: { 'Content-Type': 'application/json' } }
// //       );
// //       console.log('Received from backend:', response.data);
// //       if (response.data.recommendation) {
// //         window.open(response.data.recommendation, '_blank');
// //       } else {
// //         console.error('No recommendation received');
// //       }
// //     } catch (error) {
// //       console.error('Error sending skill:', error);
// //       if (error.response) {
// //         console.error('Error details:', error.response.data);
// //       }
// //     } finally {
// //       setLoadingSkills(prev => ({ ...prev, [skillName]: false }));
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-violet-900 to-black">
// //       <NavBar />
// //       <div className="flex-grow p-8 overflow-y-auto">
// //         <div className="max-w-6xl mx-auto">
// //           {/* File Upload Form */}
// //           <div className="mb-8 bg-black bg-opacity-50 p-8 rounded-3xl shadow-2xl border border-yellow-500/30 backdrop-blur-sm">
// //             <h2 className="text-5xl font-bold text-yellow-400 text-center mb-4 font-sans">Skill Analyzer</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label htmlFor="resume" className="block text-yellow-400 mb-2">Upload Resume</label>
// //                 <input type="file" id="resume" onChange={handleResumeChange} className="w-full p-2 rounded bg-gray-800 text-white" />
// //               </div>
// //               <div>
// //                 <label htmlFor="jobDescription" className="block text-yellow-400 mb-2">Upload Job Description</label>
// //                 <input type="file" id="jobDescription" onChange={handleJobDescriptionChange} className="w-full p-2 rounded bg-gray-800 text-white" />
// //               </div>
// //               <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors">
// //                 {isLoading ? 'Analyzing...' : 'Analyze Skills'}
// //               </button>
// //             </form>
// //           </div>

// //           {/* Results Display */}
// //           <div className="space-y-6 mt-8">
// //             {analysisResult && (
// //               <>
// //                 {/* <div className="text-white text-lg">Your Match Rate: {animatedNumber}%</div> */}
// //                 {/* <div className="text-white text-lg">Market Fit: {marketFit}%</div> */}
// //                 <div className="text-white text-lg">Skills To Improve: {skillsToImprove}</div>
// //               </>
// //             )}
// //             <div>
// //               {skills.length > 0 && (
// //                 <div className="text-white mb-4">Skills You Should Focus On:</div>
// //               )}
// //               <div className="space-y-2">
// //                 {skills.map(skill => (
// //                   <SkillCheckbox
// //                     key={skill.id}
// //                     skill={skill.name}
// //                     completed={skill.completed}
// //                     onToggle={() => toggleSkill(skill.id)}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="text-white mb-4">Skill Visualization</div>
// //             {skillsData.labels && <SkillsVisualization data={skillsData} />}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Analyze;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBar from './NavBar';
// import { SkillsVisualization } from './SkillsVisualization';
// import 'react-vertical-timeline-component/style.min.css';

// const SkillCheckbox = ({ skill, completed, onToggle }) => (
//   <div className="flex items-center mb-2">
//     <div
//       onClick={onToggle}
//       className={`w-5 h-5 border-2 rounded mr-2 cursor-pointer ${completed ? 'bg-yellow-400 border-yellow-400' : 'border-gray-400'}`}
//     >
//       {completed && (
//         <svg
//           className="w-4 h-4 text-black"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//         </svg>
//       )}
//     </div>
//     <span className={`${completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>{skill}</span>
//   </div>
// );

// function Analyze() {
//   const [skills, setSkills] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [matchRate, setMatchRate] = useState(0);
//   const [skillsToImprove, setSkillsToImprove] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const savedAnalysisResult = localStorage.getItem('analysisResult');
//     const savedSkills = localStorage.getItem('skills');
//     if (savedAnalysisResult) {
//       setAnalysisResult(JSON.parse(savedAnalysisResult));
//       setSkills(JSON.parse(savedSkills) || []);
//     }
//   }, []);

//   const handleResumeChange = (e) => setSkills({ resume: e.target.files[0] });

//   const handleJobDescriptionChange = (e) => setSkills({ jobDescription: e.target.files[0] });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append('resume', skills.resume);
//     formData.append('job_description', skills.jobDescription);

//     try {
//       const response = await axios.post('http://localhost:5000/api/skill-analyzer', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const newAnalysisResult = response.data;
//       console.log('API Response:', newAnalysisResult); // Debugging line to log API response

//       // Validate and handle `skills_to_improve`
//       const skillsToImproveList = Array.isArray(newAnalysisResult.skills_to_improve)
//         ? newAnalysisResult.skills_to_improve
//         : [];
//       setSkillsToImprove(skillsToImproveList.length);

//       setAnalysisResult(newAnalysisResult);

//       const newSkills = skillsToImproveList.map((skill, index) => ({
//         id: index + 1,
//         name: skill,
//         completed: false,
//       }));
//       setSkills(newSkills);

//       const totalRequiredSkills = newAnalysisResult.skills_required_in_job?.length || 0;
//       const matchingSkillsCount = newAnalysisResult.matching_skills?.length || 0;
//       const newMatchRate = totalRequiredSkills
//         ? Math.round((matchingSkillsCount / totalRequiredSkills) * 100)
//         : 0;
//       setMatchRate(newMatchRate);

//       localStorage.setItem('analysisResult', JSON.stringify(newAnalysisResult));
//       localStorage.setItem('skills', JSON.stringify(newSkills));
//     } catch (error) {
//       console.error('Error during analysis:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-violet-900 to-black">
//       <NavBar />
//       <div className="flex-grow p-8 overflow-y-auto">
//         <h2 className="text-white text-3xl font-bold mb-6">Analyze Your Resume and Job Description</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="file"
//               accept=".pdf, .docx"
//               onChange={handleResumeChange}
//               className="bg-gray-100 p-2 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="file"
//               accept=".pdf, .docx"
//               onChange={handleJobDescriptionChange}
//               className="bg-gray-100 p-2 rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-yellow-500 text-black py-2 px-4 rounded"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Analyzing...' : 'Submit'}
//           </button>
//         </form>

//         {analysisResult && (
//           <div className="mt-8">
//             <h3 className="text-white text-xl font-semibold">Matching Skills: {matchRate}%</h3>
//             <p className="text-white">Skills to Improve: {skillsToImprove}</p>

//             <h4 className="text-white text-lg mt-4">Skills to Improve</h4>
//             <ul className="text-white">
//               {skills.map((skill) => (
//                 <li key={skill.id}>
//                   <SkillCheckbox
//                     skill={skill.name}
//                     completed={skill.completed}
//                     onToggle={() => {
//                       const updatedSkills = skills.map((s) =>
//                         s.id === skill.id ? { ...s, completed: !s.completed } : s
//                       );
//                       setSkills(updatedSkills);
//                       localStorage.setItem('skills', JSON.stringify(updatedSkills));
//                     }}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Analyze;
