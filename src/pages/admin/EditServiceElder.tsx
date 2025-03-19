import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Steps from "../../components/commons/Steps";
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
  const [step, setStep] = useState(1);
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
      <div className="block md:hidden w-full">
        {step === 1 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8 overflow-y-auto">
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">어르신 서비스 수정</h1>
            <Steps step={step} />
            <h2 className="mt-4 w-44 text-center sm:text-xl text-black mb-6">필요한 서비스를 수정하세요.</h2>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2">
              <CheckBox
                name="서비스 타입"
                options={["방문요양", "요양원", "입주요양", "방문목욕", "병원", "병원동행", "주야간보호"]}
                selectedopt={serviceData.careTypes}
                onChange={handleCheckBoxChange}
              />
              <CheckList type="서비스" name="식사보조" options={[
                { label: "스스로 식사 가능", name: "selfFeeding", value: serviceData.selfFeeding },
                { label: "식사 준비", name: "mealPreparation", value: serviceData.mealPreparation },
              ]} onChange={handleCheckListChange} />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => navigate(-1)} />
              <Btn text="다음" onClick={() => setStep(2)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">어르신 지역 설정</h1>
            <Steps step={step} />

            <div className="w-full max-w-xs sm:max-w-sm overflow-auto flex flex-col items-center">
              <RegionSelect selectedLocations={[serviceData.recruitLocation]} setSelectedLocations={handleSetLocation} />
              <input className="w-full p-2 border-2" type="text" name="address" value={serviceData.address} onChange={handleChange} />
              <TimeSelect setTimeData={handleSetServiceTime} />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(1)} />
              <Btn text="다음" onClick={() => setStep(3)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full p-4 flex flex-col items-center justify-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
            <h1 className="text-title sm:text-3xl font-bold text-black mb-6">어르신 필요 서비스 항목</h1>
            <Steps step={step} />

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col justify-center gap-2 overflow-y-auto">
              <input className="w-full p-2 border-2" type="number" name="desiredHourlyWage" value={serviceData.desiredHourlyWage} onChange={handleChange} />
              <textarea className="w-full p-2 border-2" name="detailRequiredService" value={serviceData.detailRequiredService} onChange={handleChange} rows={5} />
            </div>

            <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
              <Btn text="이전" color="white" onClick={() => setStep(2)} />
              <Btn text="수정 완료" onClick={handleUpdateElderService} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditServiceElder;
