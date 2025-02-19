import { deleteToken, getToken } from "firebase/messaging";
import { messaging } from "./firebase-config";

const BACKEND_API_URL = "http://localhost:5173/api/fcm/save-token";

/* 서비스 워커 등록 */
export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker 등록 완료:", registration);
      })
      .catch((err) => console.log("Service Worker 등록 실패:", err));
  }
}

/* 권한 설정 */
export const requestPermission = async () => {
  try {
    /* await deleteToken(messaging); */
    const token = await getToken(messaging, {
      vapidKey:
        "BKCEmN3NLjbC9RCaK3E9m3kbDtFhz1RVgz8U7Al9AuGti9LHTeNDQbfHCd0wzsWdvBio_Rxms-xiwgPbVi3YKZQ",
    });
    console.log("✅ FCM 토큰:", token);

    /* 백엔드로 FCM 토큰 전송 */
    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fcmToken: token }),
    });
    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.statusText}`);
    }
    console.log("✅ FCM 토큰이 백엔드에 저장되었습니다.");
  } catch (error) {
    console.error("❌ FCM 토큰 요청 실패:", error);
  }
};

/* 알림 보내기 */
export const sendNotification = async (receiverId, content) => {
  try {
    const response = await axios.post("http://localhost:5173/api/fcm/test-sending", {
      receiver_id: receiverId,
      content: content,
    });
    if (response.status === 200) {
      console.log("알림 보내기 완료:", registration);
    } else {
      console.log("알림 보내기 실패:", registration);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
