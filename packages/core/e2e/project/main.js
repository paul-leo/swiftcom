import { importModule ,registerSw } from 'swifcom/main';
async function main() {
    await registerSw('./sw.js');
    const swifcom = await importModule();
    const result = await swifcom.fun1;
    const result2 = await swifcom.fun2(3);
    const result3 = await swifcom.fun3(3, 4);
    console.log(result);
    console.log(result2);
    console.log(result3);
}

main();

