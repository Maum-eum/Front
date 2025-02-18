// import React from "react";
// import { useAdminStore } from "../../stores/admin/adminStore";
// import Input from "../../components/commons/Input";
// const DetailAdmin: React.FC = () => {
// //   const navigate = useNavigate();



//   return (
//     <div className="flex flex-col items-center justify-center">
//       {/* 모바일 환경에서만 보이는 UI */}
//       <div className="block md:hidden w-full">
//         <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
//           {/* 입력 폼 */}
//           <div className="w-full max-w-xs sm:max-w-sm">
//             <label className="block text-item sm:text-2xl font-bold text-black mb-2">아이디</label> 
//             <Input
//               type="text"
//               name="username"
//               placeholder="아이디를 입력해주세요."
//               value={signUpData.username}
//               onChange={signUpdataChange}
//             />
//             <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">비밀번호</label> 
//             <Input
//               type="password"
//               name="password"
//               placeholder="비밀번호를 입력해주세요."
//               value={signUpData.password}
//               onChange={signUpdataChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
//       <div className="hidden md:block">
//         데스크탑 화면입니다!
//       </div>
//     </div>
//   );
// };

// export default DetailAdmin;
