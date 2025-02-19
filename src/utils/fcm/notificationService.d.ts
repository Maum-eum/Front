declare module "../../utils/fcm/notificationService" {
  export interface SendNotificationResponse {
    status: number;
    data: any;
  }

  export const sendNotification: (
    receiverId: string,
    content: string
  ) => Promise<SendNotificationResponse>;
}
