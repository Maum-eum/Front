import clsx from "clsx";

type BtnProps = {
	text: string;
	color?: "green" | "red" | "white" | "blue" | "disabled";
};

const Btn: React.FC<BtnProps> = ({ text = "다음", color = "green"}) => {
	return (
		<button
			className={clsx(
				"mb-4 my-4 w-80 h-12 rounded-lg",
				color === "blue"     && "bg-blue",
				color === "disabled" && "bg-disabled-gray",
				color === "green" 	 && "bg-green",
				color === "red"   	 && "bg-red",
				color === "white" 	 && "bg-white",
				)}>
			<p className="font-gtr-B text-lg">
				{text}
			</p>
		</button>
	)
};

export default Btn;