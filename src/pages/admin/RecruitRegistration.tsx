import React from "react";

import { RegionSelect } from "../../components/commons/RegionSelect";
import { TimeSelect } from "../../components/commons/TimeSelect";

const RecruitRegistration: React.FC = () => {

	return (
		<div>
			<div className="font-gtr-B">지역선택 모달</div>
			<RegionSelect />
			<p className="font-gtr-B">시간선택 컴포넌트</p>
			<TimeSelect />
		</div>
	)

}

export default RecruitRegistration;
