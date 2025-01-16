import { Resource } from '@opentelemetry/resources';
import {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import {
    BatchSpanProcessor,
    ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';

const resource = Resource.default().merge(
    new Resource({
        [ATTR_SERVICE_NAME]: 'service',
        [ATTR_SERVICE_VERSION]: '0.1.0',
    }),
);

const provider = new WebTracerProvider({
    resource: resource,
});
const exporter = new ConsoleSpanExporter();
const processor = new BatchSpanProcessor(exporter);
provider.addSpanProcessor(processor);

provider.register();
