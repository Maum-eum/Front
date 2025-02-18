import React from "react"
import { elderInfo } from "../../types/admin/elderType"
import { useNavigate } from "react-router-dom"

type ElderListProps = {
  data: elderInfo[]
}

const ElderList: React.FC<ElderListProps> = ({data = []}) => {
  const navigate = useNavigate();

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

  return (
    <div className="w-full flex flex-col p-1 rounded-lg">
      <div className="w-full flex m-1 p-1 h-12 justify-center items-center font-gtr-B">
        <span className="flex-grow text-content text-black">센터 어르신 리스트</span>
        <button
          className="text-sm border p-1 px-3 rounded-lg bg-pale-green"
          onClick={() => navigate("/admin/elder/add")}>
            등록
        </button>
      </div>
      <div className="w-full flex flex-col gap-1">
        {data.map((elder) => (
          <div
          key={elder.name}
          className="p-1 pl-2 border rounded-md flex"
          onClick={() => navigate(`/admin/elder/detail/${elder.elderId}`)}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-600 mr-4">
              {elder.img ? <img src={elder.img} alt="" className="w-full h-full object-cover" /> : null}
            </div>
            <span className="text-item font-bold">{elder.name} 만{calAge(elder.birth)}세 {elder.isTemporarySave ? "- 임시 저장됨" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ElderList