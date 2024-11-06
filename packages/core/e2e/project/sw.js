import { swifcomExport } from 'swiftcom/worker';

class Test {
    constructor() {
        this.a = 1;
        this.b = 2;
    }

    fun1() {
        return this.a + this.b;
    }
    fun2(c) {
        return this.a + this.b + c;
    }
    fun3(c, d) {
        return new Promise((resolve, reject) => {
            resolve(this.a + this.b + c + d);
        });
    }
}

swifcomExport(new Test());
