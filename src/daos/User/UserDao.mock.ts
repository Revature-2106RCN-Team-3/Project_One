import { IUser } from '@entities/User';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';



class UserDao extends MockDaoMock implements IUserDao {

    public async getOne(userName: string): Promise<IUser | null> {
        const db = await super.openDb();
        for (const user of db.users) {
            if (user.userName === userName) {
                return user;
            }
        }
        return null;
    }


    public async getAll(): Promise<IUser[]> {
        const db = await super.openDb();
        return db.users;
    }


    public async addOrUpdate(user: IUser): Promise<void> {
        const db = await super.openDb();
        db.users.push(user);
        await super.saveDb(db);
    }


    public async update(user: IUser): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].userName === user.userName) {
                db.users[i] = user;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }


    public async delete(userName: string): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].userName === userName) {
                db.users.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }
}

export default UserDao;
