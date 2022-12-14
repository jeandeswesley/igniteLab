import { Notification } from './../../../application/entities/notification';
import { SendNotification } from './../../../application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('notifications')
export class Notificationsontroller {

  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category }  = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
