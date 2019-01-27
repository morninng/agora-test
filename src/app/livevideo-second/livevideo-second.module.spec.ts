import { LivevideoSecondModule } from './livevideo-second.module';

describe('LivevideoSecondModule', () => {
  let livevideoSecondModule: LivevideoSecondModule;

  beforeEach(() => {
    livevideoSecondModule = new LivevideoSecondModule();
  });

  it('should create an instance', () => {
    expect(livevideoSecondModule).toBeTruthy();
  });
});
