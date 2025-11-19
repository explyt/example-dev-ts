import { Test, TestingModule } from '@nestjs/testing';
import { UtilsController } from './utils.controller';
import { UtilsService } from '../services/utils.service';
import { TelemetryService } from '../services/telemetry.service';

describe('UtilsController', () => {
    let controller: UtilsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UtilsController],
            providers: [
                { provide: UtilsService, useValue: {} },
                { provide: TelemetryService, useValue: { sendEvent: jest.fn() } },
            ],
        }).compile();
        controller = module.get<UtilsController>(UtilsController);
    });

    it('testPing returns {status: "OK"}', async () => {
        expect(typeof (controller as any).ping).toBe('function');
        const result = await (controller as any).ping();
        expect(result).toEqual({ status: 'OK' });
    });
});