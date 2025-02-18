import { JobConditionRequest } from "../../types/caregiver/jobCondition";

const postJobCondition = async (data: JobConditionRequest) => {
  try {
    const response = await fetch("https://api.gyeotae.site/caregiver/jobcondition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.status === "success") {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error while posting job condition:", error);
    throw error;
  }
};

export { postJobCondition };
