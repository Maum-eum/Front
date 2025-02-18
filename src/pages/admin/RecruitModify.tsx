import React from "react";

import { RegionSelect } from "../../components/commons/RegionSelect";
import { TimeSelect } from "../../components/commons/TimeSelect";

const RecruitModify: React.FC = () => {

	return (
		<div>

						{/*

	조회로 기본값 채워놓고
	requiredInfoApi
		centerId : number,
		elderId : number,
		careId : number

	requiredRegisterApi
		centerId : number,
		elderId : number,
		requiredData : RequiredData
	로 넘기기
	페이지 분할은 등록과 동일 많지 않으면 스크롤이 나을듯

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



			<div>hi</div>
			<RegionSelect />
			<p>hi</p>
			<TimeSelect />
		</div>
	)
}

export default RecruitModify;
