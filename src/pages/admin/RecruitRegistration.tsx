import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Time } from "../../types/commons/timeData";
import type { RecruitData } from "../../types/admin/recruitData";
import { requiredInfoApi } from "../../api/admin/required";
import { elderInfo } from "../../types/admin/elderType";
import { getElderDetail } from "../../api/admin/elder";
import { RegionSelect } from "../../components/commons/RegionSelect";
import { TimeSelect } from "../../components/commons/TimeSelect";
import { useAdminStore } from "../../stores/admin/adminStore";
import { useParams } from "react-router-dom";

const RecruitRegistration: React.FC = () => {
    const navigate = useNavigate();
    const store = useAdminStore();
    const elderId = Number(useParams());
    const [elderInfo, setElderInfo] = useState<elderInfo>();
	const [timeData, setTimeData] = useState<Time[]>([]);
	const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
    const [recruitData, setRecruitData] = useState<RecruitData>();


    useEffect(() => {
          const getElderInfo = async () => {
            if (!elderId) {
              alert("잘못된 접근입니다.");
              navigate(-1);
              return;
            }
            await getElderDetail(
              {
                centerId: store.centerId,
                elderId: elderId,
              },
              (res) => {
                console.log(res.data.data);
                setElderInfo(res.data.data);
              },
              (err) => {
                console.log(err);
              }
            );
          };
          getElderInfo();
    }, []);

    useEffect(() => {
          /* 필요 상세정보 받아오는 api */
          const handleGetRequiresInfo = async () => {
            try{
                const response = await requiredInfoApi(
                    store.centerId,
                    elderId,
                    elderInfo?.careId as number,
                );
                setRecruitData(response?.data?.data);
            } catch (error) {
                console.error('error get required info', error);
            }
          };
        handleGetRequiresInfo();
      }, [elderInfo]);


	return (
		<div>
			{/*

	아래 정보 다 받아서
	requiredRegisterApi
		centerId : number,
		elderId : number,
		requiredData : RequiredData
	로 넘기기
	페이지 분할은 보고 결정

	"careTypes": [
        "방문요양",
        "병원"
    ],
    "recruitLocation" : 2001, // 근무 지역
    "mealAssistance" : true, // 식사 보조
    "toiletAssistance" : true, // 배변 보조
    "moveAssistance" : true, // 이동보조
    "dailyLivingAssistance" : false, // 일상 생활 보조
    "flexibleSchedule": false, // 시간 협의 가능 여부
    "desiredHourlyWage": 10000, // 희망 시급
    "selfFeeding": true, // 스스로 식사 가능
    "mealPreparation": false, // 식사 차려드리기
    "cookingAssistance": true, // 직접 요리 필요
    "enteralNutritionSupport": false, // 경관식 보조
    "selfToileting": true, // 스스로 배변 가능
    "occasionalToiletingAssist": false, // 종종 대소변 실수
    "diaperCare": false, // 기저귀 케어
    "catheterOrStomaCare": false, // 유치도뇨, 방광루, 장루 관리
    "independentMobility": true, // 스스로 거동 가능
    "mobilityAssist": false, // 이동 시 부축 도움
    "wheelchairAssist": false, // 휠체어 이동 보조
    "immobile": false, // 거동 불가
    "cleaningLaundryAssist": true, // 청소 빨래 보조
    "bathingAssist": false, // 목욕 보조
    "hospitalAccompaniment": false, // 병원 동행
    "exerciseSupport": true, // 산책, 간단 운동
    "emotionalSupport": false, // 말벗 등 정서 지원
    "cognitiveStimulation": true, // 인지 자극 활동
    "detailRequiredService" : "좀 더 신경써주세요.", // 추가 요청 사항
    "recruitTimes": [
        {
            "dayOfWeek": "FRI",
            "startTime": 18,
            "endTime": 20
        },
        {
            "dayOfWeek": "MON",
            "startTime": 18,
            "endTime": 20
        }
    ]
}  */}
			<RegionSelect
				selectedLocations={selectedLocations}
				setSelectedLocations={setSelectedLocations}
			/>
			<TimeSelect setTimeData={setTimeData}/>
		</div>
	)

}

export default RecruitRegistration;
