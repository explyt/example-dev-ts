import axios from 'axios';
import { ATImportEngine } from './index';

jest.mock('axios');
jest.mock('./mock', () => ({
  ATMockImportEngine: class {},
  MockAirtable: class {},
}));
jest.mock('~/helpers/utils', () => ({ isPlayWrightNode: () => false }));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ATImportEngine', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.get.mockResolvedValue({ data: '<html/>' } as any);
  });

  it('initialize hits old airtable.com share URL', async () => {
    const engine = ATImportEngine.get();
    await engine.initialize({ appId: 'app', shareId: 'shr' });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    const [calledUrl] = mockedAxios.get.mock.calls[0];
    expect(calledUrl).toBe('https://airtable.com/app/shr');
  });
});
