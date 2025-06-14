'use strict'

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const serviceName = process.env.OTEL_SERVICE_NAME || 'movie-service';

const sdk = new NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: serviceName,
    }),
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces',
    }),
    instrumentations: [
        new NestInstrumentation(),
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        getNodeAutoInstrumentations()
    ]
});

sdk.start();

process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('Tracing and Metrics terminated'))
        .catch((error) => console.log('Error terminating tracing and metrics', error))
        .finally(() => process.exit(0));
});

console.log(`OpenTelemetry SDK initialized for service: ${serviceName}`);