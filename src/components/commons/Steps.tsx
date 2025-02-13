import clsx from "clsx";

type StepsProps = {
  step: number;
};

const Steps: React.FC<StepsProps> = ({ step = 1 }) => {
  return (
    <div className="flex font-pre-M text-base justify-center items-center gap-4 w-full">
      {/* 1단계 */}
      <div className={clsx("w-12 h-12 rounded-full flex justify-center items-center text-white", 
        step === 1 ? "bg-green" : "bg-disabled-gray"
      )}>
        <p>1단계</p>
      </div>

      {/* 점 2개 (회색 원과 동일한 색상 적용) */}
      <div className="w-2 h-2 bg-disabled-gray rounded-full"></div>
      <div className="w-2 h-2 bg-disabled-gray rounded-full"></div>

      {/* 2단계 */}
      <div className={clsx("w-12 h-12 rounded-full flex justify-center items-center text-white", 
        step === 2 ? "bg-green" : "bg-disabled-gray"
      )}>
        <p>2단계</p>
      </div>

      {/* 점 2개 */}
      <div className="w-2 h-2 bg-disabled-gray rounded-full"></div>
      <div className="w-2 h-2 bg-disabled-gray rounded-full"></div>

      {/* 3단계 */}
      <div className={clsx("w-12 h-12 rounded-full flex justify-center items-center text-white", 
        step === 3 ? "bg-green" : "bg-disabled-gray"
      )}>
        <p>3단계</p>
      </div>
    </div>
  );
};

export default Steps;
