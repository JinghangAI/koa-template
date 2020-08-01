import { MongoClient, MongoClientOptions, Db, ObjectId, FindOneOptions, FilterQuery, MongoCountPreferences } from 'mongodb';
import { BaseModel } from 'src/@types/db';

type Filter = { [x: string]: unknown };

class PDB {
    private db!: Db;
    /**
     * 打开数据库连接
     */
    async init(uri: string, options: MongoClientOptions = {}): Promise<void> {
        options.useUnifiedTopology = true;

        const mongoclient = new MongoClient(uri, options);
        const client = await mongoclient.connect();
        this.db = client.db();
        // TODO: 重写 ObjectId.generate() 方法，将 schema 加入 id 中
        // TODO: 加入管理工具，支持同时连接多个数据库
    }

    private beforeCreate<T extends BaseModel>(model: T): void {
        model._id = new ObjectId();
        model.createdAt = new Date();
        model.updatedAt = new Date();
        model.deleted = false;
    }

    /**
     * 向指定集合内插入一个文档
     * @param collection 
     * @param model 
     */
    async create<T extends BaseModel>(collection: string, model: T): Promise<PID> {
        this.beforeCreate(model);
        const ret = await this.db.collection(collection).insertOne(model);
        return ret.insertedId.toString();
    }

    /**
     * 在指定集合中，根据Id查找一个文档
     * 
     * TODO: 将 collection 放入 id 中
     * @param collection 集合
     * @param pid pid
     * @param fields 要返回的字段
     */
    async get<T extends BaseModel>(collection: string, pid: PID, fields?: string[]): Promise<T> {
        if (typeof pid === 'string') {
            pid = new ObjectId(pid);
        }

        const filter: FilterQuery<Filter> = { _id: pid };
        const options: FindOneOptions = {
            projection: fields?.map(field => ({ [field]: 1 }))
        };

        const ret = await this.db.collection(collection).findOne(
            this.fillFilter(filter),
            this.fillOptions(options)
        );
        return ret;
    }

    /**
     * 标记删除一条数据，不支持批量删除
     * @param collection 集合
     * @param pid 要删除的Id
     */
    async delete(collection: string, pid: string): Promise<boolean> {
        const filter: FilterQuery<Filter> = { _id: pid };
        const ret = await this.db.collection(collection).updateOne(
            this.fillFilter(filter),
            { $set: { delete: true } }
        );

        return ret.upsertedCount === 1;
    }

    /**
     * 从集合中查找问题
     * @param collection 集合
     * @param query 过滤条件
     * @param options 选项
     */
    async find<T>(collection: string, query: FilterQuery<Filter>, options?: FindOneOptions): Promise<T[]> {
        const ret = await this.db.collection(collection)
            .find(this.fillFilter(query), this.fillOptions(options))
            .toArray();

        return ret;
    }

    /**
     * 根据查询条件计算总数
     * @param collection 集合
     * @param query 查询条件
     * @param options Mongo Count Options
     */
    async count(collection: string, query: FilterQuery<Filter>, options?: MongoCountPreferences): Promise<number> {
        const ret = await this.db.collection(collection).count(
            this.fillFilter(query),
            options
        );
        return ret;
    }

    async findAndCount<T>(collection: string, query: FilterQuery<Filter>, options?: Extract<keyof MongoCountPreferences, keyof FindOneOptions>) {
        const data = await this.find<T>(collection, query, options as FindOneOptions);
        const count = await this.count(collection, query, options as MongoCountPreferences);
        return { data, count };
    }

    /**
     * 填充查询信息条件
     * 
     * 将 _id 改成 `ObjectId` 实例，并且只查询未删除的数据
     * @param filter 查询条件
     */
    private fillFilter(filter: FilterQuery<Filter> = {}): FilterQuery<Filter> {
        if (typeof filter._id === 'string') {
            filter._id = new ObjectId(filter._id);
        }
        filter.deleted = false;
        return filter;
    }

    /**
     * 填充查询选项
     * 
     * 默认根据 `createdAt` 倒序排列
     * @param options 查询选项
     */
    private fillOptions(options: FindOneOptions = {}): FindOneOptions {
        options.sort = { createdAt: -1 };
        return options;
    }
}

export default new PDB();