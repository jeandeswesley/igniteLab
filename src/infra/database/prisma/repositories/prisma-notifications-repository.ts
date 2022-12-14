import { PrismaService } from './../prisma.service';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
    constructor(private PrismaService: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        await this.PrismaService.notification.create({
            data: {
                id: notification.id,
                category: notification.category,
                content: notification.content.value,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt,
            }
        })
    }
}