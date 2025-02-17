import { useEffect, useState } from "react";
// import { sidoInfoApi, sigunguInfoApi, locationInfoApi } from "../../api/commons/regionInfoApi";
import type { SidoList, SigunguList, LocationList } from '../../types/commons/regionData'


////////////////////////////////////////////////////
// 선택한 것들은 selectionLocations에 들어있습니다
//
// 데이터 받아지면 더미데이터 대신 실제 데이터로 확인 필요
////////////////////////////////////////////////////

export function RegionSelect() {
	const [sido, setSido] = useState<SidoList | undefined>(undefined);
	const [sigungu, setSigungu] = useState<SigunguList | undefined>(undefined);
	const [location, setLocation] = useState<LocationList | undefined>(undefined);
	const [selectedSido, setSelectedSido] = useState<number | undefined>(1);
	const [selectedSigungu, setSelectedSigungu] = useState<number | undefined>(undefined);
	const [selectedLocations, setSelectedLocations] = useState<number[]>([]);

	//더미데이터
	const dummySidoData = [
		{ sidoId: 1, sidoName: "서울" },
		{ sidoId: 2, sidoName: "경기" },
		{ sidoId: 3, sidoName: "부산" },
	];

	const dummySigunguData = [
		{ sigunguId: 1, sigunguName: "강남구" },
		{ sigunguId: 2, sigunguName: "서초구" },
		{ sigunguId: 3, sigunguName: "송파구" },
	];

	const dummyLocationData = [
		{
			locationId: 1,
			dongName: "역삼동",
			sidoName: "서울",
			sigunguName: "강남구",
			address: "서울특별시 강남구 역삼동"
		},
		{
			locationId: 2,
			dongName: "청담동",
			sidoName: "서울",
			sigunguName: "강남구",
			address: "서울특별시 강남구 청담동"
		},
		{
			locationId: 3,
			dongName: "가락동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 가락동"
		},
		{
			locationId: 4,
			dongName: "잠실동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 잠실동"
		},
		{
			locationId: 5,
			dongName: "신천동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 6,
			dongName: "텐동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 7,
			dongName: "튀김우동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 8,
			dongName: "야끼우동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 9,
			dongName: "수동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 10,
			dongName: "자동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 11,
			dongName: "제동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 12,
			dongName: "작동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
		{
			locationId: 13,
			dongName: "선동",
			sidoName: "서울",
			sigunguName: "송파구",
			address: "서울특별시 송파구 신천동"
		},
	];


	useEffect(() => {
		const fetchSido = async () => {
			setSido({result: dummySidoData})
			// try {
			// 	const response = await sidoInfoApi();
			// 	console.log(response);
			// 	if (response?.isSuccess) {
			// 		setSido(response.result);
			// 		console.log(response);
			// 	}
			// } catch (error) {
			// 	console.error('Error get Sido Data');
			// }
		}
		fetchSido();
	}, []);

	const handleSidoChange = async (sidoId: number) => {
		setSelectedSido(sidoId);
		setSelectedSigungu(undefined);
		setSelectedLocations([]);
		// try {
		//   const response = await sigunguInfoApi(sidoId);
		//   if (response?.isSuccess) {
		// 	setSigungu(response.result);
		setSigungu({ result: dummySigunguData });
		//   }
		// } catch (error) {
		//   console.error("Error fetching Sigungu Data", error);
		// }
	};

	const handleSigunguChange = async (sigunguId: number) => {
		setSelectedSigungu(sigunguId);
		setSelectedLocations([]);
		// try {
		//   const response = await locationInfoApi(sigunguId);
		//   if (response?.isSuccess) {
		// 	setLocation(response.result);
		//   }
		// } catch (error) {
		//   console.error("Error fetching Location Data", error);
		// }
		setLocation({ result : dummyLocationData });
	};

	const toggleLocation = (locationId: number) => {
		// console.log(selectedLocations); 선택항목 확인용
		setSelectedLocations((prev) => {
			if (prev.includes(locationId)) {
				return prev.filter((item) => item !== locationId);
			}
			return prev.length < 5 ? [...prev, locationId] : prev;
		});
	};

	return (
		<div className="p-4 w-full max-w-3xl mx-auto">
			<h3 className="text-lg font-gtr-B mb-3">지역 선택</h3>
			<div className="flex border p-3 rounded-md shadow-sm">
			{/* 시/도 선택 */}
			<div className="w-1/4 border-r pr-3">
			<h4 className="text-md font-gtr-B mb-2 text-center">시/도</h4>
			<hr />
			<ul  className="max-h-60 overflow-y-auto p-2">
				{sido?.result?.map((s) => (
				  <li
					key={s.sidoId}
					className={`p-2 cursor-pointer ${
					  selectedSido === s.sidoId ? "bg-gray-100 font-gtr-B" : "hover:bg-gray-100 font-gtr-R"
					}`}
					onClick={() => handleSidoChange(s.sidoId)}
				  >
					{s.sidoName}
				  </li>
				))}
			  </ul>
			</div>

			{/* 시/군/구 선택 */}
			<div className="w-1/4 border-r px-3">
			  <h4 className="text-md font-gtr-B mb-2 text-center">시/군/구</h4>
			  <hr />
			  <ul className="max-h-60 overflow-y-auto p-2">
				{sigungu?.result?.map((sg) => (
				  <li
					key={sg.sigunguId}
					className={`p-2 cursor-pointer ${
					  selectedSigungu === sg.sigunguId ? "bg-gray-100 font-gtr-B" : "hover:bg-gray-100 font-gtr-R"
					}`}
					onClick={() => handleSigunguChange(sg.sigunguId)}
				  >
					{sg.sigunguName}
				  </li>
				))}
			  </ul>
			</div>

			{/* 동 선택 */}
			<div className="w-1/2 px-3">
			  <h4 className="text-md font-gtr-B mb-2 text-center">동/읍/면</h4>
			  <hr />
			  <ul className="max-h-60 overflow-y-auto p-2 grid grid-cols-2 gap-2">
				{location?.result?.map((loc) => (
				  <li key={loc.locationId} className="flex items-center p-2 font-gtr-R hover:bg-gray-100 cursor-pointer"
				  onClick={() => toggleLocation(loc.locationId)}>
					<input
					  type="checkbox"
					  checked={selectedLocations.includes(loc.locationId)}
					  className="mr-2"
					/>
					{loc.dongName}
				  </li>
				))}
			  </ul>
			</div>
		  </div>

		  {/* 선택된 지역 표시 */}
		  <div className="mt-4">
			<h4 className="text-md font-gtr-B mb-2">선택한 지역 (최대 5개)</h4>
			<div className="flex flex-wrap gap-2">
			  {selectedLocations.map((locId) => {
				const locName = location?.result?.find((loc) => loc.locationId === locId)?.dongName;
				return (
				  <span key={locId} className="bg-gray-200 font-gtr-R px-5 py-1 rounded-xl">
					{locName}
				  </span>
				);
			  })}
			</div>
		  </div>
		</div>
	  );
};


