import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Btn from "../../components/commons/Btn";
import CheckList from "../../components/admin/CheckList";
import CheckBox from "../../components/admin/CheckBox";

import { elderService, ServiceOption, ServiceTime } from "../../types/admin/service";
import { useAdminStore } from "../../stores/admin/adminStore";

import RegionSelect from "../../components/admin/RegionSelect";
import TimeSelect from "../../components/admin/TimeSelect";

import { getRecruit, editRecruit } from "../../api/admin/service";

const EditServiceElder: React.FC = () => {
  const navigate = useNavigate();
  const { centerId } = useAdminStore();
  const { elderId, recruitConditionId } = useParams();

  const [serviceData, setServiceData] = useState<elderService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecruit()
  }, [elderId, recruitConditionId]);

  const handleUpdateElderService = async () => {
    if (!elderId || !serviceData || !recruitConditionId) return;

    await editRecruit(
      { 
        centerId: centerId,
        elderId: elderId,
        recruit_id: recruitConditionId,
        data: serviceData
      },
      (res) => {
        console.log(res.data.data)
        navigate(-1)
      },
      (err) => {
        console.log(err)
      }
    )
  };

  const loadRecruit = async () => {
    if (!elderId || !recruitConditionId) return;

    await getRecruit(
      { 
        centerId: centerId,
        elderId: elderId,
        recruit_id: recruitConditionId
      },
      (res) => {
        console.log(res.data.data.careTypes)
        setServiceData(res.data.data)
        setLoading(false)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceData((prev) => prev ? { ...prev, [name]: name === "desiredHourlyWage" ? parseInt(value) : value } : null);
  };

  const handleCheckListChange = (selected: ServiceOption) => {
    setServiceData((prev) => prev ? { ...prev, [selected.name]: selected.value } : null);
  };

  const handleCheckBoxChange = (selected: string[]) => {
    setServiceData((prev) => prev ? { ...prev, careTypes: selected } : null);
  };

  const handleSetServiceTime = (newTimeData: ServiceTime[]) => {
    setServiceData((prev) => prev ? { ...prev, recruitTimes: newTimeData } : null);
  };

  const handleSetLocation = (location: number[]) => {
    setServiceData((prev) => prev ? { ...prev, recruitLocation: location[0] } : null);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!serviceData) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:block w-full h-screen">
        <div className="w-full bg-base-white grid grid-cols-3 gap-6 p-8 h-full">
          <div className="col-span-2 h-full bg-white shadow rounded-lg p-4 flex flex-col">
            {/* 타이틀 */}
            <h1 className="text-title font-bold text-black mb-6 font-gtr-B">어르신 서비스 등록</h1>
            
            <div className="w-full grid grid-cols-3 justify-center gap-2">
              <div className="col-span-2 grid grid-cols-2 gap-2 h-full">
                <div className="col-span-2">
                  <h2 className="text-lg mb-2 font-gtr-B">어르신이 필요한 서비스를 <span className="text-red">모두 선택</span>해 주세요.</h2> 
                </div>
                <CheckBox
                  name="서비스 타입"
                  options={["방문요양", "요양원", "입주요양", "방문목욕", "병원", "병원동행", "주야간보호"]}
                  selectedopt={serviceData.careTypes}
                  onChange={handleCheckBoxChange}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"
                  name={"식사보조"}
                  options={[
                    { label: "스스로 식사 가능", name: "selfFeeding", value: serviceData.selfFeeding },
                    { label: "식사 준비", name: "mealPreparation", value: serviceData.mealPreparation },
                    { label: "식사 보조 (구토물 정리)", name: "mealAssistance", value: serviceData.mealAssistance },
                    { label: "경관식 보조", name: "enteralNutritionSupport", value: serviceData.enteralNutritionSupport },
                  ]}
                  onChange={handleCheckListChange}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"배변보조"}
                  options={[
                    { label: "자기 배변 가능", name: "selfToileting", value: serviceData.selfToileting },
                    { label: "화장실 이용 보조", name: "toiletAssistance", value: serviceData.toiletAssistance },
                    { label: "간헐적 배변 보조", name: "occasionalToiletingAssist", value: serviceData.occasionalToiletingAssist },
                    { label: "기저귀 케어", name: "diaperCare", value: serviceData.diaperCare },
                    { label: "카테터·장루 케어", name: "catheterOrStomaCare", value: serviceData.catheterOrStomaCare },
                  ]}
                  onChange={handleCheckListChange}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"이동보조"}
                  options={[
                            { label: "자기 이동 가능", name: "independentMobility", value: serviceData.independentMobility },
                            { label: "이동 보조 (침대→휠체어 등)", name: "moveAssistance", value: serviceData.moveAssistance },
                            { label: "이동 지원 (부축)", name: "mobilityAssist", value: serviceData.mobilityAssist },
                            { label: "휠체어 보조", name: "wheelchairAssist", value: serviceData.wheelchairAssist },
                            { label: "거동 불가", name: "immobile", value: serviceData.immobile },
                          ]}
                  onChange={handleCheckListChange}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"일상 생활 지원"}
                  options={[
                            { label: "일상생활 보조", name: "dailyLivingAssistance", value: serviceData.dailyLivingAssistance },
                            { label: "요리 보조", name: "cookingAssistance", value: serviceData.cookingAssistance },
                            { label: "청소·세탁 지원", name: "cleaningLaundryAssist", value: serviceData.cleaningLaundryAssist },
                            { label: "목욕 보조", name: "bathingAssist", value: serviceData.bathingAssist },
                            { label: "병원 동행", name: "hospitalAccompaniment", value: serviceData.hospitalAccompaniment },
                          ]}
                  onChange={handleCheckListChange}
                  isPreOpen={true}
                />
                <CheckList
                  type="서비스"              
                  name={"건강 및 정서 지원"}
                  options={[
                            { label: "운동 지원", name: "exerciseSupport", value: serviceData.exerciseSupport },
                            { label: "정서적 지원", name: "emotionalSupport", value: serviceData.emotionalSupport },
                            { label: "인지 자극 활동", name: "cognitiveStimulation", value: serviceData.cognitiveStimulation },
                          ]}
                  onChange={handleCheckListChange}
                  isPreOpen={true}
                />
              </div>
              <div className="col-span-1 flex flex-col h-full">
                <RegionSelect 
                  selectedLocations={[serviceData.recruitLocation]}
                  setSelectedLocations={handleSetLocation}
                />
                <div className="px-6">
                  <label className="text-lg font-gtr-B mb-3 text-center">상세 주소</label>
                  <input
                    className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                    type="text"
                    name="address"
                    value={serviceData.address}
                    onChange={handleChange}
                    placeholder="상세 주소를 입력하세요..."
                  />
                  <label className="text-lg font-gtr-B mb-3 text-center">시급</label>
                  <input
                    className="w-full p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
                    type="number"
                    name="desiredHourlyWage"
                    value={serviceData.desiredHourlyWage}
                    onChange={handleChange}
                    min="0" // 음수 방지
                    step="1" // 소수점 방지
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""); // 숫자만 허용
                    }}
                    onKeyDown={(e) => {
                      if (["e", "E", ".", "-"].includes(e.key)) {
                        e.preventDefault(); // e, E, ., - 입력 차단
                      }
                    }}
                  />
                </div>
              </div>
            </div>          
          </div>
          <div className="col-span-1 h-full bg-white shadow rounded-lg p-4 flex flex-col">
            {/* ✅ 시간 선택 컴포넌트 */}
            <TimeSelect setTimeData={handleSetServiceTime} />
            <label className="text-lg font-gtr-B mb-1 m-4">추가 요청사항</label>
            <textarea
              className="resize-none m-2 p-2 border-2 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0"
              name="detailRequiredService"
              value={serviceData.detailRequiredService}
              onChange={handleChange}
              rows={5} // 텍스트 입력 공간 확보
              placeholder="추가 요청사항을 입력하세요..."
            />
            {/* ✅ 하단 고정 버튼 (자동 밀림) */}
            <div className="mt-auto flex gap-2">
              <Btn text="이전" color="white" onClick={() => navigate(-1)} />
              <Btn text="수정" onClick={handleUpdateElderService} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServiceElder;
