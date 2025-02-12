import clsx from "clsx";

type StepsProps = {
  step: number;
};

const Steps: React.FC<StepsProps> = ({ step = 1 }) => {
	return (
		<div className="flex font-pre-B text-lg justify-evenly items-center ">
			<div className={clsx("w-16 h-16 rounded-full flex justify-center items-center",step === 1 ? "bg-green" : "bg-disabled-gray")}>
				<p>1단계</p>
			</div>
			<div className="w-2 h-2 bg-point-gray rounded-full"/>
			<div className="w-2 h-2 bg-point-gray rounded-full"/>
			<div className={clsx("w-16 h-16 rounded-full flex justify-center items-center",step === 2 ? "bg-green" : "bg-disabled-gray")}>
				<p>2단계</p>
			</div>
			<div className="w-2 h-2 bg-point-gray rounded-full"/>
			<div className="w-2 h-2 bg-point-gray rounded-full"/>
			<div className={clsx("w-16 h-16 rounded-full flex justify-center items-center",step === 3 ? "bg-green" : "bg-disabled-gray")}>
				<p>3단계</p>
			</div>
		</div>

	)
};

export default Steps;