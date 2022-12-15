import { PrismaService } from './../prisma.service';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { raw } from '@prisma/client/runtime';
import { notContains } from 'class-validator';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) {}

    async findId(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: { 
                id: notificationId,
            },
        });

        if(!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification)
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
         const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId,
            }
         })

         return notifications.map(PrismaNotificationMapper.toDomain)
         
     }
    
   async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId, 
            },
        });

        return count;
    }
    
    async create(notification: Notification): Promise<void> {
        
        const raw = PrismaNotificationMapper.toPrisma(notification)
        
        await this.prisma.notification.create({
            data: raw,
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)

        await this.prisma.notification.update({ 
            where: {
               id: raw.id, 
            },
            data: raw,
        });
    }
}