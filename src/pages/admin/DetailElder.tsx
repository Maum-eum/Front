import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin/adminStore";
import { getElderDetail } from "../../api/admin/elder";
import { elderInfo } from "../../types/admin/elderType";
import AttributeCard from "../../components/caregiver/AttributeCard";
import DeleteAdminModal from "../../components/admin/DeleteModal";
import { deleteElder } from "../../api/admin/elder";


const inmateTypesMapping = [
  { value: "LIVING_ALONE", label: "독거" },
  { value: "LIVING_WITH_SPOUSE", label: "배우자와 동거" },
  { value: "AWAY_DURING_CARE", label: "돌봄 시간 중 자리 비움" },
  { value: "AT_HOME_DURING_CARE", label: "돌봄 시간 중 집에 있음" },
  { value: "LIVING_WITH_FAMILY", label: "다른 가족과 동거"},
];

const rateMapping: Record<string, string> = {
  RATE1: "1등급",
  RATE2: "2등급",
  RATE3: "3등급",
  RATE4: "4등급",
  RATE5: "5등급",
};


const attributes: { value: keyof elderInfo; label: string }[]  = [
  { value: "normal", label: "정상" },
  { value: "hasShortTermMemoryLoss", label: "단기 기억 장애" },
  { value: "wandersOutside", label: "집 밖을 배회" },
  { value: "actsLikeChild", label: "아이처럼 행동" },
  { value: "hasDelusions", label: "의심 / 망상" },
  { value: "hasAggressiveBehavior", label: "공격적 행동" },
];

const DetailElder: React.FC = () => {
  const { centerId } = useAdminStore();
  const { elderId } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [elderInfo, setElderInfo] = useState<elderInfo>({
    elderId                : 0,
    inmateTypes            : [],
    name                   : "",
    birth                  : "",
    gender                 : 0,
    rate                   : "RATE1",
    weight                 : "",
    isTemporarySave        : false,
    normal                 : false,
    hasShortTermMemoryLoss : false,
    wandersOutside         : false,
    actsLikeChild          : false,
    hasDelusions           : false,
    hasAggressiveBehavior  : false,
  });

  const navigate = useNavigate();

  const getElderInfo = async () => {
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
        setElderInfo(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deleteElderInfo = async () => {
    if (!elderId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }
    await deleteElder(
      {
        centerId: centerId,
        elderId: parseInt(elderId),
      },
      ()=> {
        alert('정상적으로 삭제되었습니다.')
        navigate(-1)
      },
      (err) => {
        console.log(err)
      }
    )
  }


  const getRateLabel = (rate: string | null) => {
    return rate ? rateMapping[rate] || rate : "없음";
  };
  
  const getDementiaLabel = (data:elderInfo) => {
    return attributes.filter((attr) => data[attr.value]).map((item) => item.label)
  }

  const getInmateTypeLabel = (data:string[]) => {
    return data.map((item1) => inmateTypesMapping.find((item2) => item2.value === item1)?.label || item1)
  }

  const calAge = (date: string) => {
    const ageData = new Date(date);
    const ageYear = ageData.getFullYear();
    const ageMonth = ageData.getMonth();
    const ageDay = ageData.getDate();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    let age = currentYear - ageYear;

    if (currentMonth < ageMonth) {
      age--;
    }

    else if (currentMonth === ageMonth && currentDay < ageDay) {
      age--;
    }

  return age;
  }


  useEffect(() => {
    getElderInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="block md:hidden w-full">        
        <div className="flex flex-col items-center min-w-screen min-h-screen bg-base-white sm:px-6 py-8">
          {/* 제목 */}
          <h1 className="w-full text-center text-[20px] sm:text-3xl font-bold mb-6">
            <span className="text-black"> 어르신 상세 정보</span>
          </h1>
          <div className="w-72 sm:w-[600px]">
            <div className="text-content w-full h-auto sm:h-auto shadow bg-white rounded-lg mb-6 p-5">
              <div className="flex flex-wrap gap-3">
                {elderInfo.img ? (
                  <img
                    src={elderInfo.img}
                    className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-48 sm:h-full border rounded-lg bg-empty-green"></div>
                )}
                <div className="flex-1 flex flex-col justify-between items-end gap-1">
                  <span className="font-bold">{elderInfo.name} 어르신</span>
                  <button className="border px-2 py-1 font-gtr-B rounded-lg bg-pale-yellow" onClick={() => navigate(`/admin/elder/modify/${elderId}`)}>정보 수정</button>
                  <button className="border px-2 py-1 font-gtr-B rounded-lg bg-pale-red" onClick={() => setShowModal(true)}>정보 삭제</button>
                </div>
              </div>
              <hr className="border my-4" />

              {/* 매칭 상세 정보 */}
              <div className="font-title font-bold">성별</div>
              <AttributeCard content={[elderInfo.gender === 1 ? "남성" : "여성"]} />
              <div className="font-title font-bold">생년월일</div>
              <AttributeCard content={[`${elderInfo.birth}`, `${calAge(elderInfo.birth)}세`]} />
              <div className="font-title font-bold">체중</div>
              <AttributeCard content={[`${elderInfo.weight} kg`]} />
              <div className="font-title font-bold">장기 요양 등급</div>
              <AttributeCard content={[`${getRateLabel(elderInfo.rate)}`]} />

              <hr className="border my-4" />
              <div className="font-title font-bold">치매 증상</div>
              <AttributeCard content={getDementiaLabel(elderInfo)} />
              
              <hr className="border my-4" />
              <div className="font-title font-bold">동거인 여부</div>
              <AttributeCard content={getInmateTypeLabel(elderInfo.inmateTypes)} />

            </div>
            {showModal && <DeleteAdminModal onConfirm={deleteElderInfo} onCancel={() => setShowModal(false)} />}
          </div>
        </div>
      </div>
      {/* ✅ 데스크탑 UI (추후 작업 예정) */}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default DetailElder;
