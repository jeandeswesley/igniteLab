import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from "./cancel-notification";
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipients notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository =  new InMemoryNotificationsRepository();
        const countRecipientNotifications =  new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
         );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-2'})
        );

       const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1',
        });
       
        expect(count).toEqual(2);
        
    })

    it('should not be able to cancel a non existing notification', () =>{
        const notificationsRepository =  new InMemoryNotificationsRepository();
        const cancelNotification =  new CancelNotification(notificationsRepository)
        
        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notificationId',
            });
        }).rejects.toThrow(NotificationNotFound)
    })
});