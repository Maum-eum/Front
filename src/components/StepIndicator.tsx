import React from "react";

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center space-x-2 mb-8">
      {[1, 2, 3].map((step, index) => (
        <React.Fragment key={step}>
          {/* 단계 표시 원 */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-white text-lg ${
              step === currentStep ? "bg-[#34D000]" : "bg-[#777777]"
            }`}
          >
            {step}단계
          </div>

          {/* 마지막 원 다음에는 점을 추가하지 않음 */}
          {index < 2 && (
            <div className="flex space-x-1">
              <span className="text-gray-500 text-xl">•</span>
              <span className="text-gray-500 text-xl">•</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
