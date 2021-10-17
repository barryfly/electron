import { renderQrCode } from './drawCanvas';
import { drawLogo } from './drawLogo';
export const toCanvas = (options) => {
  return renderQrCode(options)
    .then(() => {
      return options;
    })
    .then(drawLogo);
};
