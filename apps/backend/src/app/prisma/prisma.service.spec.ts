import {Test, TestingModule} from '@nestjs/testing';
import {PrismaService} from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('should call $connect on initialization', async (): Promise<void> => {
    const spy = jest
      .spyOn(service, '$connect')
      .mockImplementation(async () => undefined);
    await service.onModuleInit();
    expect(spy).toBeCalledTimes(1);

    spy.mockRestore();
  });

  it('should return the same instance when calling getInstance() multiple times', () => {
    const instance1 = PrismaService.getInstance();
    const instance2 = PrismaService.getInstance();

    expect(instance1).toBe(instance2);
  });
});
