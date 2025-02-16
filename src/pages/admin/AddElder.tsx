import React, { useState } from "react";

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import RadioInput from "../../components/admin/RadioInput";
// import CheckList from "../../components/admin/CheckList";
// import { addElder } from "../../api/admin/elder";

import { useNavigate } from "react-router-dom";

const AddElder: React.FC = () => {
//   const navigate = useNavigate();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [ElderData, setElderData] = useState({
    name:       "",
    centerName: "",
    birth:      "",
    gender:     0,
    rate:       "",
    imgUrl:     "",
    weight:     "",
  });

  const elderDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    let newValue: string | number = value;
  
    // ✅ 몸무게(`weight`) 필드일 경우 숫자로 변환
    if (name === "weight") {
      newValue = value.replace(/[^0-9.]/g, ""); // 숫자와 소수점만 허용
      if ((newValue.match(/\./g) || []).length > 1) return; // 소수점 1개만 허용
    }
  
    setElderData((prev) => ({ ...prev, [name]: newValue }));
  }

  const elderGenderChange = (selected: number) => {
    setElderData((prev) => ({ ...prev, gender: selected }));
  }

  // const handleAddElder = async () => {
  //   await addElder(
  //     {
  //       centerId: 1,
  //       data: ElderData
  //     },
  //     (res) => {
  //       console.log(res)
  //     },
  //     (err) => {
  //       console.log(err.response?.data)
  //     }
  //   )
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        {/* 성함, 생년월일, 성별 */}
        {step === 1 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 기본 정보 등록</h1> 
            
            <Steps step={step}/>

            {/* 프로필 이미지 (임시 박스) */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-200 rounded-lg mb-6"></div>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-2xl font-bold text-black mb-2">어르신 성함</label> 
              <Input
                type="text"
                name="name"
                placeholder="성함을 입력해주세요."
                value={ElderData.name}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">생년월일</label> 
              <Input
                type="text"
                name="birth"
                placeholder="생년월일를 입력해주세요."
                value={ElderData.birth}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">성별</label>
              <RadioInput name="gender" options={[{ value: 1, label: "남성" }, { value: 2, label: "여성" }]} onChange={elderGenderChange}/>

            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="취소하기" color="white" onClick={() => navigate("/")} /> 
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {/* 몸무게, 장애등급, 동거인여부 */}
        {step === 2 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 세부 정보 등록</h1> 

            <Steps step={step}/>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-xl font-bold text-black mt-3 mb-2">몸무게(Kg)</label> 
              <Input
                type="text"
                name="weight"
                placeholder="몸무게를 입력해주세요."
                value={ElderData.weight}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">장기 요양 등급</label> 
              <Input
                type="text"
                name="rate"
                placeholder="장기 요양 등급을 입력해주세요."
                value={ElderData.rate}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">동거인 여부</label> 
              <RadioInput
                name="inmate" 
                options={[
                  { value: 1, label: "독거" },
                  { value: 2, label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
                  { value: 3, label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
                  { value: 4, label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
                  { value: 5, label: "다른 가족과 동거, 돌봄 시간 중 자리 비움" },
              ]}/>
                  
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(1)} /> 
              <Btn text="다음" onClick={() => setStep(3)} />
            </div>
          </div>
        )}

        {/* 3단계 */}
        {step === 3 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center justify-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            <p>추후 변동예정</p>
            {/* 타이틀 */}
            {/* <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 필요 서비스 항목</h1>  */}

            <Steps step={step}/>
            {/* <h2 className="mt-4 w-44 text-center sm:text-xl text-black mb-6 font-gtr-B">어르신이 필요한 서비스를 <span className="text-red">모두 선택</span>해 주세요.</h2>  */}
            {/* 입력 폼 */}
            {/* <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2">
              <CheckList
                name="식사 보조"
                options={[
                  "식사 차리기",
                  "구토물 정리",
                  "음식물 조리 및 설거지",
                  "경관식 보조"
                ]}
              />
              <CheckList
                name="배변 보조"
                options={[
                  "화장실 이동 지원",
                  "유치도뇨 / 방광루 / 장루 관리 및 처리 지원",
                  "배뇨, 배변 도움 후 처리 지원",
                  "기저귀 교환"
                ]}
              />
              <CheckList
                name="이동 보조"
                options={[
                  "침대 <-> 휠체어 이동 보조",
                  "보행 도움 (부축)",
                  "보조 기구 이동 보조 (휠체어, 지팡이)",
                  "신체 기능의 유지 및 증진 도움"
                ]}
              />
              <CheckList
                name="일상 생활"
                options={[
                  "컨디션 외 도움",
                  "세면 도움",
                  "구강 청결 도움",
                  "몸 단장 도움"
                ]}
              />
              <CheckList
                name="치매 증상"
                options={[
                  "집 밖을 배회",
                  "단기 기억 장애",
                  "가족을 알아보지 못함",
                  "길을 잃거나 자주 가던 곳을 헤맴",
                  "사람을 의심하는 망상",
                  "어린아이 같은 행동",
                  "때리거나 욕설 등 공격적인 행동"
                ]}
              />
            </div> */}

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(2)} /> 
              {/* <Btn text="등록" onClick={handleAddElder} /> */}
              <Btn text="등록" onClick={() => console.log(ElderData)} />
            </div>
          </div>
        )}
      </div>

      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default AddElder;
