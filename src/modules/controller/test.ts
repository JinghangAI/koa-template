import { Context } from 'koa';
import pdb from 'common/db';

class Test {
    async test(ctx: Context) {
        // const result = await pdb.create('students', { name: 'wg' });
        // const result2 = await pdb.get('students', '5f23af517023062011d3cb11');
        // const result3 = await pdb.delete('students', '5f23af517023062011d3cb11');
        // const result = await pdb.find('students', {});
        // const result = await pdb.count('students', {});
        const result = await pdb.findAndCount('students', {});
        ctx.body = result;
    }
}

export default new Test();