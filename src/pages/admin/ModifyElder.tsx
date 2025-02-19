import React, { useState, useEffect } from "react";

import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import RadioInput from "../../components/admin/RadioInput";
import CheckList from "../../components/admin/CheckList";
import { modifyElder, getElderDetail, getTempElderDetail } from "../../api/admin/elder";
import { elderInfo, ServiceOption } from "../../types/admin/elderType";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin/adminStore";

const categories = {
    title: "치매 증상",
}

const ModifyElder: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { centerId } = useAdminStore();
  const { elderId } = useParams();
  const { temp } = useParams();
  const [elderData, setElderData] = useState<elderInfo>({
    elderId                : 0,
    inmateTypes            : [],
    name                   : "",
    birth                  : "",
    gender                 : 0,
    rate                   : "",
    weight                 : "",
    temporarySave          : false,
    normal                 : false,
    hasShortTermMemoryLoss : false,
    wandersOutside         : false,
    actsLikeChild          : false,
    hasDelusions           : false,
    hasAggressiveBehavior  : false,
  });

  const [profileFile, setProfileFile] = useState<File | null>(null);

  
  // Input 데이터 처리
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

  // Radio 버튼 처리
  const elderRadioDataChange = (selected: string | number | string[]) => {
    if (typeof selected === "number") {
      setElderData((prev) => ({ ...prev, gender: selected }));
    }
    else if (typeof selected === "string") {
      setElderData((prev) => ({ ...prev, rate: selected }));
    }
    else {
      setElderData((prev) => ({ ...prev, inmateTypes: selected}))
    }
  };
  
  // 치매항목 처리
  const handleElderCheckList = (selected: ServiceOption) => {
    setElderData((prev) => ({
      ...prev,
      [selected.name]: selected.value, 
    }));

  };

  // 이미치 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
    }
  };

  // 기존이미지 처리
  const urlToFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const Img =  new File([blob], "prevImg", { type: blob.type });
    setProfileFile(Img)
  };
  
  // 폼데이터 전처리
  const setIsTemp = (type: boolean) => {
    const form = new FormData()

    if (profileFile) {
      form.append("profileImg", profileFile, profileFile.name);
    } else {
      form.append("profileImg", "");
    }

    form.append("inmateTypes", elderData.inmateTypes.join(','))
    form.append("data", JSON.stringify({...elderData, temporarySave:type, inmateTypes: undefined, img: undefined}))
    return form
  }

  // 어르신 데이터 조회
  const getElderInfo = async () => {
    if (temp !== "save") return;
    if (!elderId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }

    await getElderDetail(
      {
        centerId: centerId,
        elderId: parseInt(elderId),
      },
      (res) => {
        setElderData(res.data.data);
        if (res.data.data.img) {
          urlToFile(res.data.data.img)
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
    // 어르신 데이터 조회
    const getTempElderInfo = async () => {
      if (temp !== "temp") return;
      if (!elderId) {
        alert("잘못된 접근입니다.");
        navigate(-1);
        return;
      }
  
      await getTempElderDetail(
        {
          centerId: centerId,
          elderId: parseInt(elderId),
        },
        (res) => {
          setElderData(res.data.data);
          if (res.data.data.img) {
            urlToFile(res.data.data.img)
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };

  // api 요청
  const sendModifyElder = async () => {
    if (!elderId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }
    const form = setIsTemp(false)
    for (const [key, value] of form.entries()) {
      console.log(key, value);
     };
    await modifyElder(
      {
        centerId: centerId,
        elderId: parseInt(elderId),
        data: form
      },
      (res) => {
        if(temp === "temp") {
          alert('등록 되었습니다.')
          navigate(`/admin/elder/required/${res.data.data.elderId}`)
        } else {
          alert('수정 되었습니다.')
          navigate("/admin/main")
        }
      },
      (err) => {
        console.log(err.response?.data)
      }
    )
  }

  // useEffect
  useEffect(() => {
    getElderInfo();
    getTempElderInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        {/* 성함, 생년월일, 성별 */}
        {step === 1 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 기본 정보 변경</h1> 
            
            <Steps step={step}/>

            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center m-2">
              <label htmlFor="profile-upload" className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 cursor-pointer">
              {profileFile ? (
                  <img src={URL.createObjectURL(profileFile)} alt="프로필" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-gray-500 text-sm">사진 추가</span>
                )}
              </label>
              <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <p className="text-sm text-gray-500 mt-2">프로필 사진 추가</p>
            </div>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-2xl font-bold text-black mb-2">어르신 성함</label> 
              <Input
                type="text"
                name="name"
                placeholder="성함을 입력해주세요."
                value={elderData.name}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">생년월일</label> 
              <Input
                type="text"
                name="birth"
                placeholder="생년월일를 입력해주세요."
                value={elderData.birth}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">성별</label>
              <RadioInput selectedValues={[elderData.gender]} name="gender" options={[{ value: 1, label: "남성" }, { value: 2, label: "여성" }]} onChange={elderRadioDataChange}/>

            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="취소하기" color="white" onClick={() => navigate(-1)} /> 
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {/* 몸무게, 장애등급, 동거인여부 */}
        {step === 2 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 기본 정보 변경</h1> 

            <Steps step={step}/>

            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <label className="block text-item sm:text-xl font-bold text-black mt-3 mb-2">몸무게(Kg)</label> 
              {/*몸무게입렵은 별도로..*/}
              <input
                className="w-full p-2 border-2 bg-white border-gray-300 focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                type="text"
                name="weight"
                placeholder="몸무게를 입력해주세요."
                value={elderData.weight}
                onChange={elderDataChange}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">장기 요양 등급</label> 
              <RadioInput
                name="rate"
                options={[
                  { value: "NORATE",  label: "없음" },
                  { value: "RATE1", label: "1등급" },
                  { value: "RATE2", label: "2등급" },
                  { value: "RATE3", label: "3등급" },
                  { value: "RATE4", label: "4등급" },
                  { value: "RATE5", label: "5등급" }]}
                onChange={elderRadioDataChange}
                selectedValues={[elderData.rate]}
              />
              <label className="block text-item sm:text-xl font-bold text-black mb-2">동거인 여부</label> 
              <RadioInput
                name="inmate" 
                options={[
                  { value: ["LIVING_ALONE"], label: "독거" },
                  { value: ["LIVING_WITH_SPOUSE","AT_HOME_DURING_CARE"], label: "배우자와 동거, 돌봄 시간 중 집에 있음" },
                  { value: ["LIVING_WITH_SPOUSE","AWAY_DURING_CARE"],    label: "배우자와 동거, 돌봄 시간 중 자리 비움" },
                  { value: ["LIVING_WITH_FAMILY","AT_HOME_DURING_CARE"], label: "다른 가족과 동거, 돌봄 시간 중 집에 있음" },
                  { value: ["LIVING_WITH_FAMILY","AWAY_DURING_CARE"],    label: "다른 가족과 동거, 돌봄 시간 중 자리 비움" },
                ]}
                onChange={elderRadioDataChange}
                selectedValues={[elderData.inmateTypes]}
                />
                  
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(1)} /> 
              <Btn text="다음" onClick={() => setStep(3)} />
            </div>
          </div>
        )}

        {/* 3단계 */}
        {step === 3 && (
          <div className="w-full p-4 flex flex-col items-center justify-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            {/* 타이틀 */}
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6 font-gtr-B">어르신 치매 증상</h1> 

            <Steps step={step}/>
            <h2 className="mt-4 w-44 text-center sm:text-xl text-black mb-6 font-gtr-B">증상을<span className="text-red"> 모두 선택 </span>해 주세요.</h2> 
            {/* 입력 폼 */}
            <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2">
              <CheckList
                type="치매"
                name={categories.title}
                options={[
                  { label: "정상",          name: "normal", value: elderData.normal },
                  { label: "단기 기억 장애", name: "hasShortTermMemoryLoss", value: elderData.hasShortTermMemoryLoss },
                  { label: "집 밖을 배회",   name: "wandersOutside", value: elderData.wandersOutside },
                  { label: "어린아이 같은 행동",  name: "actsLikeChild", value: elderData.actsLikeChild },
                  { label: "사람을 의심하는 망상",    name: "hasDelusions", value: elderData.hasDelusions },
                  { label: "때리거나 욕설 등 공격적인 행동",    name: "hasAggressiveBehavior", value: elderData.hasAggressiveBehavior },
                ]}
                onChange={handleElderCheckList}
              /> 
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <div className="w-full flex gap-1">
                <Btn text="이전" color="white" onClick={() => setStep(2)} />
              </div>
            
              <Btn text="수정" onClick={sendModifyElder} />
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

export default ModifyElder;
