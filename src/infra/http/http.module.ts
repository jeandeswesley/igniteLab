import { DatabaseModule } from './../database/database.module';
import { SendNotification } from './../../application/use-cases/send-notification';
import { Notificationsontroller } from './controllers/notifications.controller';
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule],
    controllers: [Notificationsontroller],
    providers: [SendNotification],
})

export class HttpModule {}