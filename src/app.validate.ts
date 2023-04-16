export function Validate() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const [prompt] = args;

            if (!prompt || prompt === "" || prompt === " ") {
                throw new Error("prompt is required");
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
