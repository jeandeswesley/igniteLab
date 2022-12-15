import { UnreadNotification } from './../../application/use-cases/unread-notification';
import { ReadNotification } from './../../application/use-cases/read-notification';
import { GetRecipientNotifications } from './../../application/use-cases/get-recipients-notification';
import { CountRecipientNotifications } from './../../application/use-cases/count-recipient-notifications';
import { CancelNotification } from './../../application/use-cases/cancel-notification';
import { DatabaseModule } from './../database/database.module';
import { SendNotification } from './../../application/use-cases/send-notification';
import { Notificationsontroller } from './controllers/notifications.controller';
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule],
    controllers: [Notificationsontroller],
    providers: [
        SendNotification,
        CancelNotification,
        CountRecipientNotifications,
        GetRecipientNotifications,
        ReadNotification,
        UnreadNotification,
    ],
})

export class HttpModule {}