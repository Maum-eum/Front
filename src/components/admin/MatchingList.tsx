import React from "react"


type RequestListProps = {
  data: string[]
}

const MatchingList: React.FC<RequestListProps> = ({data = []}) => {

  return (
    <div className="w-full flex flex-col p-1">
      <span className="text-content text-black mb-2 font-gtr-B">현재 매칭 리스트</span>
      <div className="w-full flex flex-col gap-1">
        {data.map((elder) => (
          <div className="border w-full p-2 rounded-lg">
            {elder}
          </div>
        )
      )}
      </div>
    </div>
  )
}

export default MatchingList