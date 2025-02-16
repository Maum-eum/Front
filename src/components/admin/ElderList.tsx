import React from "react"
import { elderInfo } from "../../types/admin/elderType"

type ElderListProps = {
  data: elderInfo[]
}

const ElderList: React.FC<ElderListProps> = ({data = []}) => {
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
      <span className="text-content text-black mb-2 font-gtr-B">센터 어르신 리스트</span>
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