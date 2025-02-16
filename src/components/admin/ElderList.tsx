import React from "react"
import { elderInfo } from "../../types/admin/elderType"
import { useNavigate } from "react-router-dom"

type ElderListProps = {
  data: elderInfo[]
}

const ElderList: React.FC<ElderListProps> = ({data = []}) => {
  const navigate = useNavigate();
  const caregiversData = [{
    elder: '박노인',
    caregiver: 'test'
  },
  {
    elder: '박노인',
    caregiver: 'test2'
  },
  {
    elder: '박노인',
    caregiver: 'test'
  }]

  return (
    <div className="w-full flex flex-col p-1">
      <div className="w-full flex justify-center m-1 p-1 h-12 items-center">
        <span className="flex-grow text-content text-black font-gtr-B">센터 어르신 리스트</span>
        <button className="border text-sm font-gtr-r m-1 p-1 bg-green rounded-lg" onClick={() => navigate("/admin/addElder")}>등록</button>
      </div>
      <div className="w-full flex flex-col gap-1">
        {data.map((elder) => {
          const caregiverCount = caregiversData.reduce(
            (count, item) => (item.elder === elder.name ? count + 1 : count),
            0
          );
          return (
            <div
              key={elder.name}
              className="p-1 pl-2 border rounded-md flex flex-col"
            >
              <span className="text-item font-bold">{elder.name}</span>
              <span className="text-content text-point-green">{caregiverCount}명 매칭중</span>
            </div>
          )
      })}
      </div>
    </div>
  )
}

export default ElderList