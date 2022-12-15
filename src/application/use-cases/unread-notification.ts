import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface UnreadNotificationRequest {
    notificationId: string;    
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {

    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(
        request: UnreadNotificationRequest,
        ): Promise<UnreadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findId(
            notificationId,
        );

        if(!notification) {
            throw new NotificationNotFound();
        }

        notification.unRead();

        await this.notificationsRepository.save(notification);

    }
}