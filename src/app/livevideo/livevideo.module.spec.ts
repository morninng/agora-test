import { LivevideoModule } from './livevideo.module';

describe('LivevideoModule', () => {
  let livevideoModule: LivevideoModule;

  beforeEach(() => {
    livevideoModule = new LivevideoModule();
  });

  it('should create an instance', () => {
    expect(livevideoModule).toBeTruthy();
  });
});
