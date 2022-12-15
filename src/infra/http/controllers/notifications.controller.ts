import { GetRecipientNotifications } from './../../../application/use-cases/get-recipients-notification';
import { CountRecipientNotifications } from './../../../application/use-cases/count-recipient-notifications';
import { ReadNotification } from './../../../application/use-cases/read-notification';
import { Notification } from './../../../application/entities/notification';
import { SendNotification } from './../../../application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';

@Controller('notifications')
export class Notificationsontroller {

  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotication: UnreadNotification, 
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string,
  ){
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });
    return{
      count,
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string,
  ) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });
    return{
      notifications: notifications.map(NotificationViewModel.toHTTP),
    }
  }
  
  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotication.execute({
      notificationId: id,
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category }  = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { 
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
