import { useEffect, useState } from "react";
import { sidoInfoApi, sigunguInfoApi, locationInfoApi } from "../../api/commons/regionInfoApi";
import type { Sido, Sigungu, Location } from '../../types/commons/regionData';

interface RegionSelectProps {
  selectedLocations: number[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<number[]>>;
  initialLocations: number[];
}

export function RegionSelect({ selectedLocations, setSelectedLocations, initialLocations }: RegionSelectProps) {
  const [sido, setSido] = useState<Sido[]>([]);
  const [sigungu, setSigungu] = useState<Sigungu[]>([]);
  const [location, setLocation] = useState<Location[]>([]);
  const [selectedSido, setSelectedSido] = useState<number | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false); // 초기 선택 여부 플래그

  // 초기 선택된 지역 설정
  useEffect(() => {
    if (!initialized && initialLocations.length > 0) {
      setSelectedLocations(initialLocations);
      setInitialized(true);
    }
  }, [initialLocations, initialized, setSelectedLocations]);

  // 시/도 데이터 불러오기
  useEffect(() => {
    const fetchSido = async () => {
      try {
        const response = await sidoInfoApi();
        if (response?.status && response.data) {
          setSido(response.data);
        }
      } catch (error) {
        console.error("Error fetching Sido Data", error);
      }
    };
    fetchSido();
  }, []);

  // 시/도 선택 시 시/군/구 데이터 불러오기
  const handleSidoChange = async (sidoId: number) => {
    if (selectedSido === sidoId) return;
    setSelectedSido(sidoId);
    setSelectedSigungu(null);
    setLocation([]);

    try {
      const response = await sigunguInfoApi(sidoId);
      if (response?.status) {
        setSigungu(response.data);
      }
    } catch (error) {
      console.error("Error fetching Sigungu Data", error);
    }
  };

  // 시/군/구 선택 시 동/읍/면 데이터 불러오기
  const handleSigunguChange = async (sigunguId: number) => {
    setSelectedSigungu(sigunguId);

    try {
      const response = await locationInfoApi(sigunguId);
      if (response?.status) {
        setLocation(response.data);
      }
    } catch (error) {
      console.error("Error fetching Location Data", error);
    }
  };

  // 지역 선택/해제 핸들러
  const toggleLocation = (locationId: number | undefined) => {
    if (!locationId) return;

    setSelectedLocations((prev) => {
      if (prev.includes(locationId)) {
        return prev.filter((id) => id !== locationId);
      }
      return prev.length < 5 ? [...prev, locationId] : prev;
    });
  };

  return (
    <div className="p-2 w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-gtr-B mb-3 text-center">지역 선택</h3>
      <hr className="mx-1" />

      {/* 시/도 & 시/군/구 선택 */}
      <div className="text-sm flex px-1">
        {/* 시/도 선택 */}
        <div className="w-1/2 border-l border-r px-3 pt-2">
          <h4 className="font-gtr-B mb-2 text-center">시/도</h4>
          <hr />
          <ul className="max-h-40 overflow-y-auto p-2">
            {sido.map((el) => (
              <li
                key={el.sidoId}
                className={`p-2 cursor-pointer ${selectedSido === el.sidoId ? "bg-gray-100 font-gtr-B" : "hover:bg-gray-100 font-gtr-R"}`}
                onClick={() => handleSidoChange(el.sidoId)}
              >
                {el.sidoName}
              </li>
            ))}
          </ul>
        </div>

        {/* 시/군/구 선택 */}
        <div className="w-1/2 border-r px-3 pt-2">
          <h4 className="text-sm font-gtr-B mb-2 text-center">시/군/구</h4>
          <hr />
          <ul className="min-h-40 max-h-40 overflow-y-auto p-2">
            {sigungu.map((el) => (
              <li
                key={el.sigunguId}
                className={`p-2 cursor-pointer ${selectedSigungu === el.sigunguId ? "bg-gray-100 font-gtr-B" : "hover:bg-gray-100 font-gtr-R"}`}
                onClick={() => handleSigunguChange(el.sigunguId)}
              >
                {el.sigunguName}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="mx-1 mb-3" />

      {/* 동/읍/면 선택 */}
      <div className="w-full px-3">
        <h4 className="text-sm font-gtr-B mb-2 text-center">동/읍/면</h4>
        <hr />
        <ul className="text-sm min-h-40 max-h-40 overflow-y-scroll p-2 grid grid-cols-2 gap-2 border-x border-b">
          {location.map((el) => (
            <li
              key={el.locationId}
              className="flex items-center p-2 font-gtr-R hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleLocation(el.locationId)}
            >
              <input type="checkbox" checked={selectedLocations.includes(el.locationId)} className="mr-2" readOnly />
              {el.dongName}
            </li>
          ))}
        </ul>
      </div>

      {/* 선택한 지역 표시 */}
      <h4 className="text-sm font-gtr-B mb-1 pl-3 mt-4">선택한 지역 (최대 5개)</h4>
      <div className="min-h-20 border mx-3 rounded-lg">
        <div className="flex flex-wrap gap-2 px-3">
          {selectedLocations
            .filter((locId) => locId !== undefined && locId !== null) // undefined 또는 null 제거
            .map((locId) => {
              const locName = location.find((el) => el.locationId === locId)?.dongName || "알 수 없음"; // 없는 지역명 방지
              return (
                <span key={locId} className="text-sm bg-gray-200 font-gtr-R px-5 py-1 mt-1 rounded-xl">
                  {locName}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}